export interface IPlaylist {
  name: string;
  imageUrl: string;
  trackUri: string;
  spotifyId: string;
}

export interface IPlaylistType {
  data: IPlaylist[];
}

export interface ICreatePlaylistData {
  name: string;
  description: string;
  public: boolean;
}
