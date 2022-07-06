import { MinusCircleOutlined } from '@ant-design/icons';
import {
  Card, Col, Popconfirm, Row,
} from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../../config/firebase';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { deleteSongFromPlaylist } from '../../../store/playlist.slice';

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
    <div style={{ margin: '5vmin' }}>
      <Row gutter={[12, 18]}>
        {data.map((e, index:number) => (
          <Col className="gutter-row" span={6}>
            <Card
              hoverable
              loading={loading}
              cover={<img style={{ height: '25vmin' }} alt="example" src={e.imageUrl} />}
            >
              <Meta
                title={e.name}
                description={[
                  'Remove',
                  <Popconfirm
                    title={`Are you sure to delete ${e.name} from Library`}
                    onConfirm={() => confirm(e.trackUri, e.name)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <MinusCircleOutlined style={{ marginLeft: '2vmin' }} />
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
