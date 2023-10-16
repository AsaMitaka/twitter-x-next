import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/layout';
import LoginModal from '@/components/modal/loginModal';
import SignupModal from '@/components/modal/signupModal';
import '@/styles/globals.css';
import EditModal from '@/components/modal/editModal';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <SignupModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
