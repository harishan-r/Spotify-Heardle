import React, { useState, useEffect } from 'react';
import PlaybackController from '../../utils/PlaybackController';
import "./WebPlayback.css"

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [counter, setCounter] = React.useState(2);
    
    const controller = new PlaybackController(props.token); 
    
    
    useEffect(async () => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = async () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', async ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                const tracklist = await controller.fetchPlaylistIds();
                console.log(tracklist);
                await controller.startPlayback(device_id, "0Jd4bO2Yw65QXmpgiHpCgq");
            });
            

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {
                if (!state) {
                    
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
                
            }));
            
            player.connect();
            

        };
    }, []);

    useEffect(() => {
        const timer =
          counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }, [counter]);

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Please wait as we prepare the spotify player </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">

                        {/* <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" /> */}

                        <div className="now-playing__side">
                            {/* <div className="now-playing__name">{current_track.name}</div> */}
                            {/* <div className="now-playing__artist">{current_track.artists[0].name}</div> */}

                            {/* <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
                                &lt;&lt;
                            </button> */}
                            <div>Countdown: {counter}</div>
                            <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
                                { is_paused ? "PLAY" : "PAUSE" }
                            </button>

                            {/* <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
                                &gt;&gt;
                            </button> */}
                            {/* <button className= "btn-spotify" onClick={() => {controller.toggleShuffle(true) }}> SHUFFLE</button> */}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default WebPlayback
