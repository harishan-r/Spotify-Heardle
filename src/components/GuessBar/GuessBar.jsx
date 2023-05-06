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
            if(list[i]) {
                content.push(<div className="alert alert-dark" data-bs-theme="dark" key={i}>{list[i]}</div>);
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
                <div>{list.length == 5 ? "Answer: " + current_track : ""}</div>
                <div>{isCorrect ? "Good Job!" : ""}</div>
                <div className="guess-inner">
                    <input className="alert alert-secondary" data-bs-theme="dark" type="text" value={value} onChange={onChange} placeholder="Enter Guess..." disabled={list.length == 5 || isCorrect}></input>
                    <button disabled={value == "" || isCorrect} onClick={()=>onGuess(value)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
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