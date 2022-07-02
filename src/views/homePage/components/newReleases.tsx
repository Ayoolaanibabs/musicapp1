import { PlusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Divider, Row } from "antd";
import { useState } from "react";

const { Meta } = Card;

const data = [1,2,3,4]

function NewReleases() {
  const [loading] = useState<boolean>();

  return (
    <>
    <Divider orientation="left">New Releases</Divider>
    <Row gutter={12} style={{ display: 'flex', justifyContent: 'center' }}>
      {data.map(e => {
        return (
        <Col className="gutter-row" span={5}>
        <Card
          hoverable
          loading={loading}
          cover={<img height={150} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
        <Meta title="Europe" description={['Save to library', <PlusCircleOutlined style={{ marginLeft: '2vmin' }} />,]} />
        </Card>
      </Col>
        )
      })}
    </Row>
    </>
  )
};

export default NewReleases;
