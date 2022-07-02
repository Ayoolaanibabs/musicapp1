import { Layout, Divider,  } from 'antd';
// import { useSelector } from 'react-redux';
import HomePageHeader from './homePageHeader';
import NewReleases from './newReleases';
// import { IStoreType } from '../../../interfaces/StoreType.interface';
import SearchResults from './searchResults';

const { Header, Content } = Layout;



function HomePage()  {
  // const {
  //   data: {
  //     artist
  //   },
  // } = useSelector((state: IStoreType) => state.playlist);

  return(
    <Layout>
      <Header>
        <HomePageHeader />
      </Header>
      <Content>
        <NewReleases />
        <Divider />
        <SearchResults />
      </Content>
    </Layout>
  )
}

export default HomePage;
