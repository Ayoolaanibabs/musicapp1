import { LogoutOutlined } from '@ant-design/icons';
import { Avatar, Space, Typography } from "antd";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { pathNames } from '../../../constants';
import useWindowDimensions  from '../../../hooks/windows';
import { IStoreType } from '../../../interfaces/StoreType.interface';
import Search from './search';
import spaceWidth from './spaceWidth';

const { Text } = Typography;

function HomePageHeader()  {
  const { isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall } = useWindowDimensions();
  const {
    user: {
      name, imageUrl
    },
  } = useSelector((state: IStoreType) => state.user);


  return(
    <Space size={spaceWidth(isLarge, isMedium, isExtraLarge, isExtraSmall, isSmall)}>
          <Text type="warning">
            <Avatar src={imageUrl} alt="user" />
          </Text>
          <Text type="warning">
            {name}
          </Text> 
          <Search />
          <Link to={pathNames.library}>
            Mylibrary
          </Link>
          {/* <Link type="warning"> */}
          <Text>
            <LogoutOutlined />
          </Text>
          {/* </Link> */}
        </Space>
  )
}

export default HomePageHeader;
