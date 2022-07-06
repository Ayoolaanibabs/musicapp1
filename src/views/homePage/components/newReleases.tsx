import { PlusCircleOutlined } from '@ant-design/icons';
import {
  Card, Col, Divider, Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../../../config/spotify';
import { INewRelease } from '../../../interfaces/NewReleaseType.interface';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { setNewRelease } from '../../../store/newRelease.slice';
import {
  ANTD_META_DESCRIPTION_SAVE_TO_LIBRARY,
  CLASS_NAMES,
  IMAGE_ALT_TEXTS,
  SPOTIFY_URLS
} from '../../../utilities/constants';
import './index.css';

const { Meta } = Card;

function NewReleases() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>();

  const { data } = useSelector((state: IStoreType) => state.newRelease);

  // const playlistData = useSelector((state: IStoreType) => state.playlist);

  useEffect(() => {
    if (data.length === 0) {
      (async () => {
        setLoading(true);
        await apiClient.get(SPOTIFY_URLS.NEW_RELEASES).then((response) => {
          setLoading(false);
          response.data.albums.items.forEach((element: any) => {
            dispatch(setNewRelease({
              name: element.name,
              imageUrl: element.images[1].url,
            }));
          });
        });
      })();
    }
  }, [data.length, dispatch]);

  return (
    <>
      <Divider orientation='left'>New Releases</Divider>
      <Row gutter={12} className={CLASS_NAMES.NEW_RELEASE_ROW}>
        {data.map((e: INewRelease, index: number) =>
        // console.log(playlistData.data, e.imageUrl);
        // const added = data.find(playlist => e.name === playlist.name);
        // console.log(added);
        // const search = what => array.find(element => element.name === what);
          (
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
                    <PlusCircleOutlined className={CLASS_NAMES.ICON_MARGIN_LEFT} />,
                  // `${ loading ? <MinusCircleOutlined style={{ marginLeft: '2vmin' }}  /> : <PlusCircleOutlined style={{ marginLeft: '2vmin' }} />}`,
                  ]}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default NewReleases;
