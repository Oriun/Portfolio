import React from 'react'
import DesktopItem from 'src/components/DesktopItem'
import './desktop.scss'
import Config from 'src/Config.json'

const Desktop = () => {
    return (
        <div className='desktop'>
            {Config.desktop.map(item=><DesktopItem {...item} key={item.name}/>)}
        </div>
    )
}

export default Desktop
