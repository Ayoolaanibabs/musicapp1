import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../../config/spotify";
import {
  clearSearchResult,
  setSearchResult,
} from "../../../store/searchResult.slice";
import {
  CLASS_NAMES,
  NOTIFICATION_TYPE,
  SPOTIFY_IMAGE_URL_INDEX,
  SPOTIFY_URLS,
  TEXTS,
} from "../../../utilities/constants";
import { sendNotification } from "../../../utilities/helper";
import "./index.css";

function Search(): JSX.Element {
  const dispatch = useDispatch();
  const search = async (data: string): Promise<void> => {
    await apiClient
      .get(`${SPOTIFY_URLS.SEARCH}${data}${SPOTIFY_URLS.SEARCH_TYPE}`)
      .then((response) => {
        response.data.tracks.items.forEach((element: any) => {
          dispatch(
            setSearchResult({
              name: element.name,
              imageUrl: element.album.images[SPOTIFY_IMAGE_URL_INDEX].url,
              album: element.album.name,
              time: element.duration_ms,
              trackUri: element.uri,
            })
          );
        });
      })
      .catch((error) => {
        sendNotification(NOTIFICATION_TYPE.ERROR, `${error.response.data}`);
      });
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(clearSearchResult());
    search(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder={TEXTS.SEARCH}
        prefix={<SearchOutlined />}
        className={CLASS_NAMES.SEARCH}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
