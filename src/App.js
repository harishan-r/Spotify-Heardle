import React, { useState, useEffect } from 'react';
import WebPlayback from './components/WebPlayback/WebPlayback'
import Login from './components/Login/Login'
import './styles/App.css';

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
          
          <WebPlayback token={token} /> 
        </div>
        )}
    </>
  );
}


export default App;
