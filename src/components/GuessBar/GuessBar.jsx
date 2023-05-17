import React, { useState, useEffect } from 'react';
import PlaybackController from '../../utils/PlaybackController';
import "./GuessBar.css"

function GuessBar(props) {
    const [value, setValue] = useState('');
    const [playlist, setPlaylist] = useState(undefined);
    const [list, setList] = useState([]);
    const [current_track, setCurrentTrack] = useState("");
    const [isCorrect, setCorrect] = useState(false);

    const controller = new PlaybackController(props.token);

    const guessList = list => {
        let content = [];

        for (let i = 0; i < 5; i++) {
            let check_id = "check-" + i;
            if(list[i] && isCorrect && i == list.length - 1) {
                content.push(<div>
                                <div className="alert alert-dark" data-bs-theme="dark" key={i}>
                                    <svg id={check_id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" className="bi bi-check-lg check-icon" viewBox="0 0 16 16">
                                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                    </svg>
                                    {list[i]}</div>
                            </div>);
            } else if(list[i]) {
                content.push(<div>
                                <div className="alert alert-dark" data-bs-theme="dark" key={i}>
                                    <svg id={check_id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" className="bi bi-x cross-icon" viewBox="0 0 16 16">
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                    {list[i]}</div>
                            </div>);
            } else {
                content.push(<div className="alert alert-dark" data-bs-theme="dark" role="alert" key={i}> </div>);
            }
            
        }
        return content;
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }
    const onGuess = async (guess) => {
        setValue("");
        setList([...list, guess]);
        const track = await controller.getCurrentSong();
        setCurrentTrack(track);
        console.log(track);
        console.log("Guess Check: " + guess);
        if(track == guess){
            console.log("CORRECT!");
            setCorrect(true);
        }
    }
    
    useEffect( async () => {
        const tracklist = await controller.fetchPlaylist();
        setPlaylist(tracklist);
        //controller.toggleShuffle(true);
        console.log(tracklist);
    }, []);

    if (playlist) {
        return(
            <div className="guess-container">
                <ul className="guessed-list">{guessList(list)}</ul>
                <div>{list.length == 5 || isCorrect ? "Answer: " + current_track : ""}</div>
                <div className="guess-inner">
                    <input id="search-input" className="alert alert-secondary" data-bs-theme="dark" type="text" value={value} onChange={onChange} placeholder="Enter Guess..." disabled={list.length == 5 || isCorrect}></input>
                    <button id="search-btn" disabled={value == "" || isCorrect} onClick={()=>onGuess(value)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
                <ul className="guess-dropdown">
                    {playlist.filter((item) => {
                        const guess = value.toLowerCase();
                        const song = item.toLowerCase();

                        return guess && song.startsWith(guess) && guess != song;
                    }).slice(0,3)
                    .map(element => {
                        return <li className="list-group-item" onClick={() => setValue(element)} key={element}>{element}</li>
                    })}
                </ul>
            </div>
        )
    } else {
        return (
            <div className="guess-container">
                    <div className="guess-inner">
                        <input type="text" value={value} onChange={onChange} placeholder="Enter Guess..."></input>
                        <button onClick={()=>onGuess(value)}>Guess!</button>
                    </div>
            </div>
        )
    }
}

export default GuessBar