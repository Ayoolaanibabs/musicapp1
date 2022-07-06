import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import apiClient from '../../../config/spotify';
import { ICreatePlaylistData, IPlaylist } from '../../../interfaces/PlaylistType.interface';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { BOTTOM_LEFT_PLACEMENT, IMAGE_ALT_TEXTS, MESSAGES, MUSIC_APP_TOKEN, MUSIC_APP_TOKEN_EXPIRY_TIME, NOTIFICATION_TYPE, PATH_NAMES, SPOTIFY_URLS, TEXTS } from '../../../utilities/constants';
import { sendNotification } from '../../../utilities/helper';
import './index.css';

const { Text } = Typography;

function LibraryHeader() {
  const {
    user: {
      name, imageUrl,
    },
  } = useSelector((state: IStoreType) => state.user);

  const {
    user: {
      id,
    },
  } = useSelector((state: IStoreType) => state.user);

  const { data } = useSelector((state: IStoreType) => state.playlist);

  const logout = () => {
    window.localStorage.removeItem(MUSIC_APP_TOKEN);
    window.localStorage.removeItem(MUSIC_APP_TOKEN_EXPIRY_TIME);
    window.location.href = PATH_NAMES.LOGIN;
  };

  const createPlaylist = () => {
    const data: ICreatePlaylistData = {
      name: TEXTS.PLAYLIST_NAME,
      description: TEXTS.PLAYLIST_DESCRIPTION,
      public: false,
    };
    apiClient.post(`${SPOTIFY_URLS.CREATE_PLAYLIST_USER}${id}${SPOTIFY_URLS.CREATE_PLAYLIST_PLAYLISTS}`, data)
    .then((response) => {
      addToSpotifyPlaylist(response.data.id);
    }).catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
  };

  const addToSpotifyPlaylist = (playlistId: string) => {
    const songUris: string[] = [];
    data.forEach((e: IPlaylist) => {
      songUris.push(e.trackUri);
    });
    const uris = songUris.join(',');
    apiClient.post(`${SPOTIFY_URLS.ADD_TO_PLAYLIST_PLAYLISTS}${playlistId}${SPOTIFY_URLS.ADD_TO_PLATLIST_TRACK}${uris}`)
    .then(() => {
      sendNotification(NOTIFICATION_TYPE.SUCCESS, MESSAGES.PLAYLIST_EXPORT_SUCCESS);
    }).catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text type="warning">
        <Avatar src={imageUrl} alt={IMAGE_ALT_TEXTS.USER} />
      </Text>
      <Text type="warning">
        <div style={{ cursor: 'pointer' }} onClick={createPlaylist}>
          Export To My Spotify
        </div>
      </Text>
      <Text type="warning">
        My library
      </Text>
      <Link to={PATH_NAMES.HOME}>
        Search
      </Link>
      <Text>
        <Popconfirm
          title={`${MESSAGES.HI} ${name.split(' ')[0]}, ${MESSAGES.SIGN_OUT}`}
          onConfirm={logout}
          okText={TEXTS.YES}
          cancelText={TEXTS.NO}
          placement={BOTTOM_LEFT_PLACEMENT}
        >
          <LogoutOutlined style={{ color: '#ffffff' }} />
        </Popconfirm>
      </Text>
    </div>
  );
}

export default LibraryHeader;
