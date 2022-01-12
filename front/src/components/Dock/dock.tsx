import React from 'react'
import DockItem from '../DockItem'
import './dock.scss'
import Config from '../../Config.json'

const Bottom = () => {
    return (
        <div className="dock box-1">
          {Config.dock.map(app => (
            <DockItem key={app.name} {...app}/>
          ))}
        </div>
    )
}

export default Bottom
