import React, { useState, useEffect } from 'react';
import logo from '../../assets/spotify-logo-green.png';
import './NavBar.css';

function NavBar() {
    return(
        <header id="nav-bar">
            <img id="spotify-logo" src={logo} alt="spotify-logo" />
            <div id="title">Tamil Heardle</div>
            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label>
        </header>
    )
}


export default NavBar;