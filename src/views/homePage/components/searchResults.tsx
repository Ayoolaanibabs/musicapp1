import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Divider, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, deleteSong } from '../../../config/firebase';
import { ISearchResult } from '../../../interfaces/SearchResultType.interface';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { deleteSongFromPlaylist, setPlaylist } from '../../../store/playlist.slice';
import { CLASS_NAMES, HORIZONTAL_LIST_ITEM_LAYOUT, LIST_SIZE_SMALL } from '../../../utilities/constants';
import convertMsToMinutesSeconds from '../../../utilities/helper';
import './index.css';

function SearchResults() {
  const dispatch = useDispatch();
  const { data } = useSelector((state: IStoreType) => state.searchResult);

  const playlistData = useSelector((state: IStoreType) => state.playlist);

  const {
    user: {
      id,
    },
  } = useSelector((state: IStoreType) => state.user);

  const addTrack = async (item: ISearchResult) => {
    await addSong(id, item.imageUrl, item.name, item.trackUri);
    dispatch(setPlaylist({ ...item, spotifyId: id }));
  };

  const deleteTrack = (item: ISearchResult) => {
    deleteSong(item.trackUri, item.name);
    dispatch(deleteSongFromPlaylist(item.trackUri));
  };

  return (
    <div className={CLASS_NAMES.CONTAINER}>
      <List
        bordered
      // loading={loading}
        itemLayout={HORIZONTAL_LIST_ITEM_LAYOUT}
        size={LIST_SIZE_SMALL}
        dataSource={data}
        renderItem={(item: ISearchResult) => {
          const result = playlistData.data.find((playlist) => item.trackUri === playlist.trackUri);
          return (
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.imageUrl} />}
                  title={(
                    <div className={CLASS_NAMES.LIST_ITEM_TITLE}>
                      <div className={CLASS_NAMES.LIST_ITEM_NAME}>
                        {item.name}
                      </div>
                      <div className={CLASS_NAMES.LIST_ITEM_NAME}>{item.album}</div>
                      <div>{convertMsToMinutesSeconds(Number(item.time))}</div>
                      { result ? <MinusCircleOutlined className={CLASS_NAMES.ICON_MARGIN_TOP} onClick={() => deleteTrack(item)} /> : <PlusCircleOutlined className={CLASS_NAMES.ICON_MARGIN_TOP} onClick={() => addTrack(item)} /> }
                    </div>
                )}
                />
              </List.Item>
              <Divider />
            </>
          );
        }}
      />
    </div>
  );
}

export default SearchResults;
