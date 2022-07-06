import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Card, Col, Divider, Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSong, deleteSong } from '../../../config/firebase';
import apiClient from '../../../config/spotify';
import { INewRelease } from '../../../interfaces/NewReleaseType.interface';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { setNewRelease } from '../../../store/newRelease.slice';
import { deleteSongFromPlaylist, setPlaylist } from '../../../store/playlist.slice';
import {
  ALBUM_TYPE,
  ANTD_META_DESCRIPTION_SAVE_TO_LIBRARY,
  CLASS_NAMES,
  IMAGE_ALT_TEXTS,
  MESSAGES,
  NOTIFICATION_TYPE,
  SPOTIFY_URLS
} from '../../../utilities/constants';
import { sendNotification } from '../../../utilities/helper';
import './index.css';

const { Meta } = Card;

function NewReleases() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>();

  const { data } = useSelector((state: IStoreType) => state.newRelease);

  const playlistData = useSelector((state: IStoreType) => state.playlist);

  const getTrackFromAlbumId = (albumId: string, imageUrl: string, albumName: string, albumType: string) => {
    apiClient.get(`${SPOTIFY_URLS.GET_ALBUM_TRACKS_ALBUMS}${albumId}${SPOTIFY_URLS.GET_ALBUM_TRACKS_TRACK}`)
    .then((response) => {
      if(albumType === ALBUM_TYPE.SINGLE) {
        dispatch(setNewRelease({
          name: response.data.items[0].name,
          imageUrl,
          trackUri: response.data.items[0].uri,
        }));
      }else {
        dispatch(setNewRelease({
          name: albumName,
          imageUrl,
          trackUri: null,
        }));
      }
    }).catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
  }

  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        setLoading(true);
        await apiClient.get(SPOTIFY_URLS.NEW_RELEASES).then((response) => {
          setLoading(false);
          response.data.albums.items.forEach((element: any) => {
            getTrackFromAlbumId(element.id, element.images[1].url, element.name, element.album_type);
          });
        }).catch((error) => {
          sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
        });
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch, data.length]);

  const {
    user: {
      id,
    },
  } = useSelector((state: IStoreType) => state.user);
  const addTrack = async (item: INewRelease) => {
    if (item.trackUri === null){
      sendNotification(NOTIFICATION_TYPE.ERROR, `${item.name} ${MESSAGES.CANNOT_ADD_ALBUM}`)
    } else{
      await addSong(id, item.imageUrl, item.name, item.trackUri);
      dispatch(setPlaylist({ ...item, spotifyId: id }));
    }
  };

  const deleteTrack = (item: INewRelease) => {
    deleteSong(item.trackUri, item.name);
    dispatch(deleteSongFromPlaylist(item.trackUri));
  };

  return (
    <>
      <Divider orientation='left'>New Releases</Divider>
      <Row gutter={12} className={CLASS_NAMES.NEW_RELEASE_ROW}>
        {data.map((e: INewRelease) => {
          const result = playlistData.data.find((playlist) => e.trackUri === playlist.trackUri);
          return (
            <Col span={5}>
              <Card
                hoverable
                loading={loading}
                cover={<img className={CLASS_NAMES.CARD_IMAGE} alt={IMAGE_ALT_TEXTS.USER} src={e.imageUrl} />}
              >
                <Meta
                  title={e.name}
                  description={[
                    ANTD_META_DESCRIPTION_SAVE_TO_LIBRARY,
                    <div>
                    { result ? <MinusCircleOutlined className={CLASS_NAMES.ICON_MARGIN_TOP} onClick={() => deleteTrack(e)} /> : <PlusCircleOutlined className={CLASS_NAMES.ICON_MARGIN_TOP} onClick={() => addTrack(e)} /> }
                    </div>
                  ]}
                />
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  );
}

export default NewReleases;
