export interface INewRelease {
  name: string;
  imageUrl: string;
  trackUri: string;
}

export interface INewReleaseType {
  data: INewRelease[];
}
