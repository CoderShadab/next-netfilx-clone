import React from 'react';

import { NextPageContext } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useCurrentUser from "@/hooks/useCurrentUser";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}

const Profiles = () => {
    const router = useRouter();
    const { data: user } = useCurrentUser();
   
    const localImagePaths = [
        '/images/Netflix-avatar1.png',
        '/images/Netflix-avatar2.jpg',
        '/images/Netflix-avatar3.png',
        '/images/Netflix-avatar4.jpg'
    ];

    const handleImageClick = (index: number) => {
        
        router.push({
            pathname: '/',
            query: { index: index },
        } as any); // "as any" to avoid TypeScript error
        
    };
    
    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
                <div className="flex items-center justify-center gap-8 mt-12">
                    {localImagePaths.map((path, index) => (
                        <div key={index} onClick={() => handleImageClick(index + 1)} style={{ cursor: 'pointer' }}>
                            <div className="group flex-row w-44 mx-auto">
                                <div
                                    className="
                                        w-44
                                        h-44
                                        rounded-md
                                        flex 
                                        items-center
                                        justify-center
                                        border-2
                                        border-transparent
                                        group-hover:cursor-pointer
                                        group-hover:border-white
                                        overflow-hidden
                                    "
                                >
                                    <Image src={path} width={200} height={200} alt="profile" priority />
                                    
                                </div>
                                <div
                                    className="
                                        mt-4
                                        text-2xl
                                        text-center
                                        text-gray-400
                                        group-hover:text-white
                                    "
                                >
                                    {user?.name}
                                </div>
                            </div>
                        </div>
                        
                    ))}

                </div>
            </div>
        </div>
    );
}
 
export default Profiles;