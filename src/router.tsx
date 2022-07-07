import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Login } from './views/login';
import { HomePage } from './views/homePage';
import { Library } from './views/library';
import { CHILD_TYPE, MUSIC_APP_TOKEN, MUSIC_APP_TOKEN_EXPIRY_TIME, NOTIFICATION_TYPE, PATH_NAMES } from './utilities/constants';
import { setUserData } from './store/user.slice';
import apiClient, { setClientToken } from './config/spotify';
import { setPlaylist } from './store/playlist.slice';
import { songsRef } from './config/firebase';
import { sendNotification } from './utilities/helper';

function MainRouter(): JSX.Element {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>('');
  const [id, setId] = useState<string>('');

  const isLogged = () => {
    const tokenExipiryTime: string = window.localStorage.getItem(MUSIC_APP_TOKEN_EXPIRY_TIME) || '';
    if (moment().format() < tokenExipiryTime) {
      return;
    } else {
      window.localStorage.removeItem(MUSIC_APP_TOKEN);
      window.localStorage.removeItem(MUSIC_APP_TOKEN_EXPIRY_TIME);
      window.location.href = PATH_NAMES.LOGIN;
      return
    }
  };
  useEffect(() => {
    const token: string = window.localStorage.getItem(MUSIC_APP_TOKEN) || '';
    const { hash } = window.location;
    window.location.hash = '';
    if(token) isLogged();
    if (!token && hash) {
      window.localStorage.setItem(MUSIC_APP_TOKEN_EXPIRY_TIME, moment().add(1, 'hours').format());
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem(MUSIC_APP_TOKEN, _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  useEffect(() => {
    if (token) {
    apiClient.get('me').then((response) => {
      response.data.images.length !== 0 ? dispatch(setUserData({
        id: response.data.id,
        name: response.data.display_name,
        imageUrl: response.data.images[0].url,
      }))
        : dispatch(setUserData({
          id: response.data.id,
          name: response.data.display_name,
          imageUrl: 'https://i.stack.imgur.com/34AD2.jpg',
        }));
      setId(response.data.id);
    }).catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
  }
  });

  useEffect(() => {
    if(token){
    const query = songsRef.orderByChild(CHILD_TYPE.SPOTIFY_ID).equalTo(id);
    query.once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            dispatch(setPlaylist(childData));
          });
        }
      }).catch((error) => {
        sendNotification(NOTIFICATION_TYPE.ERROR, error.message);
      });
    }
  }, [id, dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path={PATH_NAMES.LOGIN} element={<Login />} />
        <Route path={PATH_NAMES.WILD_ROUTE} element={<Login />} />
        {token ? <Route path={PATH_NAMES.HOME} element={<HomePage />} /> : <Route path={PATH_NAMES.LOGIN} element={<Login />} />}
        {token ? <Route path={PATH_NAMES.LIBRARY} element={<Library />} /> : <Route path={PATH_NAMES.LOGIN} element={<Login />} />}
      </Routes>
    </Router>
  );
}

export default MainRouter;
