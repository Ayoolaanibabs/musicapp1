import { PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Divider, List, Skeleton } from "antd";
import { useState } from "react";

function SearchResults () {
  const [loading] = useState<boolean>();
  const list = [1,2,3,4]
  return(
    <div style={{ margin: '7vmin' }}>
    <List
      loading={loading}
      itemLayout="horizontal"
      // loadMore={loadMore}
      dataSource={list}
      renderItem={(item: number) => (
        <>
          <List.Item
            actions={[<PlusCircleOutlined />]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar src={"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}
                title={
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div>
                  Song Title
                  </div>
                  <div>Album Name</div>
                  <div>2:00</div>
                </div>
                }
              />
            </Skeleton>
          </List.Item>
          <Divider />
        </>
      )}
    />
    </div>
  )
} 

export default SearchResults;
