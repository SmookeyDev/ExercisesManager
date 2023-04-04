import {
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { usePaginationFragment, useLazyLoadQuery } from 'react-relay';
import {
  AllTrainingsPaginationFragment,
  AllTrainingsPaginationQuery,
} from '../../../../relay/trainings/AllTrainingsPagination';
import { DeleteTrainingMutation } from '../../../../relay/trainings/DeleteTrainingMutation';
import { RelayEnvironment } from '../../../../relay/RelayEnvironment';
import { commitMutation } from '../../../../relay/commitMutation';
import InfiniteScroll from 'react-infinite-scroller';
import { useRef, useImperativeHandle } from 'react';
import { Disclosure } from '@headlessui/react';
import debounce from '../../../../utils/debounce';
import dynamic from 'next/dynamic';
import Toast from '../../../../utils/toastify';
import TextWithLabel from '../../../TextWithLabel';
const YoutubePlayer = dynamic(() => import('../../../YoutubePlayer'), {
  ssr: false,
});

type Content = {
  search: string;
  contentRef: any;
  handleOpen: () => void;
  setData: (data: any) => void;
};
  
const TrainingsTabContent: React.FC<Content> = ({
  search,
  contentRef,
  setData,
  handleOpen,
}) => {
  const timeoutRef = useRef(null);
  const query = useLazyLoadQuery(AllTrainingsPaginationQuery, {});
  const { data, loadNext, isLoadingNext, refetch } = usePaginationFragment<
    any,
    any
  >(AllTrainingsPaginationFragment, query);

  const loadMore = () => {
    if (isLoadingNext) return;
    loadNext(10);
  };

  debounce(
    timeoutRef,
    () => {
      refetch({ search }, { fetchPolicy: 'store-or-network' });
    },
    500,
  );

  useImperativeHandle(contentRef, () => ({
    refetch: () => {
      refetch({ search }, { fetchPolicy: 'store-and-network' });
    },
  }));

  const handleEdit = (data: any) => {
    setData(data);
    handleOpen();
  };

  const handleDelete = (_id: string) => {
    commitMutation(RelayEnvironment, {
      mutation: DeleteTrainingMutation,
      variables: {
        _id,
      },
      onCompleted: (data: any) => {
        if (!data?.DeleteTraining?.deleted) {
          Toast.error('Erro ao deletar treino!');
          return;
        }

        refetch({ search }, { fetchPolicy: 'store-and-network' });
        Toast.success('Treino deletado com sucesso!');
      },
      onError: () => {
        Toast.error('Erro ao deletar treino!');
      },
    });
  };

  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={data?.['allTrainings'].pageInfo.hasNextPage}
        useWindow
      >
        <div className="flex flex-col space-y-1">
          {data?.['allTrainings'].edges?.map((training: any, index: number) => {
            return (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="border border-neutral-700 p-4 rounded-md space-y-2">
                    <div
                      className={`flex flex-row justify-between items-center ${
                        open ? 'pb-2 border-b border-neutral-700' : ''
                      }`}
                    >
                      <div className="flex flex-row items-center px-2 space-x-2">
                        <div className="flex flex-col">
                          <div className="flex text-neutral-300 text-base font-bold space-x-2">
                            <a>{training.node.name} </a>
                            <span className="flex flew-row space-x-2 items-center">
                              <PencilIcon
                                className="h-5 w-4  fill-neutral-300 cursor-pointer"
                                onClick={() => handleEdit(training.node)}
                              />
                              <TrashIcon
                                className="h-4 w-4 fill-neutral-300 cursor-pointer"
                                onClick={() => handleDelete(training.node._id)}
                              />
                            </span>
                          </div>
                          <a className="font-sans text-sm font-medium text-neutral-400">
                            {training.node.exercises
                              .map(
                                (exercise: any) =>
                                  exercise.details.muscle_group,
                              )
                              .filter(
                                (value: any, index: number, self: any) =>
                                  self.indexOf(value) === index,
                              )
                              .join(' | ')}
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
                      <TextWithLabel label="Descrição" text={training.node.description}/>
                      <div className="flex flex-col space-y-2">
                        <span className="text-neutral-300 text-sm font-bold">
                          Exercícios
                        </span>
                        {training.node.exercises.map(
                          (exercise: any, index: number) => (
                            <Disclosure key={index}>
                              {({ open }) => (
                                <div className="border border-neutral-700 p-2 rounded-md space-y-2">
                                <div
                                  className={`flex flex-row justify-between items-center ${
                                    open ? 'pb-2 border-b border-neutral-700' : ''
                                  }`}
                                >
                                  <div className="flex flex-row items-center px-2 space-x-2">
                                    <div className="flex flex-col">
                                      <div className="flex text-neutral-300 text-base font-bold space-x-2">
                                        <a>{exercise.details.name} </a>
                                      </div>
                                      <a className="font-sans text-sm font-medium text-neutral-400">
                                        {exercise.details.muscle_group}
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
                                <Disclosure.Panel className="flex flex-col px-2">
                                  <TextWithLabel label="Descrição" text={exercise.details.description}/>
                                  <TextWithLabel label="Repetições" text={exercise.reps}/>
                                  <TextWithLabel label="Séries" text={exercise.sets}/>
                                  <TextWithLabel label="Peso" text={exercise.weight + "kg"}/>
                                  <TextWithLabel label="Descanso" text={exercise.rest + "s"}/>
                                </Disclosure.Panel>
                              </div>
                              )}
                            </Disclosure>
                          ),
                        )}
                      </div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default TrainingsTabContent;
