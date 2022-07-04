export interface ISearchResult{
  name: string;
  imageUrl: string;
  album: string;
  time: string;
  songUri: string;
};

export interface ISearchResultType{
  data: ISearchResult[];
};
