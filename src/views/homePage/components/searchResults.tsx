import { PlusCircleOutlined } from "@ant-design/icons";
import { Avatar, Divider, List, Skeleton } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addSong } from "../../../config/firebase";
import { ISearchResult } from "../../../interfaces/SearchResultType.interface";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import convertMsToMinutesSeconds from "../../../utilities/helper";

function SearchResults () {
  const [loading] = useState<boolean>();

  const { data } = useSelector((state: IStoreType) => state.searchResult);
  const {
    user: {
      id
    },
  } = useSelector((state: IStoreType) => state.user);


  const onClick = (e: ISearchResult) => {
    addSong(id, e.imageUrl, e.name, e.songUri);
  }


  return(
    <div style={{ margin: '7vmin' }}>
    <List
      bordered
      loading={loading}
      itemLayout="horizontal"
      size="small"
      dataSource={data}
      renderItem={(item: ISearchResult) => (
        <>
          <List.Item>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.imageUrl} />}
                title={
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ width: '20vmin' }}>
                  {item.name}
                  </div>
                  <div style={{ width: '20vmin' }}>{item.album}</div>
                  <div>{convertMsToMinutesSeconds(Number(item.time))}</div>
                  <PlusCircleOutlined style={{ marginTop: '0.7vmin' }} onClick={() => onClick(item)}  />
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
