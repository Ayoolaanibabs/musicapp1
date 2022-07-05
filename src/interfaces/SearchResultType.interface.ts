export interface ISearchResult{
  name: string;
  imageUrl: string;
  album: string;
  time: string;
  trackUri: string;
};

export interface ISearchResultType{
  data: ISearchResult[];
};
