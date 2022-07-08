import axios from "axios";
import { SPOTIFY_BASE_URL, SPOTIFY_SCOPES } from "../utilities/constants";

const authEndpoint = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT;
const clientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectURI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  SPOTIFY_SCOPES.PLAYLIST_MODIFY_PRIVATE,
  SPOTIFY_SCOPES.PLAYLIST_MODIFY_PUBLIC,
];

export const loginEndpoint: string = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: SPOTIFY_BASE_URL,
});

export const setClientToken = (token: string) => {
  apiClient.interceptors.request.use(async (config: any) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient;
