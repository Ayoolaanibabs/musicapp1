import { MinusCircleOutlined } from "@ant-design/icons";
import { Card, Col, Popconfirm, Row } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSong } from "../../../config/firebase";
import useWindowDimensions from "../../../hooks/windows";
import { IPlaylist, IPlaylistType } from "../../../interfaces/PlaylistType.interface";
import { IStoreType } from "../../../interfaces/StoreType.interface";
import { deleteSongFromPlaylist } from "../../../store/playlist.slice";
import {
  CLASS_NAMES,
  IMAGE_ALT_TEXTS,
  LARGE_SIZE_CONTENT_COLUMN_SPAN,
  MY_LIBRARY_CONTENT_ROW_COLUMN_GUTTER,
  SMALL_SIZE_CONTENT_COLUMN_SPAN,
  TEXTS,
} from "../../../utilities/constants";
import "./index.css";

const { Meta } = Card;

function Content(): JSX.Element {
  const dispatch = useDispatch();
  const [loading] = useState<boolean>();

  const { data }: IPlaylistType = useSelector((state: IStoreType) => state.playlist);

  const confirm = (trackUri: string, name: string): void => {
    deleteSong(trackUri, name);
    dispatch(deleteSongFromPlaylist(trackUri));
  };

  const { isExtraSmall, isSmall, isMedium } = useWindowDimensions();

  const span = (): number => {
    if (isExtraSmall || isSmall || isMedium) {
      return SMALL_SIZE_CONTENT_COLUMN_SPAN;
    } else {
      return LARGE_SIZE_CONTENT_COLUMN_SPAN;
    }
  };

  return (
    <div className={CLASS_NAMES.CONTAINER}>
      <Row gutter={MY_LIBRARY_CONTENT_ROW_COLUMN_GUTTER}>
        {data.map((e: IPlaylist) => (
          <Col span={span()}>
            <Card
              hoverable
              loading={loading}
              cover={
                <img
                  className={CLASS_NAMES.CARD_IMAGE}
                  alt={IMAGE_ALT_TEXTS.USER}
                  src={e.imageUrl}
                />
              }
            >
              <Meta
                title={e.name}
                description={[
                  "Remove",
                  <Popconfirm
                    title={`${TEXTS.DELETE} ${e.name} ${TEXTS.FROM_LIBRARY}`}
                    onConfirm={() => confirm(e.trackUri, e.name)}
                    okText={TEXTS.YES}
                    cancelText={TEXTS.NO}
                  >
                    <MinusCircleOutlined
                      className={CLASS_NAMES.ICON_MARGIN_LEFT}
                    />
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
