import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Typography } from "antd";
import useWindowDimensions  from '../../../hooks/windows';
import Search from './search';
import spaceWidth from './spaceWidth';

const { Text, Link } = Typography;

function HomePageHeader()  {
  const { isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall } = useWindowDimensions();

  return(
    <Space size={spaceWidth(isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall)}>
          <Text type="warning">
            {<UserOutlined /> }
          </Text>
          <Text type="warning">
            Test
          </Text> 
          <Search />
          <Link type="warning">
            Mylibrary
          </Link>
          <Link type="warning">
            <LogoutOutlined />
          </Link>
        </Space>
  )
}

export default HomePageHeader;
