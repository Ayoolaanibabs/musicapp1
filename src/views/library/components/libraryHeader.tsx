import { LogoutOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../config/spotify";
import {
  ICreatePlaylistData,
  IPlaylist,
  IPlaylistType,
} from "../../../interfaces/PlaylistType.interface";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import useWindowDimensions from "../../../hooks/windows";
import {
  CLASS_NAMES,
  IMAGE_ALT_TEXTS,
  MESSAGES,
  MUSIC_APP_TOKEN,
  MUSIC_APP_TOKEN_EXPIRY_TIME,
  NOTIFICATION_TYPE,
  PATH_NAMES,
  TEXTS,
} from "../../../utilities/constants";
import { sendNotification } from "../../../utilities/helper";
import "./index.css";
import { IUserType } from "../../../interfaces/UserType.interface";

const { Text } = Typography;

function LibraryHeader(): JSX.Element {
  const navigate = useNavigate();
  const {
    user: { name, imageUrl, id },
  }: IUserType = useSelector((state: IStoreType) => state.user);

  const { data }: IPlaylistType = useSelector(
    (state: IStoreType) => state.playlist
  );

  const logout = (): void => {
    window.localStorage.removeItem(MUSIC_APP_TOKEN);
    window.localStorage.removeItem(MUSIC_APP_TOKEN_EXPIRY_TIME);
    window.location.href = PATH_NAMES.LOGIN;
  };

  const createPlaylist = (): void => {
    const data: ICreatePlaylistData = {
      name: TEXTS.PLAYLIST_NAME,
      description: TEXTS.PLAYLIST_DESCRIPTION,
      public: false,
    };
    apiClient
      .post(`users/${id}/playlists`, data)
      .then((response) => {
        addToSpotifyPlaylist(response.data.id);
      })
      .catch((error) => {
        sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
      });
  };

  const addToSpotifyPlaylist = (playlistId: string): void => {
    const songUris: string[] = [];
    data.forEach((e: IPlaylist) => {
      songUris.push(e.trackUri);
    });
    const uris = songUris.join(",");
    apiClient
      .post(`playlists/${playlistId}/tracks?uris=${uris}`)
      .then(() => {
        sendNotification(
          NOTIFICATION_TYPE.SUCCESS,
          MESSAGES.PLAYLIST_EXPORT_SUCCESS
        );
      })
      .catch((error) => {
        sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
      });
  };

  const { isExtraSmall, isSmall } = useWindowDimensions();

  const exportText = (): string => {
    if (isExtraSmall || isSmall) {
      return TEXTS.EXPORT;
    } else {
      return TEXTS.EXPORT_TO_MY_SPOTIFY;
    }
  };

  return (
    <div className={CLASS_NAMES.HOME_HEADER}>
      <Text>
        <img
          src={imageUrl}
          className={CLASS_NAMES.AVATAR}
          alt={IMAGE_ALT_TEXTS.USER}
        />
      </Text>
      <Text>
        <Button shape="round" onClick={createPlaylist}>
          {exportText()}
        </Button>
      </Text>
      <div className={CLASS_NAMES.LIBRARY_TEXT} data-testid="library-text">
        My Library
      </div>
      <Text>
        <Button
          shape="round"
          data-testid="search"
          onClick={() => navigate(PATH_NAMES.HOME)}
        >
          Search
        </Button>
      </Text>
      <Text>
        <Popconfirm
          title={`${MESSAGES.HI} ${name.split(" ")[0]}, ${MESSAGES.SIGN_OUT}`}
          onConfirm={logout}
          okText={TEXTS.YES}
          cancelText={TEXTS.NO}
          placement="bottomLeft"
        >
          <LogoutOutlined className={CLASS_NAMES.LOGOUT} />
        </Popconfirm>
      </Text>
    </div>
  );
}

export default LibraryHeader;
