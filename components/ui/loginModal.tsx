import { useCallback, useState } from 'react';
import Modal from './modal';
import Input from './input';
import useSignupModal from '@/hooks/useSignupModal';
import useLoginModal from '@/hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

const LoginModal = () => {
  const useLogin = useLoginModal();
  const useSignup = useSignupModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleTarget = useCallback(() => {
    if (isLoading) return;

    useLogin.onClose();
    useSignup.onOpen();
  }, [useLogin, useSignup, isLoading]);

  const onSubmit = useCallback(() => {
    try {
      setLoading(true);

      toast.success('Logged in');
      signIn('credentials', {
        email,
        password,
      });
      useLogin.onClose();
    } catch (error) {
      console.warn(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [useLogin, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="mt-1">
      <p className="text-white text-md">
        You dont have an account?
        <span className="ml-3 cursor-pointer hover:underline" onClick={handleTarget}>
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      actionLabel="Login"
      body={bodyContent}
      disabled={isLoading}
      footer={footerContent}
      isOpen={useLogin.isOpen}
      onClose={useLogin.onClose}
      onSubmit={onSubmit}
      title="Login"
    />
  );
};

export default LoginModal;
