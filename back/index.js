const fetch = require('node-fetch')
const fs = require('fs/promises')
const Xmen = require('@oriun/x-men')


async function parsePage(html) {

    try {
        const parsed = new Xmen.html(html.replace(/\u00A0/gmi, " "))

        return parsed.getElementsByClassName('ZINbbc luh4tb xpd O9g5cc uUPGi').map((a, i) => {
            const firstBlock = a.children[0].a
            const title = firstBlock.h3.textContent
            const url = new URLSearchParams(firstBlock.attributes.href.replace(/^\/url/, '')).get('q')
            if (!url) return
            const dataRoot = a.children[1]
            let data = "TO_IMPLEMENT";
            let type = "TO_IMPLEMENT"

            if (dataRoot.div.div) {
                const descriptionRoot = dataRoot.div.div.div
                if (descriptionRoot?.div?.div) {
                    data = descriptionRoot.div.div["#text"].textContent
                    type = "simple"
                } else if (descriptionRoot?.div?.[0]?.class?.includes('MSiauf')) {
                    type = "with_rate"
                    data = descriptionRoot?.div[1].textContent
                }
            } else if (dataRoot.a?.div?.div?.[0].img && dataRoot.div?.[0]?.div?.div?.div?.div?.["#text"]) {
                type = "media"
                data = dataRoot.div[0].div.div.div.div["#text"][0].textContent
            } else return
            return {
                title,
                data,
                url,
                type
            }
        }).filter(Boolean)

    }
    catch (err) {
        console.error(err)
        console.log(html)
        return []
    }
}

async function fetchResult(search, page = 0) {
    console.log('fetch', search, page)
    const res = await fetch("https://www.google.com/search?q=" + search.join('+') + "?start=" + page, {
        Headers: {
            origin: "https://www.google.com",
        }
    })


    if (!res.ok) {
        console.log(res)
        throw new Error('Failure : ' + res.statusText)
    }

    const html = await res.arrayBuffer()
        .then(function (buffer) {
            const decoder = new TextDecoder('iso-8859-1');
            const text = decoder.decode(buffer);
            // console.log(text);
            return text
        });
    // const html = await res.text()

    return parsePage(html)
}

async function autoComplete(query, nb = 10) {
    return fetch(`https://www.google.com/complete/search?q=${encodeURIComponent(query)}&client=gws-wiz&hl=fr&cp=${nb}`, {
        Headers: {
            origin: "https://www.google.com",
        }
    })
        .then(res => res.text())
        .then(res => JSON.parse(/\[.*\]/gmi.exec(res)?.[0] || null))
        .then(res => res[0].map(a => a[0].replace(/<\/?b>/g, '').trim()))
}
async function main() {

    const search = process.argv.slice(2)

    const auto = await autoComplete(search.join(' '))

    console.log(auto)

    const pages = await Promise.all(Array.from({ length: 5 }, (_, i) => fetchResult(search, i * 10)))

    await fs.writeFile('scraped.json', JSON.stringify(pages.flat(), null, 4), 'utf-8')

}


main()
