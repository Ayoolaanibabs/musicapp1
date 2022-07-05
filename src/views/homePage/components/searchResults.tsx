import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Divider, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addSong, deleteSong } from "../../../config/firebase";
import { ISearchResult } from "../../../interfaces/SearchResultType.interface";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import { deleteSongFromPlaylist, setPlaylist } from "../../../store/playlist.slice";
import convertMsToMinutesSeconds from "../../../utilities/helper";

function SearchResults () {
  const dispatch = useDispatch();
  const { data } = useSelector((state: IStoreType) => state.searchResult);

  const playlistData = useSelector((state: IStoreType) => state.playlist);

  const {
    user: {
      id
    },
  } = useSelector((state: IStoreType) => state.user);

    const addTrack = async (item: ISearchResult) => {
      await addSong(id, item.imageUrl, item.name, item.trackUri);
      dispatch(setPlaylist({...item, spotifyId: id}));
    }

    const deleteTrack = (item: ISearchResult) => {
      deleteSong(item.trackUri, item.name); 
      dispatch(deleteSongFromPlaylist(item.trackUri));
      console.log(playlistData.data);
    }


  return(
    <div style={{ margin: '7vmin' }}>
    <List
      bordered
      // loading={loading}
      itemLayout="horizontal"
      size="small"
      dataSource={data}
      renderItem={(item: ISearchResult) => {
        const result = playlistData.data.find(playlist => item.trackUri === playlist.trackUri);
        return (
        <>
          <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.imageUrl} />}
                title={
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ width: '20vmin' }}>
                  {item.name}
                  </div>
                  <div style={{ width: '20vmin' }}>{item.album}</div>
                  <div>{convertMsToMinutesSeconds(Number(item.time))}</div>
                  { result ? <MinusCircleOutlined style={{ marginTop: '0.7vmin' }} onClick={() => deleteTrack(item)} /> : <PlusCircleOutlined style={{ marginTop: '0.7vmin' }} onClick={() => addTrack(item)} /> }
                </div>
                }
              />
          </List.Item>
          <Divider />
        </>
      )}}
    />
    </div>
  )
} 

export default SearchResults;
