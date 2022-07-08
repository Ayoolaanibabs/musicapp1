import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong, deleteSong } from "../../../config/firebase";
import apiClient from "../../../config/spotify";
import useWindowDimensions from "../../../hooks/windows";
import { INewRelease, INewReleaseType } from "../../../interfaces/NewReleaseType.interface";
import { IPlaylistType } from "../../../interfaces/PlaylistType.interface";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import { IUserType } from "../../../interfaces/UserType.interface";
import { setNewRelease } from "../../../store/newRelease.slice";
import {
  deleteSongFromPlaylist,
  setPlaylist,
} from "../../../store/playlist.slice";
import {
  ALBUM_TYPE,
  CLASS_NAMES,
  IMAGE_ALT_TEXTS,
  LARGE_SIZE_NEW_RELEASES_COLUMN_SPAN,
  MY_LIBRARY_NEW_RELEASES_ROW_COLUMN_GUTTER,
  NOTIFICATION_TYPE,
  SMALL_SIZE_NEW_RELEASES_COLUMN_SPAN,
  SPOTIFY_IMAGE_URL_INDEX,
  SPOTIFY_URLS,
  TEXTS,
} from "../../../utilities/constants";
import { sendNotification } from "../../../utilities/helper";
import "./index.css";

const { Meta } = Card;

function NewReleases(): JSX.Element {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>();

  const { data }: INewReleaseType = useSelector((state: IStoreType) => state.newRelease);

  const playlistData: IPlaylistType = useSelector((state: IStoreType) => state.playlist);

  const getTrackFromAlbumId = (
    albumId: string,
    imageUrl: string,
    albumName: string,
    albumType: string
  ): void => {
    apiClient
      .get(
        `${SPOTIFY_URLS.GET_TRACK_FROM_ALBUM_ALBUMS}${albumId}${SPOTIFY_URLS.GET_TRACK_FROM_ALBUM_TRACKS}`
      )
      .then((response) => {
        if (albumType === ALBUM_TYPE.SINGLE) {
          dispatch(
            setNewRelease({
              name: response.data.items[0].name,
              imageUrl,
              trackUri: response.data.items[0].uri,
            })
          );
        } else {
          dispatch(
            setNewRelease({
              name: albumName,
              imageUrl,
              trackUri: null,
            })
          );
        }
      })
      .catch((error) => {
        sendNotification(NOTIFICATION_TYPE.ERROR, `${error.messsage}`);
      });
  };

  useEffect((): void => {
    if (data.length === 0) {
      (async (): Promise<void> => {
        setLoading(true);
        await apiClient
          .get(SPOTIFY_URLS.NEW_RELEASES)
          .then((response) => {
            setLoading(false);
            response.data.albums.items.forEach((element: any) => {
              getTrackFromAlbumId(
                element.id,
                element.images[SPOTIFY_IMAGE_URL_INDEX].url,
                element.name,
                element.album_type
              );
            });
          })
          .catch((error) => {
            sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
          });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data.length]);

  const {
    user: { id },
  }: IUserType = useSelector((state: IStoreType) => state.user);
  const addTrack = async (item: INewRelease): Promise<void> => {
    await addSong(id, item.imageUrl, item.name, item.trackUri);
    dispatch(setPlaylist({ ...item, spotifyId: id }));
  };

  const deleteTrack = (item: INewRelease): void => {
    deleteSong(item.trackUri, item.name);
    dispatch(deleteSongFromPlaylist(item.trackUri));
  };

  const { isExtraSmall, isSmall, isMedium } = useWindowDimensions();

  const span = (): number => {
    if (isExtraSmall || isSmall || isMedium) {
      return SMALL_SIZE_NEW_RELEASES_COLUMN_SPAN;
    } else {
      return LARGE_SIZE_NEW_RELEASES_COLUMN_SPAN;
    }
  };

  return (
    <>
      <Divider orientation="left" data-testid="new-releases">
        New Releases
      </Divider>
      <Row
        gutter={MY_LIBRARY_NEW_RELEASES_ROW_COLUMN_GUTTER}
        className={CLASS_NAMES.NEW_RELEASE_ROW}
      >
        {data.map((e: INewRelease) => {
          const result = playlistData.data.find(
            (playlist) => e.trackUri === playlist.trackUri
          );
          return (
            <Col span={span()}>
              <Card
                hoverable
                loading={loading}
                cover={
                  <img
                    className={CLASS_NAMES.CARD_IMAGE}
                    alt={IMAGE_ALT_TEXTS.USER}
                    src={e.imageUrl}
                  />
                }
              >
                <Meta
                  title={e.name}
                  description={[
                    <div
                      onClick={() => (result ? deleteTrack(e) : addTrack(e))}
                    >
                      {result ? `${TEXTS.REMOVE}` : `${TEXTS.SAVE}`} Library
                      {result ? (
                        <MinusCircleOutlined
                          className={CLASS_NAMES.ICON_MARGIN_TOP}
                        />
                      ) : (
                        <PlusCircleOutlined
                          className={CLASS_NAMES.ICON_MARGIN_TOP}
                        />
                      )}
                    </div>,
                  ]}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default NewReleases;
