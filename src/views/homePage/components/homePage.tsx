import { Layout, Divider } from 'antd';
import HomePageHeader from './homePageHeader';
import NewReleases from './newReleases';
import SearchResults from './searchResults';

const { Header, Content } = Layout;

function HomePage() {
  return (
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
  );
}

export default HomePage;
