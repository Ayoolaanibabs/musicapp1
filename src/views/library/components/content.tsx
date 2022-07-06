import { MinusCircleOutlined } from '@ant-design/icons';
import {
  Card, Col, Popconfirm, Row,
} from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../../config/firebase';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { deleteSongFromPlaylist } from '../../../store/playlist.slice';
import { CLASS_NAMES, IMAGE_ALT_TEXTS, TEXTS } from '../../../utilities/constants';
import './index.css';

const { Meta } = Card;

function Content() {
  const dispatch = useDispatch();
  const [loading] = useState<boolean>();

  const {
    data,
  } = useSelector((state: IStoreType) => state.playlist);

  const confirm = (trackUri: string, name: string) => {
    deleteSong(trackUri, name);
    dispatch(deleteSongFromPlaylist(trackUri));
  };

  return (
    <div className={CLASS_NAMES.CONTAINER}>
      <Row gutter={[12, 18]}>
        {data.map((e) => (
          <Col span={6}>
            <Card
              hoverable
              loading={loading}
              cover={<img className={CLASS_NAMES.CARD_IMAGE} alt={IMAGE_ALT_TEXTS.USER} src={e.imageUrl} />}
            >
              <Meta
                title={e.name}
                description={[
                  'Remove',
                  <Popconfirm
                    title={`${TEXTS.DELETE} ${e.name} ${TEXTS.FROM_LIBRARY}`}
                    onConfirm={() => confirm(e.trackUri, e.name)}
                    okText={TEXTS.YES}
                    cancelText={TEXTS.NO}
                  >
                    <MinusCircleOutlined className={CLASS_NAMES.ICON_MARGIN_LEFT} />
                  </Popconfirm>,

                ]}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Content;
