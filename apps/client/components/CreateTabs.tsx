import { Tab, Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  setOpen: () => void;
}

const CreateTabs: React.FC<Props> = ({ isOpen, setOpen }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pt-24 pl-0 md:pl-10 md:pt-0">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-y-full md:translate-y-0 md:translate-x-full"
              enterTo="translate-y-0 md:translate-y-0 md:translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-y-0 md:translate-y-full md:translate-x-0"
              leaveTo="translate-y-full md:translate-y-0 md:translate-x-full"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen()}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-full flex-col overflow-y-scroll bg-neutral-900 border border-neutral-700 rounded-2xl py-6 shadow-xl">
                  <div className="relative flex-1 px-4 sm:px-6">
                    <Tab.Group>
                      <Tab.List className="flex p-1 space-x-1 bg-neutral-900 border border-neutral-700 rounded-md">
                        <Tab
                          className={({ selected }) =>
                            `${
                              selected
                                ? 'text-neutral-300'
                                : 'text-neutral-400 '
                            } w-full py-2.5 text-base font-bold border-r border-neutral-700`
                          }
                        >
                          <a>Criar Treino</a>
                        </Tab>
                        <Tab
                          className={({ selected }) =>
                            `${
                              selected ? 'text-neutral-300' : 'text-neutral-400'
                            } w-full py-2.5 text-base font-bold`
                          }
                        >
                          <a>Criar Exercício</a>
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel>oi</Tab.Panel>
                        <Tab.Panel>oi2</Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateTabs;
