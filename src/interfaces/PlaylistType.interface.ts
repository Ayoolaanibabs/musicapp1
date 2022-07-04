export interface IPlaylist{
  name: string;
  imageUrl: string;
  songUri: string;
  spotifyId: string;
};

export interface IPlaylistType{
  data: IPlaylist[];
};
