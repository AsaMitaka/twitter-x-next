import { useCallback, useState } from 'react';
import Modal from './modal';
import Input from './input';
import useSignupModal from '@/hooks/useSignupModal';
import useLoginModal from '@/hooks/useLoginModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

const SignupModal = () => {
  const useSignup = useSignupModal();
  const useLogin = useLoginModal();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleTarget = useCallback(() => {
    if (isLoading) return;

    useLogin.onOpen();
    useSignup.onClose();
  }, [useLogin, useSignup, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      await axios.post('/api/register', { username, email, password });
      setLoading(true);

      toast.success('Account created');
      signIn('credentials', { email, password });

      useSignup.onClose();
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [useSignup, username, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Input
        value={username}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
      />
      <Input
        value={email}
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        value={password}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-1">
      <p className="text-white text-md">
        You have an account?
        <span className="ml-3 cursor-pointer hover:underline" onClick={handleTarget}>
          Login
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      actionLabel="Sign Up"
      body={bodyContent}
      disabled={isLoading}
      footer={footerContent}
      isOpen={useSignup.isOpen}
      onClose={useSignup.onClose}
      onSubmit={onSubmit}
      title="Sign Up"
    />
  );
};

export default SignupModal;
