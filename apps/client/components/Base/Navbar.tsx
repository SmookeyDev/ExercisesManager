import {
  HomeIcon,
  PlusCircleIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface Props {
  handleCreateTabsOpen: () => void;
  session: any;
}

const Navbar: React.FC<Props> = ({
  handleCreateTabsOpen,
  session
}) => {
  return (
    <nav className="flex flex-row justify-between py-4 max-sm:py-8">
      <div className="font-bold font-sans text-xl text-white tracking-wider">
        Academia
      </div>
      <div className="flex flex-row text-neutral-400 space-x-3 py-1 px-2">
        <HomeIcon className="h-5 w-5 cursor-pointer" />
        <PlusCircleIcon className="h-5 w-5 cursor-pointer" onClick={() => handleCreateTabsOpen()} />
        <Cog8ToothIcon className="h-5 w-5 cursor-pointer" />
        {session ? (
          <button onClick={() => signOut()}>
            <ArrowRightOnRectangleIcon className="h-5 w-5 cursor-pointer" />
          </button>
        ): (
          <Link href="/login">
              <ArrowRightOnRectangleIcon className="h-5 w-5 cursor-pointer" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
