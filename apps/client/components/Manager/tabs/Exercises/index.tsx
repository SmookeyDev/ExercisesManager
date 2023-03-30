import { PlusIcon } from '@heroicons/react/20/solid';
import { Suspense, useRef, useState } from 'react';
import TabContent from './Content';
import CreateAndUpdate from './CreateAndUpdate';

const ExercisesTab: React.FC = () => {
  const [search, setSearch] = useState<string>(null);
  const [data, setData] = useState<any>(null);
  const contentRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    setData(null);
    contentRef.current.refetch();
  };

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <div className="flex flex-col py-4 space-y-4">
      {!open && (
        <div className="mt-1 flex flex-row items-center space-x-2">
          <input
            type="text"
            name="name"
            id="name"
            className="shadow-sm  w-full sm:text-sm bg-neutral-900 border-neutral-700 px-4 rounded-md placeholder-neutral-500 text-neutral-300"
            placeholder="Buscar"
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="inline-flex items-center p-1.5 border border-neutral-700 rounded-md shadow-sm text-white"
            onClick={() => setOpen(true)}
          >
            <PlusIcon className="h-6 w-6 cursor-pointer text-neutral-300" />
          </button>
        </div>
      )}
      <Suspense>
        {open && <CreateAndUpdate handleClose={handleClose} data={data} />}
        <TabContent search={search} contentRef={contentRef} handleOpen={handleOpen} setData={setData} />
      </Suspense>
    </div>
  );
};

export default ExercisesTab;
