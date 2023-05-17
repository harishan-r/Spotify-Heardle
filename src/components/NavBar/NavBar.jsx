import React, { useState, useEffect } from 'react';
import logo from '../../assets/Spotify_Icon_CMYK_Green.png';
import './NavBar.css';

function NavBar() {
    return(
        <header id="nav-bar">
            <img id="spotify-logo" src={logo} alt="spotify-logo" />
            <div id="title">Spotify Heardle</div>
            {/* <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
            </label> */}
        </header>
    )
}


export default NavBar;