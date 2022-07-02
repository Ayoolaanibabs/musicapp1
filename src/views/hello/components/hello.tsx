import React from 'react';
import logo from '../../../logo.svg';
import '../../../App.css';
import { setPlaylistData } from '../../../store/playlist.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { pathNames } from '../../../constants';

function Hello() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(setPlaylistData({
    artist: 'wizkid',
    songTitle: '',
  }))

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={() => navigate(pathNames.homePage)}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Hello;
