import React from 'react'
import AppItem from '../AppItem'
import './dock.scss'
import Config from '../../Config.json'

const Bottom = () => {
    return (
        <div className="dock">
          {Config.dock.map((app, i) => (
            <AppItem key={app.name} active={!(i % 3)} {...app}/>
          ))}
        </div>
    )
}

export default Bottom
