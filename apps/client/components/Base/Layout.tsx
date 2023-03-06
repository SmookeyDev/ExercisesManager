import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import ManagerTabs from '../Manager';
import UserDetails from '../UserDetails';

interface Props {
  children?: ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title = '' }) => {
  const [createTabsIsOpen, setCreateTabsIsOpen] = useState(false);
  const [UserDetailsIsOpen, setUserDetailsIsOpen] = useState(false);

  return (
    <div className="bg-neutral-900 min-w-screen flex flex-col">
      <ManagerTabs isOpen={createTabsIsOpen} setOpen={setCreateTabsIsOpen} />
      <UserDetails isOpen={UserDetailsIsOpen} setOpen={setUserDetailsIsOpen} />
      <div className="min-h-screen mx-auto px-6 w-full md:max-w-[768px] flex flex-col">
        <Head>
          <title>{title}</title>
        </Head>

        <Navbar
          setCreateTabsIsOpen={setCreateTabsIsOpen}
          setUserDetailsIsOpen={setUserDetailsIsOpen}
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
