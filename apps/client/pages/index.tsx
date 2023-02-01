import Layout from '../components/Base/Layout';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import useWindowSize from '../hooks/useWindowSize';
import { unstable_getServerSession } from 'next-auth';
import { MeQuery } from '../lib/relay/user/MeQuery';
import { MeQuery$data } from '../__generated__/MeQuery.graphql';
import { useLazyLoadQuery } from 'react-relay';

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, {});

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const IndexPage = () => {
  const size = useWindowSize();

  let Days = [
    {
      day: 'Mon',
      date: '26',
      trained: true,
    },
    {
      day: 'Tue',
      date: '27',
      trained: false,
    },
    {
      day: 'Wed',
      date: '28',
      trained: true,
    },
    {
      day: 'Thu',
      date: '29',
      trained: false,
    },
    {
      day: 'Mon',
      date: '26',
      trained: true,
    },
    {
      day: 'Tue',
      date: '27',
      trained: false,
    },
    {
      day: 'Wed',
      date: '28',
      trained: true,
    },
  ];

  let Workouts = [
    {
      name: 'Treino A',
      description: 'Treino de peito e costas',
      trained: true,
    },
  ];

  if (size.width < 768) Days = Days.slice(-4);

  const { me } = useLazyLoadQuery(MeQuery, {
    token: 'token',
  }) as MeQuery$data;


  return (
    <Layout>
      <div className="flex flex-col py-12 space-y-8">
        <div className="flex flex-row justify-between">
          {Days.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center space-y-1 text-neutral-300 font-sans font-bold text-xl px-3 py-2 ${
                index === Days.length - 1 &&
                'border-2 rounded border-neutral-700'
              }`}
            >
              <a>{day.day}</a>
              <a>{day.date}</a>
              {day.trained && <CheckIcon className="h-6 w-6 fill-green-300" />}
            </div>
          ))}
        </div>
        <div className="flex flex-row border border-neutral-700 rounded-md">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between border-b border-b-neutral-800 items-center">
              <div className="flex flex-row items-center px-2 cursor-pointer py-2">
                <CheckCircleIcon className="h-5 w-5 text-green-300" />
                <div className="flex flex-col px-2">
                  <a className="text-neutral-300 text-base font-bold">
                    Treino A
                  </a>
                  <a className="font-sans text-sm font-medium text-neutral-400">
                    Lombar | Biceps | Dorsal
                  </a>
                </div>
              </div>
              <ChevronRightIcon className="h-8 w-8 fill-neutral-300 cursor-pointer" />
            </div>
            <div className="flex flex-row justify-between border-b border-b-neutral-800 items-center">
              <div className="flex flex-row items-center px-2 cursor-pointer py-2">
                <CheckCircleIcon className="h-5 w-5 text-green-300" />
                <div className="flex flex-col px-2">
                  <a className="text-neutral-300 text-base font-bold">
                    Treino B
                  </a>
                  <a className="font-sans text-sm font-medium text-neutral-400">
                    Pernas | Panturrilha
                  </a>
                </div>
              </div>
              <ChevronRightIcon className="h-8 w-8 fill-neutral-300 cursor-pointer" />
            </div>
          </div>
          <div className="border-l border-l-neutral-700 w-full"></div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
