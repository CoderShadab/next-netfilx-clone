import { signOut } from "next-auth/react";
import React, { useCallback } from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import { MdFeedback } from 'react-icons/md';
import { PiSignOut } from 'react-icons/pi';


import useCurrentUser from "@/hooks/useCurrentUser";
import useFeedbackModal from "@/hooks/useFeedbackModal";
interface AccountMenuProps {
    visible?: boolean;
    index: number | undefined;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible,
    index
}) => {
    const { openFeedModal } = useFeedbackModal();
    const indexString = Array.isArray(index) ? index[0] : index;

    const handleOpenModal = useCallback(() => {
        openFeedModal();
    }, [openFeedModal]);
    const {data: user} = useCurrentUser();
    const router = useRouter();

    const localImagePaths = [
        '/images/Netflix-avatar1.png',
        '/images/Netflix-avatar2.jpg',
        '/images/Netflix-avatar3.png',
        '/images/Netflix-avatar4.jpg'
      ];

    const handleSignOut = async () => {
        await signOut(); // Sign the user out
        router.push('/auth'); // Redirect to the authentication page
      };

    if (!visible) {
        return null;
    }
    return ( 
        <div className="bg-black bg-opacity-50 backdrop-blur-md w-60 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800 rounded-lg">
            <div className="flex flex-col gap-2 font-light tracking-wide">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <Image src={localImagePaths[indexString - 1]} alt="Avatar" priority className="w-8 rounded-md"  width={50} height={50}/>
                    <p className="text-white text-sm group-hover/item:underline">
                        {user?.name}
                    </p>
                </div>
                <hr className="bg-gray-500 border-0 h-px my-3"/>
                <div onClick={handleOpenModal} className="px-3 flex flex-row gap-3 text-center text-white text-sm hover:underline">
                    <MdFeedback className="text-gray-200 cursor-pointer mt-[1px]" size={20}/>   
                    Feedback
                </div>
                <hr className="bg-gray-500 border-0 h-px my-3"/>
                <div onClick={handleSignOut} className="px-3 flex flex-row gap-3 text-center text-white text-sm hover:underline">
                    <PiSignOut className="text-gray-200 cursor-pointer" size={20}/>   
                    Sign out of Streamflix
                </div>
            </div>
        </div>
     );
}
 
export default AccountMenu;