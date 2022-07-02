import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hello } from './views/hello';
import { HomePage } from './views/homePage';
import { Library } from './views/library';
import { pathNames } from './constants';
import { useDispatch } from 'react-redux';
import { setPlaylistData } from './store/playlist.slice';

const MainRouter = () => {
  const dispatch = useDispatch();
  dispatch(setPlaylistData({
    artist: 'Davido',
    songTitle: '',
  }))
  return (
    <Router>
      <Routes>
        <Route path={pathNames.home} element={<Hello />} />
        <Route path={pathNames.homePage} element={<HomePage />} />
        <Route path={pathNames.library} element={<Library />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;