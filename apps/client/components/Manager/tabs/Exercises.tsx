import { PlusIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import { usePaginationFragment, useLazyLoadQuery } from 'react-relay';
import {
  AllExercisesPaginationFragment,
  AllExercisesPaginationQuery,
} from '../../../relay/exercises/AllExercisesPagination';
import InfiniteScroll from 'react-infinite-scroller';
import { Suspense, useRef } from 'react';
import { Disclosure } from '@headlessui/react';
import debounce from '../../../utils/debounce';
import dynamic from 'next/dynamic';
const YoutubePlayer = dynamic(() => import('../../YoutubePlayer'), {
  ssr: false,
});

interface Props {}

const ExercisesTab: React.FC<Props> = ({}) => {
  return (
    <Suspense>
      <ExercisesTabContent />
    </Suspense>
  );
};

const ExercisesTabContent: React.FC<Props> = ({}) => {
  const timeoutRef = useRef(null);
  const query = useLazyLoadQuery(AllExercisesPaginationQuery, {});

  const { data, loadNext, isLoadingNext, refetch } = usePaginationFragment<
    any,
    any
  >(AllExercisesPaginationFragment, query);

  const loadMore = () => {
    if (isLoadingNext) return;
    loadNext(10);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(
      timeoutRef,
      () => {
        refetch({
          search: e.target.value,
        });
      },
      500,
    );
  };

  return (
    <>
      <div className="flex flex-col py-4 space-y-4">
          <div className="mt-1 flex flex-row items-center space-x-2">
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-sm  w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
              placeholder="Buscar"
              onChange={onSearch}
            />
            <button className="inline-flex items-center p-1.5 border border-neutral-700 rounded-md shadow-sm text-white">
              <PlusIcon className="h-6 w-6 cursor-pointer text-neutral-300" />
            </button>
          </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={data?.['allExercises'].pageInfo.hasNextPage}
          useWindow
        >
          <div className="flex flex-col space-y-1">
            {data?.['allExercises'].edges?.map(
              (exercise: any, index: number) => {
                return (
                  <Disclosure>
                    {({ open }) => (
                      <div
                        key={index}
                        className="border border-neutral-700 p-4 rounded-md space-y-2"
                      >
                        <div
                          className={`flex flex-row justify-between items-center ${
                            open ? 'pb-2 border-b border-neutral-700' : ''
                          }`}
                        >
                          <div className="flex flex-row items-center px-2 cursor-pointer">
                            <div className="flex flex-col">
                              <a className="text-neutral-300 text-base font-bold">
                                {exercise.node.name}
                              </a>
                              <a className="font-sans text-sm font-medium text-neutral-400">
                                {exercise.node.muscle_group}
                              </a>
                            </div>
                          </div>
                          <Disclosure.Button>
                            <ChevronRightIcon
                              className={`h-8 w-8 fill-neutral-300 cursor-pointer ${
                                open ? 'rotate-90 transform' : ''
                              }`}
                            />
                          </Disclosure.Button>
                        </div>
                        <Disclosure.Panel className="px-2 space-y-4">
                          <span className="text-neutral-300 text-sm">
                            {exercise.node.description}
                          </span>
                          <YoutubePlayer videoId={exercise.node.video_url} />
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                );
              },
            )}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ExercisesTab;
