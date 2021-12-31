import React from "react";
import Clock from "../Clock";
import "./topbar.scss";
import { BsBatteryFull, BsWifi } from 'react-icons/bs'
import { CgSearch } from 'react-icons/cg'
import { ReactComponent as ControlCenter } from '../../assets/control-center.svg'

const Topbar = (): JSX.Element => {
  return (
    <div className="topbar">
      <nav>
        <div className="logo" />
        <h1>Portfolio</h1>
      </nav>
      <header>
        <BsBatteryFull />
        <BsWifi />
        <CgSearch />
        <ControlCenter />
        <Clock tag='button' className="date"/>
      </header>
    </div>
  );
};

export default Topbar;
