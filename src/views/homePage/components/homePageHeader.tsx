import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  BOTTOM_LEFT_PLACEMENT,
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

const { Text } = Typography;

function HomePageHeader() {
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
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text type="warning">
        <Avatar src={imageUrl} className={CLASS_NAMES.AVATAR} alt="user" />
      </Text>
      <div style={{ color: 'yellow' }}>
        {name.split(' ')[0]}
      </div>
      <Search />
      <Link to={PATH_NAMES.LIBRARY}>
        My library
      </Link>
      <Text>
        <Popconfirm
          title={`${MESSAGES.HI} ${name.split(' ')[0]}, ${MESSAGES.SIGN_OUT}`}
          onConfirm={logout}
          okText={TEXTS.YES}
          cancelText={TEXTS.NO}
          placement={BOTTOM_LEFT_PLACEMENT}
        >
          <LogoutOutlined style={{ color: '#ffffff' }} />
        </Popconfirm>
      </Text>
    </div>
  );
}

export default HomePageHeader;
