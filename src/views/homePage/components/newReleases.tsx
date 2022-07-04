import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../../config/spotify";
import { INewRelease } from "../../../interfaces/NewReleaseType.interface";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import { setNewRelease } from "../../../store/newRelease.slice";

const { Meta } = Card;

function NewReleases() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>();

  const { data } = useSelector((state: IStoreType) => state.newRelease);
  // const { user }

  

  useEffect(() => {
    if(data.length === 0) {
      (async () => {
        setLoading(true);
        await apiClient.get("browse/new-releases?limit=4&type=track").then(response => {
          setLoading(false);
          response.data.albums.items.forEach((element: any) => {
            dispatch(setNewRelease({
              name: element.name,
              imageUrl: element.images[1].url
            }))
          });
        })
      })()
    }
  }, [data.length, dispatch]);


  return (
    <>
    <Divider orientation="left">New Releases</Divider>
    <Row gutter={12} style={{ display: 'flex', justifyContent: 'center' }}>
      {data.map((e: INewRelease) => {
        return (
        <Col className="gutter-row" span={5}>
          <Card
            hoverable
            loading={loading}
            cover={<img style={{ height: '25vmin' }} alt="example" src={e.imageUrl} />}
          >
            <Meta title={e.name} description={['Save to library', <PlusCircleOutlined style={{ marginLeft: '2vmin' }} />,]} />
          </Card>
        </Col>
        )
      })}
    </Row>
    </>
  )
};

export default NewReleases;
