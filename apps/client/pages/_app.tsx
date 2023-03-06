import React, { Suspense } from 'react';
import { AppProps } from 'next/app';
import '../styles/tailwind.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RelayEnvironment } from '../relay/RelayEnvironment';
import axios from '../utils/axiosInstance';

type AppPropsWithContext = AppProps & {
  session: Session
  data: {
    accessToken: string;
  };
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithContext) => {
  const accessToken = pageProps?.data?.accessToken;
  if (accessToken) axios.defaults.headers.common['Authorization'] = `${accessToken}`;

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
