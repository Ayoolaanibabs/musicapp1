import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pathNames } from '../../../utilities/constants';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import Search from './search';

const { Text } = Typography;

function HomePageHeader() {
  const {
    user: {
      name, imageUrl,
    },
  } = useSelector((state: IStoreType) => state.user);

  const logout = () => {
    window.localStorage.removeItem('token');
    window.location.href = pathNames.login;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text type="warning">
        <Avatar src={imageUrl} style={{ height: '24px', width: '24px' }} alt="user" />
      </Text>
      <div style={{ color: 'yellow' }}>
        {name.split(' ')[0]}
      </div>
      <Search />
      <Link to={pathNames.library}>
        My library
      </Link>
      <Text>
        <Popconfirm
          title={`Hi ${name.split(' ')[0]}, you are about to sign out of your account`}
          onConfirm={logout}
          okText="Yes"
          cancelText="No"
          placement="bottomLeft"
        >
          <LogoutOutlined style={{ color: '#ffffff' }} />
        </Popconfirm>
      </Text>
    </div>
  );
}

export default HomePageHeader;
