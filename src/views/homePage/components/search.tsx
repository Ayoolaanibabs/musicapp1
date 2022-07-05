import { Input } from "antd";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import apiClient from "../../../config/spotify";
import { clearSearchResult, setSearchResult } from "../../../store/searchResult.slice";

function Search() {
  const dispatch = useDispatch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(clearSearchResult());
    search(e.target.value);
  }
  const search = async (data: string) => {
    await apiClient.get(`search?q=${data}&type=track`).then(response => {
      response.data.tracks.items.forEach((element: any) => {
        dispatch(setSearchResult({
          name: element.name,
          imageUrl: element.album.images[1].url,
          album: element.album.name,
          time: element.duration_ms,
          trackUri: element.uri,
        }))
      });
    })
  }
  return (
    <div>
      <Input placeholder="Search" style={{ width: '40vmin' }} onChange={onChange} />
    </div>
  )
}

export default Search;
