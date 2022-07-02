import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Space, Typography } from "antd";
import useWindowDimensions  from '../../../hooks/windows';
import spaceWidth from '../../homePage/components/spaceWidth';

const { Text, Link } = Typography;

function LibraryHeader()  {
  const { isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall } = useWindowDimensions();

  return(
    <Space size={spaceWidth(isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall)}>
          <Text type="warning">
            {<UserOutlined /> }
          </Text>
          <Link type="warning">
            ExportToMySpotify
          </Link> 
          <Text type="warning">
            Mylibrary
          </Text>
          <Link type="warning">
            Search
          </Link>
          <Link type="warning">
            <LogoutOutlined />
          </Link>
        </Space>
  )
}

export default LibraryHeader;
