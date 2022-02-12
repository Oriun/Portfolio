import React from 'react'
import DesktopItem from 'src/components/DesktopItem'
import './desktop.scss'
import Config from 'src/Config.json'

const Desktop = () => {
    const [config, setConf] = React.useState(Config.desktop)
    function computeNNewPos(index: number){
        const { pos } = config[index]
        return function(vec: {x: number, y: number}){
            // pos
            console.log("Desktop",vec, pos)
        }
    }
    return (
        <div className='desktop'>
            {config.map((item,i)=><DesktopItem {...item} key={item.name} moveItem={computeNNewPos(i)} />)}
        </div>
    )
}

export default Desktop
