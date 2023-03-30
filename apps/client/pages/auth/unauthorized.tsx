import { getServerSession } from 'next-auth';
import Link from 'next/link';

export const getServerSideProps = async context => {
  const session = await getServerSession(context.req, context.res, {});

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Unauthorized = () => {
  return (
    <>
      <div className="bg-neutral-900 min-w-screen flex flex-col">
        <div className="flex flex-col justify-center items-center min-h-screen mx-auto">
          <div className="bg-neutral-800 shadow w-1/2 rounded-lg divide-y divide-neutral-700 ">
            <div className="flex flex-col items-center justify-center p-6">
              <p className="text-3xl md:text-4xl lg:text-5xl text-neutral-200">
                Error {`:(`}
              </p>
              <p className="md:text-lg lg:text-xl text-neutral-300 mt-8">
                Sorry, we were unable to log you in. Please check your account
                and try again or contact our support team for assistance.
              </p>
              <Link
                href="/login"
                className="flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-600 text-neutral-200 px-4 py-2 mt-6 rounded-md transition duration-150 h-12"
              >
                <span>Go back Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
