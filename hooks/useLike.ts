import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import useCurrentUser from './useCurrent';
import useLoginModal from './useLoginModal';
import usePost from './usePost';
import usePosts from './usePosts';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchPost, mutate: mutateFetchPost } = usePost(postId);
  const { mutate: mutateFetchPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLike = useMemo(() => {
    const like = fetchPost?.likedIds || [];

    return like.includes(currentUser?.id);
  }, [currentUser?.id, fetchPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLike) {
        request = () => axios.delete('/api/like', { data: { postId } });
      } else {
        request = () => axios.post('/api/like', { postId });
      }

      await request();
      mutateFetchPost();
      mutateFetchPosts();

      toast.success('Success');
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    }
  }, [hasLike, postId, currentUser, mutateFetchPost, mutateFetchPosts, loginModal]);

  return { hasLike, toggleLike };
};

export default useLike;
