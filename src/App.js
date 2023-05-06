import React, { useState, useEffect } from 'react';
import WebPlayback from './components/WebPlayback/WebPlayback'
import Login from './components/Login/Login'
import './styles/App.css';
import GuessBar from './components/GuessBar/GuessBar';
import NavBar from './components/NavBar/NavBar';

function App() {

  const [token, setToken] = useState('');

  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token');
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
        
        { (token === '') ? <Login/> : (
        <div>
          <NavBar/>
          <GuessBar token={token} />
          <WebPlayback token={token} /> 
        </div>
        )}
    </>
  );
}


export default App;
