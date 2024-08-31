'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import {
  Archive,
  Clipboard,
  Layout,
  Menu,
  PoundSterling,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import SidebarLink from '@/app/(components)/navbar/sidebar/sidebarLink';
import Link from 'next/link';
import Image from 'next/image';

const Sidebar = () => {
  const thisYear = new Date();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // Sidebar classnames for when it's collapsed vs expanded
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? 'w-0 md:w-16' : 'w-72 md:w-64'
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? 'px-5' : 'px-8'
        }`}
      >
        <Link href="/" className="flex gap-3">
          <Image
            src="https://s3-inventorymanagement-bucket-lv.s3.eu-west-2.amazonaws.com/logo.png"
            alt="Logo"
            width={27}
            height={27}
            className="rounded w-8"
          />
          <h1
            className={`${
              isSidebarCollapsed ? 'hidden' : 'block'
            } font-extrabold text-2xl`}
          >
            FOXSTOCK
          </h1>
        </Link>

        {/* TOGGLE SIDEBAR BUTTON */}
        <button
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="size-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; {thisYear.getFullYear()} FOXSTOCK
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
