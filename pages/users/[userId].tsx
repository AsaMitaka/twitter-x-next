import Header from '@/components/header';
import PostFeed from '@/components/postfeed';
import UserBio from '@/components/user/userbio';
import UserHero from '@/components/user/userhero';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={`${fetchUser.username}`} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
