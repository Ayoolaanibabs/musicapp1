import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Typography } from "antd";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import { pathNames } from '../../../utilities/constants';

const { Text } = Typography;

function LibraryHeader()  {

  const {
    user: {
      name, imageUrl
    },
  } = useSelector((state: IStoreType) => state.user);
  
  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = pathNames.login;
  }

  return(
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <Text type="warning">
            <Avatar src={imageUrl} alt="user" />
          </Text>
          {/* <Link type="warning"> */}
          <Text type="warning">
            Export To My Spotify
          </Text>
          {/* </Link>  */}
          <Text type="warning">
            My library
          </Text>
          <Link to={pathNames.home}>
            Search
          </Link>
          <Text>
          <Popconfirm
            title={`Hi ${name.split(' ')[0]}, you are about to sign out of your account`}
            onConfirm={logout}
            okText="Yes"
            cancelText="No"
            placement='bottomLeft'
          >
            <LogoutOutlined style={{ color: '#ffffff' }} />
          </Popconfirm>
            </Text>

        </div>
  )
}

export default LibraryHeader;
