import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { Login } from './views/login';
import { HomePage } from './views/homePage';
import { Library } from './views/library';
import { pathNames } from './utilities/constants';
import { setUserData } from './store/user.slice';
import apiClient, { setClientToken } from './config/spotify';
import { setPlaylist } from './store/playlist.slice';
import { songsRef } from './config/firebase';

function MainRouter(): JSX.Element {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>('');
  const [id, setId] = useState<string>('');

  const isLogged = () => {
    const tokenExipiryTime: string = window.localStorage.getItem('tokenEXpiryTime') || '';
    if (moment().format() < tokenExipiryTime) {
      return;
    } else {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('tokenEXpiryTime');
      window.location.href = pathNames.login;
      return
    }
  };
  useEffect(() => {
    const token: string = window.localStorage.getItem('token') || '';
    const { hash } = window.location;
    window.location.hash = '';
    if(token) isLogged();
    if (!token && hash) {
      window.localStorage.setItem('tokenEXpiryTime', moment().add(1, 'hours').format());
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  useEffect(() => {
    // (async () => {
    apiClient.get('me').then((response) => {
      response.data.images.length !== 0 ? dispatch(setUserData({
        id: response.data.id,
        name: response.data.display_name,
        imageUrl: response.data.images[0].url,
      }))
        : dispatch(setUserData({
          id: response.data.id,
          name: response.data.display_name,
          imageUrl: <UserOutlined />,
        }));
      setId(response.data.id);
    });
    // })()
  });

  useEffect(() => {
    // dispatch(clearPlaylist())
    const query = songsRef.orderByChild('spotifyId').equalTo(id);
    query.once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            dispatch(setPlaylist(childData));
          });
        } else {
          console.log('No data Availablepp');
          return null;
        }
      }).catch((error) => {
        console.error(error);
        return null;
      });
  }, [id, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path={pathNames.login} element={<Login />} />
        <Route path={pathNames.wildroute} element={<Login />} />
        {!token ? <Route path={pathNames.wildroute} element={<Login />} /> : <Route path={pathNames.home} element={<HomePage />} />}
        {!token ? <Route path={pathNames.wildroute} element={<Login />} /> : <Route path={pathNames.library} element={<Library />} />}
      </Routes>
    </Router>
  );
}

export default MainRouter;
