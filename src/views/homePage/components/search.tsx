import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import apiClient from '../../../config/spotify';
import { clearSearchResult, setSearchResult } from '../../../store/searchResult.slice';
import { CLASS_NAMES, SPOTIFY_URLS, TEXTS } from '../../../utilities/constants';
import './index.css';

function Search() {
  const dispatch = useDispatch();
  const search = async (data: string) => {
    await apiClient.get(`${SPOTIFY_URLS.SEARCH}${data}${SPOTIFY_URLS.SEARCH_TYPE}`).then((response) => {
      response.data.tracks.items.forEach((element: any) => {
        dispatch(setSearchResult({
          name: element.name,
          imageUrl: element.album.images[1].url,
          album: element.album.name,
          time: element.duration_ms,
          trackUri: element.uri,
        }));
      });
    });
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(clearSearchResult());
    search(e.target.value);
  };

  return (
    <div>
      <Input placeholder={TEXTS.SEARCH} className={CLASS_NAMES.SEARCH} onChange={onChange} />
    </div>
  );
}

export default Search;
