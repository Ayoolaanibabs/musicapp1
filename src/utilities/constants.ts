import { ListItemLayout, ListSize } from "antd/lib/list";
import { TooltipPlacement } from "antd/lib/tooltip";
import React from "react";
import { INotificationType } from "../interfaces/NotificationType.interface";

export const PATH_NAMES = {
  LOGIN: '/',
  HOME: '/home',
  LIBRARY: '/library',
  WILD_ROUTE: '/*',
};

export const DATABASE_TABLE_NAME: string = 'shows';

export const CHILD_TYPE = {
  TRACK_URI: 'trackUri',
  SPOTIFY_ID: 'spotifyId'
};

export const NOTIFICATION_TYPE: INotificationType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info',
  ERROR: 'error',
};

export const MESSAGES = {
  ALREADY_IN_LIBRARY: 'already in Library',
  SONG_ADDED_SUCCESS: 'added to Library',
  ERROR: 'An Error Occured',
  SONG_REMOVED_SUCCESS: 'removed from Library',
  SIGN_OUT: 'you are about to sign out of your account',
  HI: 'Hi',
  PLAYLIST_EXPORT_SUCCESS: 'Playlist Successfully Exported',
  NO_SONGS: 'No Songs have been added to libarary'
};

export const TEXTS = {
  YES: 'Yes',
  NO: 'No',
  SEARCH: 'Search',
  DELETE: 'Delete',
  FROM_LIBRARY: 'from Library',
  PLAYLIST_NAME: 'Music App Playlist',
  PLAYLIST_DESCRIPTION: 'Playlist from music app',
};

export const BOTTOM_LEFT_PLACEMENT: TooltipPlacement = 'bottomLeft';

export const SPOTIFY_SCOPES = {
  PLAYLIST_MODIFY_PRIVATE: 'playlist-modify-private',
  PLAYLIST_MODIFY_PUBLIC: 'playlist-modify-public',
};

export const SPOTIFY_BASE_URL: string = 'https://api.spotify.com/v1/';

export const SPOTIFY_IMAGE_URL: string = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png';

export const MUSIC_APP_TOKEN: string = 'MUSIC_APP_TOKEN';

export const MUSIC_APP_TOKEN_EXPIRY_TIME: string = 'MUSIC_APP_TOKEN_EXPIRY_TIME';

export const SPOTIFY_URLS = {
  NEW_RELEASES: 'browse/new-releases?limit=4',
  SEARCH: 'search?q=',
  SEARCH_TYPE: '&type=track',
  CREATE_PLAYLIST_USER: 'users/',
  CREATE_PLAYLIST_PLAYLISTS: '/playlists',
  ADD_TO_PLAYLIST_PLAYLISTS: 'playlists/',
  ADD_TO_PLATLIST_TRACK: '/tracks?uris='
};

export const IMAGE_ALT_TEXTS = {
  USER: 'user',
  SPOTIFY_LOGO: 'logo-spotify',
};

export const ANTD_META_DESCRIPTION_SAVE_TO_LIBRARY: React.ReactNode = 'Save to Library';

export const HORIZONTAL_LIST_ITEM_LAYOUT: ListItemLayout = 'horizontal';

export const LIST_SIZE_SMALL: ListSize = 'small';

export const CLASS_NAMES = {
  CONTAINER: 'container',
  AVATAR: 'avatar',
  NEW_RELEASE_ROW: 'new-release-row',
  CARD_IMAGE: 'card-image',
  ICON_MARGIN_LEFT: 'icon-margin-left',
  SEARCH: 'search',
  LIST_ITEM_TITLE: 'list-item-title',
  LIST_ITEM_NAME: 'list-item-name',
  ICON_MARGIN_TOP: 'icon-margin-top',
  LOGO: 'logo',
  LOGIN_BTN: 'login-btn',
  LOGIN_PAGE: 'login-page',
};
