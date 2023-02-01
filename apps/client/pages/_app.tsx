import React from 'react';
import { AppProps } from 'next/app';
import '../styles/tailwind.css';
import 'toastify-js/src/toastify.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from '../lib/relay/RelayEnvironment';

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </RelayEnvironmentProvider>
    </>
  );
};

export default MyApp;
