import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Modal from './modal';
import UploadImage from '../uploadImage';
import Input from '../ui/input';

import useEditModal from '@/hooks/useEditModal';
import useCurrentUser from '@/hooks/useCurrent';
import useUser from '@/hooks/useUser';

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchUser } = useUser(currentUser?.id);
  const editModal = useEditModal();

  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
    setBio(currentUser?.bio);
  }, [currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch('/api/edit', {
        bio,
        coverImage,
        profileImage,
      });
      mutateFetchUser();

      toast.success('Updated');

      editModal.onClose();
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [bio, coverImage, editModal, mutateFetchUser, profileImage]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        type="text"
        value={bio || ''}
      />
      <UploadImage
        disabled={isLoading}
        label="Upload profile image"
        onChange={(image) => setProfileImage(image)}
        value={profileImage}
      />
      <UploadImage
        disabled={isLoading}
        label="Upload cover image"
        onChange={(image) => setCoverImage(image)}
        value={coverImage}
      />
    </div>
  );

  return (
    <Modal
      actionLabel="Save"
      body={bodyContent}
      disabled={isLoading}
      isOpen={editModal.isOpen}
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      title="Edit Profile"
    />
  );
};

export default EditModal;
