import React, { useState, useEffect } from 'react';
import PlaybackController from '../../utils/PlaybackController';

function GuessBar(props) {
    const [value, setValue] = useState('');
    const [playlist, setPlaylist] = useState(undefined);
    const [list, setList] = useState([]);

    const guessList = list => {
        let content = [];

        for (let i = 0; i < 5; i++) {
            if(list[i]) {
                content.push(<li key={i}>{list[i]}</li>);
            } else {
                content.push(<li key={i}></li>);
            }
            
        }
        return content;
    }

    const onChange = (event) => {
        setValue(event.target.value);
    }
    const onGuess = (guess) => {
        //check if its right and update the count
        setValue("");
        setList([...list, guess]);
        console.log("Guess Check: " + guess);
    }
    
    useEffect( async () => {
        const controller = new PlaybackController(props.token);
        const tracklist = await controller.fetchPlaylist();
        setPlaylist(tracklist);
        console.log(tracklist);
    }, []);

    if (playlist) {
        return(
            <div className="guess-container">
                <ul>{guessList(list)}</ul>
                <div>{list.length == 5 ? "Answer: " : ""}</div>
                <div className="guess-inner">
                    <input type="text" value={value} onChange={onChange} placeholder="Enter Guess..." disabled={list.length == 5}></input>
                    <button disabled={value == ""} onClick={()=>onGuess(value)}>Guess!</button>
                </div>
                <div className="guess-dropdown">
                    {playlist.filter((item) => {
                        const guess = value.toLowerCase();
                        const song = item.toLowerCase();

                        return guess && song.startsWith(guess) && guess != song;
                    }).slice(0,5)
                    .map(element => {
                        return <div className="dropdown-row" onClick={() => setValue(element)} key={element}>{element}</div>
                    })}
                </div>
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