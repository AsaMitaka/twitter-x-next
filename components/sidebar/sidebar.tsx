import { BiLogOut } from 'react-icons/bi';
import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarItem from './sidebaritem';
import SidebarLogo from './sidebarlogo';
import SidebarTweetButton from './sidebartweetbutton';
import { signOut } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrent';

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      icon: BsBellFill,
    },
    {
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items &&
            items.map((item, index) => (
              <SidebarItem
                key={index}
                auth={item.auth}
                label={item.label}
                href={item.href}
                icon={item.icon}
              />
            ))}
          {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} label="Logout" />}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
