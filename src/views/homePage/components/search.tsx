import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import apiClient from '../../../config/spotify';
import { clearSearchResult, setSearchResult } from '../../../store/searchResult.slice';
import { CLASS_NAMES, NOTIFICATION_TYPE, TEXTS } from '../../../utilities/constants';
import { sendNotification } from '../../../utilities/helper';
import './index.css';

function Search() {
  const dispatch = useDispatch();
  const search = async (data: string) => {
    await apiClient.get(`search?q=${data}&type=track`).then((response) => {
      response.data.tracks.items.forEach((element: any) => {
        dispatch(setSearchResult({
          name: element.name,
          imageUrl: element.album.images[1].url,
          album: element.album.name,
          time: element.duration_ms,
          trackUri: element.uri,
        }));
      });
    }).catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(clearSearchResult());
    search(e.target.value);
  };

  return (
    <div>
      <Input placeholder={TEXTS.SEARCH} prefix={<SearchOutlined />} className={CLASS_NAMES.SEARCH} onChange={onChange} />
    </div>
  );
}

export default Search;
