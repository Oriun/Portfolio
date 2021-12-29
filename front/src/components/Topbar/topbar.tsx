import React from "react";
import "./topbar.scss";

const Topbar = (): JSX.Element => {
  return (
    <div className="topbar">
      <nav>
        <h1>Portfolio</h1>
      </nav>
      <header>
        <button>batterie</button>
        <button>wifi</button>
        <button>find</button>
        <button>control</button>
        <button>date</button>
      </header>
    </div>
  );
};

export default Topbar;
