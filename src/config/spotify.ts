import axios from 'axios';

const authEndpoint = "";
const clientID = "";
const redirectURI = "http://localhost:3000/home";
const scopes = ["playlist-modify-public", "user-read-private"];

export const loginEndpoint: string =`${authEndpoint}client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token: string) => {
  apiClient.interceptors.request.use(async function (config: any) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default apiClient;
