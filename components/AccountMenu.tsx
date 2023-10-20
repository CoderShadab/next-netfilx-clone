import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { PiSignOut } from 'react-icons/pi';
import avatar1 from '@/public/images/Netflix-avatar1.png';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-60 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800 rounded-lg">
      <div className="flex flex-col gap-2 font-light tracking-wide">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image src={avatar1} alt="Avatar" priority className="w-8 rounded-md" />
          <p className="text-white text-sm group-hover/item:underline">
            {user?.name}
          </p>
        </div>
        <hr className="bg-gray-700 border-0 h-px my-3" />
        <div
          onClick={() => signOut()}
          className="px-3 flex flex-row gap-3 text-center text-white text-sm hover:underline cursor-pointer"
        >
          <PiSignOut className="text-gray-200" size={20} />
          Sign out of Streamflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
