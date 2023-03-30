import { XMarkIcon } from '@heroicons/react/24/outline';
import { CreateOrUpdateExerciseMutation } from '../../../../relay/exercises/CreateOrUpdateExerciseMutation';
import { RelayEnvironment } from '../../../../relay/RelayEnvironment';
import { commitMutation } from '../../../../relay/commitMutation';
import { useEffect, useRef } from 'react';
import Toast from '../../../../utils/toastify';

type Props = {
  data?: any;
  handleClose: () => void;
};

const CreateAndUpdate: React.FC<Props> = ({ data, handleClose }) => {
  const formRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    commitMutation(RelayEnvironment, {
      mutation: CreateOrUpdateExerciseMutation,
      variables: {
        _id: data?._id,
        ...Object.fromEntries(formData),
      },
      onCompleted: () => {
        handleClose();
        Toast.success('Exercício salvo com sucesso!');
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
    }
  }, [formRef, data]);

  return (
    <div className="border border-neutral-700 p-4 rounded-md space-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-neutral-300 text-base font-bold">
          {data ? 'Editar' : 'Criar'} Exercício
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
        <input
          type="text"
          name="muscle_group"
          id="muscle_group"
          className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
          placeholder="Grupo Muscular"
          required
        />
        <textarea
          name="description"
          id="description"
          className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300 resize-none"
          placeholder="Descrição"
          rows={4}
        />
        <input
          type="text"
          name="video_url"
          id="video_url"
          className="shadow-sm w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
          placeholder="URL do Vídeo (Apenas Youtube)"
        />
        <button
          type="submit"
          className="bg-neutral-800 text-neutral-200 font-semibold rounded-md  transition-all hover:bg-neutral-600 w-full h-12 self-end"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default CreateAndUpdate;
