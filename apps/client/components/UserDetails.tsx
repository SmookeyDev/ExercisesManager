import { useSession } from 'next-auth/react';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const UserDetails: React.FC<Props> = ({ isOpen, setOpen }) => {
  const { data } = useSession();

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="flex flex-row justify-center">
        <div className="flex items-center py-6 px-20 border border-neutral-700 rounded-md">
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full"
              src={data?.user.image}
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-neutral-300 ">
              {data?.user.name}
            </div>
            <div className="text-sm font-medium text-neutral-500">
              {data?.user.email}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetails;
