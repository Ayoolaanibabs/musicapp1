import { LogoutOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { 
  CLASS_NAMES,
  MESSAGES,
  MUSIC_APP_TOKEN,
  MUSIC_APP_TOKEN_EXPIRY_TIME,
  PATH_NAMES,
  TEXTS,
} from '../../../utilities/constants';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import Search from './search';
import './index.css';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

function HomePageHeader() {
  const navigate = useNavigate();

  const {
    user: {
      name, imageUrl,
    },
  } = useSelector((state: IStoreType) => state.user);

  const logout = () => {
    window.localStorage.removeItem(MUSIC_APP_TOKEN);
    window.localStorage.removeItem(MUSIC_APP_TOKEN_EXPIRY_TIME);
    window.location.href = PATH_NAMES.LOGIN;
  };

  return (
    <div className={CLASS_NAMES.HOME_HEADER}>
      <Text type="warning">
        <img src={imageUrl} className={CLASS_NAMES.AVATAR} alt="user" />
      </Text>
      <div className={CLASS_NAMES.NAME}>
        {name.split(' ')[0]}
      </div>
      <Search />
      <Text>
        <Button shape="round" onClick={()=>navigate(PATH_NAMES.LIBRARY)}>
          <div data-testid="library">
            My library
          </div>
        </Button>
      </Text>
      <Text>
        <Popconfirm
          title={`${MESSAGES.HI} ${name.split(' ')[0]}, ${MESSAGES.SIGN_OUT}`}
          onConfirm={logout}
          okText={TEXTS.YES}
          cancelText={TEXTS.NO}
          placement="bottomLeft"
        >
          <LogoutOutlined className={CLASS_NAMES.LOGOUT} />
        </Popconfirm>
      </Text>
    </div>
  );
}

export default HomePageHeader;
