import { INewReleaseType } from './NewReleaseType.interface';
import { IPlaylistType } from './PlaylistType.interface';
import { ISearchResultType } from './SearchResultType.interface';
import { IUserType } from './UserType.interface';

export interface IStoreType {
 user: IUserType
 newRelease: INewReleaseType
 searchResult: ISearchResultType
 playlist: IPlaylistType
}
