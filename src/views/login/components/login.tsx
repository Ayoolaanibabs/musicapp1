import '../../../App.css';
import './styles.css';
import { loginEndpoint } from '../../../config/spotify';
import { CLASS_NAMES, IMAGE_ALT_TEXTS, SPOTIFY_IMAGE_URL } from '../../../utilities/constants';

function Login(): JSX.Element {
  return (
    <div className={CLASS_NAMES.LOGIN_PAGE}>
      <img
        src={SPOTIFY_IMAGE_URL}
        alt={IMAGE_ALT_TEXTS.SPOTIFY_LOGO}
        className={CLASS_NAMES.LOGO}
      />
      <a href={loginEndpoint}>
        <div className={CLASS_NAMES.LOGIN_BTN} data-testid="login">LOG IN</div>
      </a>
    </div>
  );
}

export default Login;
