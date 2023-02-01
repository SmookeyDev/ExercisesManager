import React, { ReactNode, useState } from 'react';
import { useSession } from "next-auth/react";
import Head from 'next/head';
import Navbar from './Navbar';
import CreateTabs from '../CreateTabs';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title = '' }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [createTabsIsOpen, setCreateTabsIsOpen] = useState(false);
  const handleCreateTabsOpen = () => setCreateTabsIsOpen(!createTabsIsOpen);


  return (
    <div className="bg-neutral-900 min-w-screen flex flex-col">
      <CreateTabs isOpen={createTabsIsOpen} setOpen={handleCreateTabsOpen} />
      <div className="min-h-screen mx-auto px-6 w-full md:max-w-[768px] flex flex-col">
        <Head>
          <title>{title}</title>
        </Head>

        <Navbar handleCreateTabsOpen={handleCreateTabsOpen} session={session} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
