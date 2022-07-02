import { MinusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useState } from "react";

const { Meta } = Card;

const data = [1,2,3,4,5,6,7]

function Content() {
  const [loading] = useState<boolean>();

  return (
    <div style={{ margin: '5vmin' }}>
    <Row gutter={[12,18]}>
      {data.map(e => {
        return (
        <Col className="gutter-row" span={6}>
        <Card
          hoverable
          loading={loading}
          cover={<img style={{ height: '25vmin' }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
        <Meta title="Europe" description={['Remove', <MinusCircleOutlined style={{ marginLeft: '2vmin' }} />,]} />
        </Card>
      </Col>
        )
      })}
    </Row>
    </div>
  )
};

export default Content;
