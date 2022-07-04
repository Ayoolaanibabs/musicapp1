import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './views/login';
import { HomePage } from './views/homePage';
import { Library } from './views/library';
import { pathNames } from './constants';
import { useDispatch } from 'react-redux';
import { setUserData } from './store/user.slice';
import { useEffect, useState } from 'react';
import apiClient, { setClientToken } from './config/spotify';
import { UserOutlined } from '@ant-design/icons';

const MainRouter = (): JSX.Element => {
  const dispatch = useDispatch();

  const [token, setToken] = useState<string>("");

  useEffect(()=>{
    const token: string = window.localStorage.getItem("token") || "";
    const hash = window.location.hash;
    window.location.hash = "";
    if(!token && hash){
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
    
  },[])

  useEffect(() => {
    (async () => {
      apiClient.get("me").then(response => {response.data.images.length !== 0 ? dispatch(setUserData({
        id: response.data.id,
        name: response.data.display_name,
        imageUrl: response.data.images[0].url
      })) : 
      dispatch(setUserData({
        id: response.data.id,
        name: response.data.display_name,
        imageUrl: <UserOutlined />
      }))
    });
    })()
  })
  return (
    <Router>
      <Routes>
        <Route path={pathNames.login} element={<Login />} />
        {token ?
        <>
        <Route path={pathNames.home} element={<HomePage />} />
        <Route path={pathNames.library} element={<Library />} />
        </>
        :
        <Route path={pathNames.login} element={<Login />}  />} 
      </Routes>
    </Router>
  );
};

export default MainRouter;
