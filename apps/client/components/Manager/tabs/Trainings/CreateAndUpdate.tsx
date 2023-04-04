import {
  XMarkIcon,
  PlusIcon,
  ChevronUpDownIcon,
  CheckIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { RelayEnvironment } from '../../../../relay/RelayEnvironment';
import { commitMutation } from '../../../../relay/commitMutation';
import {
  AllExercisesPaginationFragment,
  AllExercisesPaginationQuery,
} from '../../../../relay/exercises/AllExercisesPagination';
import { Suspense, useEffect, useRef } from 'react';
import Toast from '../../../../utils/toastify';
import { Combobox } from '@headlessui/react';
import { useState } from 'react';
import { useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import debounce from '../../../../utils/debounce';
import extractNumberedKeys from '../../../../utils/extractNumberedKeys';
import { CreateOrUpdateTrainingMutation } from '../../../../relay/trainings/CreateOrUpdateTrainingMutation';

type ExerciseItem = {
  _id?: string;
  exercise_id?: string;
  weight?: number;
  reps?: number;
  sets?: number;
  rest?: number;
};

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const ExerciseItem: React.FC<{ data: any; index: number }> = ({
  data,
  index,
}) => {
  const [selectedExercise, setSelectedExercise] = useState<any>();
  const [exerciseField, setExerciseField] = useState('');
  const timeoutRef = useRef(null);
  const formRef = useRef(null);
  const comboRef = useRef(null);

  const query = useLazyLoadQuery(AllExercisesPaginationQuery, {});
  const { data: exercisesList } = usePaginationFragment<any, any>(
    AllExercisesPaginationFragment,
    query,
  );

  const exercises = exercisesList?.['allExercises']?.edges?.map(
    (edge: any) => edge.node,
  );
  const filteredExercise = exercises?.filter((exercise: any) => {
    return exercise.name.toLowerCase().includes(exerciseField.toLowerCase());
  });

  useEffect(() => {
    if (!data) return;

    setSelectedExercise(data);
    debounce(
      timeoutRef,
      () => {
        const form = formRef.current;
        const childNodes = form?.childNodes;
        const exercise_id = data['exercise_id'];
        if (!childNodes || !exercise_id) return;

        childNodes?.forEach((node: any) => {
          const keyName = node.name.replace(/\d/g, '');
          node.value = data[keyName];
        });
      },
      10,
    );
  }, [data, formRef]);

  return (
    <div className="flex flex-col space-y-2" ref={comboRef}>
      <Combobox
        as="div"
        value={selectedExercise}
        onChange={setSelectedExercise}
      >
        <div className="relative mt-1.5">
          <Combobox.Input
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 py-2 pl-3 pr-10 shadow-sm text-neutral-300 placeholder-neutral-500 sm:text-sm "
            onChange={event => setExerciseField(event.target.value)}
            displayValue={(exercise: any) =>
              exercise?.name || exercise?.details?.name
            }
            placeholder="Nome do exercício"
          />
          <a
            className="absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none cursor-pointer"
            onClick={() => comboRef.current.remove()}
          >
            <TrashIcon
              className="h-5 w-5 text-neutral-300"
              aria-hidden="true"
            />
          </a>
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-neutral-300"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredExercise.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-900 border border-neutral-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredExercise.map((exercise: any) => (
                <Combobox.Option
                  key={exercise._id}
                  value={exercise}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none py-2 pl-8 pr-4 border-neutral-700 border m-1.5 rounded-md',
                      active
                        ? 'bg-indigo-600 text-neutral-100'
                        : 'text-neutral-300',
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          'block truncate',
                          selected && 'font-semibold',
                        )}
                      >
                        {exercise.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            'absolute inset-y-0 left-0 flex items-center pl-1.5',
                            active ? 'text-white' : 'text-indigo-600',
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {selectedExercise && (
        <div className="flex flex-col space-y-2 pl-6" ref={formRef}>
          <input
            type="hidden"
            name={'exercise_id' + index}
            className="hidden"
            value={selectedExercise?.exercise_id || selectedExercise?._id}
          />
          <input
            type="number"
            name={'weight' + index}
            className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
            placeholder="Peso"
            min="0"
            required
          />
          <input
            type="number"
            name={'reps' + index}
            className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
            placeholder="Repetições"
            min="0"
            required
          />
          <input
            type="number"
            name={'sets' + index}
            className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
            placeholder="Séries"
            min="0"
            required
          />
          <input
            type="number"
            name={'rest' + index}
            className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
            placeholder="Tempo de descanso"
            min="0"
            required
          />
        </div>
      )}
    </div>
  );
};

const CreateAndUpdate: React.FC<{ data?: any; handleClose: () => void }> = ({
  data,
  handleClose,
}) => {
  const formRef = useRef(null);
  const [exercisesField, setExercisesField] = useState<ExerciseItem[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const exercises = extractNumberedKeys(formData);

    commitMutation(RelayEnvironment, {
      mutation: CreateOrUpdateTrainingMutation,
      variables: {
        _id: data?._id,
        name: formData?.name,
        description: formData?.description,
        exercises,
      },
      onCompleted: () => {
        handleClose();
        Toast.success('Treino salvo com sucesso!');
      },
    });
  };

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (formRef.current[key]) {
          formRef.current[key].value = value;
        }
      });

      setExercisesField(data.exercises);
    }
  }, [formRef, data]);

  const addExercise = () => {
    setExercisesField([
      ...exercisesField,
      { exercise_id: '', reps: 0, sets: 0, weight: 0, rest: 0 },
    ]);
  };

  return (
    <div className="border border-neutral-700 p-4 rounded-md space-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-neutral-300 text-base font-bold">
          {data ? 'Editar' : 'Criar'} Treino
        </h1>
        <XMarkIcon
          className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer"
          aria-hidden="true"
          onClick={() => handleClose()}
        />
      </div>
      <form
        ref={formRef}
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          id="name"
          className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
          placeholder="Nome"
          required
        />
        <textarea
          name="description"
          id="description"
          className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300 resize-none"
          placeholder="Descrição"
          rows={4}
        />
        <div className="space-y-2 pt-3 pb-2">
          <div className="flex flex-row justify-between items-center">
            <span className="text-neutral-300 text-sm font-bold">
              Exercícios
            </span>
            <a
              className="inline-flex items-center p-1.5 border border-neutral-700 rounded-md shadow-sm text-white"
              onClick={() => addExercise()}
            >
              <PlusIcon className="h-5 w-5 cursor-pointer text-neutral-300" />
            </a>
          </div>
          {exercisesField.map((exercise, index) => (
            <Suspense>
              <ExerciseItem data={exercise} index={index} />
            </Suspense>
          ))}
        </div>
        <button
          type="submit"
          className="bg-neutral-800 text-neutral-200 font-semibold rounded-md transition-all hover:bg-neutral-600 w-full h-12 self-end"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default CreateAndUpdate;
