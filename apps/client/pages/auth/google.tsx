import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Signin() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    status === 'unauthenticated' ? signIn('google') : router.push('/');
  }, [status]);

  return <></>;
}
