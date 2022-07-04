import { MinusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songsRef } from "../../../config/firebase";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import { clearPlaylist, setPlaylist } from "../../../store/playlist.slice";

const { Meta } = Card;

function Content() {
  const dispatch = useDispatch();
  const [loading] = useState<boolean>();
  // const [data, setData] = useState([])
  const {
    user: {
      id
    },
  } = useSelector((state: IStoreType) => state.user);

  const {
    data
  } = useSelector((state: IStoreType) => state.playlist);


  useEffect(() => {
      dispatch(clearPlaylist())
      const query = songsRef.orderByChild("spotifyId").equalTo(id);
      query.once("value")
      .then(function(snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            dispatch(setPlaylist(childData));
            return
        });
        } else {
          console.log("No data Available")
          return null
        }
    }).catch((error) => {
          console.error(error);
          return null;
    });
    
  },[id, dispatch])

  return (
    <div style={{ margin: '5vmin' }}>
    <Row gutter={[12,18]}>
      {data.map(e => {
        return (
        <Col className="gutter-row" span={6}>
        <Card
          hoverable
          loading={loading}
          cover={<img style={{ height: '25vmin' }} alt="example" src={e.imageUrl} />}
        >
        <Meta title={e.name} description={['Remove', <MinusCircleOutlined style={{ marginLeft: '2vmin' }} />,]} />
        </Card>
      </Col>
        )
      })}
    </Row>
    </div>
  )
};

export default Content;
