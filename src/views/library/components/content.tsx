import { MinusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Popconfirm, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong, songsRef } from "../../../config/firebase";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import { clearPlaylist, deleteSongFromPlaylist, setPlaylist } from "../../../store/playlist.slice";

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

  const confirm = (songUri: string, name: string, index: number) => {
    deleteSong(songUri, name); 
    dispatch(deleteSongFromPlaylist(index));
  }


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
      {data.map((e, index:number) => {
        return (
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
            onConfirm={() => confirm(e.songUri, e.name, index)}
            okText="Yes"
            cancelText="No"
          >
          <MinusCircleOutlined style={{ marginLeft: '2vmin' }} />
          </Popconfirm> 

        ,]} />
        </Card>
      </Col>
        )
      })}
    </Row>
    </div>
  )
};

export default Content;
