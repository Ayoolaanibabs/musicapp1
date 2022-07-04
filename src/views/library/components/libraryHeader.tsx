import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Typography } from "antd";
import { Link } from 'react-router-dom';
import useWindowDimensions  from '../../../hooks/windows';
import { pathNames } from '../../../utilities/constants';
import spaceWidth from '../../homePage/components/spaceWidth';

const { Text } = Typography;

function LibraryHeader()  {
  const { isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall } = useWindowDimensions();

  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = pathNames.login;
  }

  return(
    <Space size={spaceWidth(isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall)}>
          <Text type="warning">
            {<UserOutlined /> }
          </Text>
          {/* <Link type="warning"> */}
          <Text type="warning">
            ExportToMySpotify
          </Text>
          {/* </Link>  */}
          <Text type="warning">
            Mylibrary
          </Text>
          <Link type="warning" to={pathNames.home}>
            Search
          </Link>
          {/* <Link type="warning"> */}
            <LogoutOutlined onClick={logout} style={{ color: '#ffffff' }} />
          {/* </Link> */}
        </Space>
  )
}

export default LibraryHeader;
