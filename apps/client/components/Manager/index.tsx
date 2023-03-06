import { Tab } from '@headlessui/react';
import Modal from '../Modal';
import TrainingsTab from './tabs/Trainings';
import ExercisesTab from './tabs/Exercises';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const CreateTabs: React.FC<Props> = ({ isOpen, setOpen }) => {
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-neutral-900 border border-neutral-700 rounded-md">
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-neutral-300' : 'text-neutral-500 '
              } w-full py-2.5 text-base font-bold border-r border-neutral-700`
            }
          >
            <a>Gerenciar Treinos</a>
          </Tab>
          <Tab
            className={({ selected }) =>
              `${
                selected ? 'text-neutral-300' : 'text-neutral-500'
              } w-full py-2.5 text-base font-bold`
            }
          >
            <a>Gerenciar Exercícios</a>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel><TrainingsTab/></Tab.Panel>
          <Tab.Panel><ExercisesTab/></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Modal>
  );
};

export default CreateTabs;
