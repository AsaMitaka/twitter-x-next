import Form from '@/components/form';
import Header from '@/components/header';
import PostFeed from '@/components/postfeed';

const Home = () => {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening? " />
      <PostFeed />
    </>
  );
};

export default Home;
