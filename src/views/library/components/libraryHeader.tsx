import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Typography } from "antd";
import { useSelector } from 'react-redux';
import apiClient from '../../../config/spotify';
import { ICreatePlaylistData, IPlaylist } from '../../../interfaces/PlaylistType.interface';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { pathNames } from '../../../utilities/constants';
import { sendNotification } from '../../../utilities/helper';

const { Text } = Typography;

function LibraryHeader()  {

  const {
    user: {
      name, imageUrl
    },
  } = useSelector((state: IStoreType) => state.user);

  const {
    user: {
      id
    },
  } = useSelector((state: IStoreType) => state.user);

  const { data } = useSelector((state: IStoreType) => state.playlist);
  
  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = pathNames.login;
  }

  const createPlaylist = () => {
    const data: ICreatePlaylistData = {
      name: 'Music App Playlist',
      description:  'Playlist from music app',
      public: false,
    }
    apiClient.post(`users/${id}/playlists`, data).then(response => {
      addToSpotifyPlaylist(response.data.id);
    })
  }

  const addToSpotifyPlaylist = (playlistId: string) => {
    const songUris: string[] = []
    data.forEach((e: IPlaylist) => {
      songUris.push(e.trackUri);
    })
    const uris = songUris.join("%20");
    apiClient.post(`playlists/${playlistId}/tracks?uris=${uris}`).then(() => {
      sendNotification('success', 'Playlist Successfully Created')
    })
  }

  return(
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <Text type="warning">
            <Avatar src={imageUrl} alt="user" />
          </Text>
          <Text type="warning">
            <div style={{ cursor: 'pointer' }} onClick={createPlaylist}>
            Export To My Spotify
            </div>
          </Text>
          <Text type="warning">
            My library
          </Text>
          <Text type='warning' style={{ cursor: 'pointer' }} onClick={() => window.location.href = pathNames.home}>
            Search
          </Text>
          <Text>
          <Popconfirm
            title={`Hi ${name.split(' ')[0]}, you are about to sign out of your account`}
            onConfirm={logout}
            okText="Yes"
            cancelText="No"
            placement='bottomLeft'
          >
            <LogoutOutlined style={{ color: '#ffffff' }} />
          </Popconfirm>
            </Text>

        </div>
  )
}

export default LibraryHeader;
