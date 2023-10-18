import CommentFeed from '@/components/commentfeed';
import Form from '@/components/form';
import Header from '@/components/header';
import PostItem from '@/components/postitem';
import usePost from '@/hooks/usePost';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const Post = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchPost, isLoading } = usePost(postId as string);
  console.log(fetchPost, fetchPost?.id, fetchPost?.user?.id);

  if (isLoading || !fetchPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={70} />
      </div>
    );
  }

  return (
    <>
      <Header label={`Tweet`} showBackArrow />
      <PostItem data={fetchPost} userId={fetchPost?.user?.id} />
      <Form postId={postId as string} isComment placeholder="tweet your reply" />
      <CommentFeed comments={fetchPost?.comments} />
    </>
  );
};

export default Post;
