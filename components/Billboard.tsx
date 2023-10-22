import useBillboard from '@/hooks/useBillboard';
import React from 'react';
import { useCallback } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModel';

const Billboard = () => {
    const { data } = useBillboard();
    const { openModal } = useInfoModal();

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);

    return (
        <div className='relative h-[45vw] sm:h-[50vw] md:h-[46vw]'>
            <video
                className='
                    w-full
                    h-[55.25vw]
                    md:h-[47.25vw]
                    sm:h-[46vw]
                    object-cover
                    brightness-[70%]
                '
                autoPlay
                muted
                loop
                poster={data?.thumbnailUrl}
                src={data?.trailUrl}>
            </video>
            <div className='absolute top-[35%] md:top-[25%] ml-4 md:ml-16 text-white text-opacity-80 p-5 lg:backdrop-blur-sm lg:rounded-lg lg:bg-black lg:bg-opacity-40 lg:w-[50%]'>
                <p className='sm:text-[20px] text-[13px] md:text-4xl h-full w-[40%] lg:text-6xl font-bold drop-shadow-xl'>
                    {data?.title}
                </p>
                <p className='
                        text-[8px]
                        sm:text-[15px]
                        md:text-[16px]
                        mt-3
                        md:mt-8
                        w-[90%]
                        md:w-[80%]
                        lg:w-[90%]
                        drop-shadow-xl
                    '>
                    {data?.description}
                </p>
                <div className='flex flex-row items-center mt-1 md:mt-4 gap-2 md:gap-3 lg:gap-3 text-gray-300 text-[10px] lg:text-[15px]'>
                    {data?.date}
                    <span>|</span>
                    <div className='py-[2px] px-2 border-2 border-gray-300'>{data?.age}</div>
                    <span>|</span>
                    {data?.duration}
                    <span>|</span>
                    <PlayButton movieId={data?.id}/>
                    <div className='flex flex-col'>
                        <button
                        onClick={handleOpenModal}
                            className='
                                    bg-white
                                    text-white
                                    bg-opacity-30
                                    rounded-lg
                                    py-1 md:py-3
                                    px-2 md:px-4
                                    w-auto
                                    text-[10px] lg:text-[15px]
                                    flex 
                                    flex-row
                                    items-center
                                    hover:bg-opacity-10
                                    hover:animate-bounce
                                    transition
                                '
                        >
                            <AiOutlineInfoCircle className='mr-1 md:h-4 md:w-4 sm:h-3 sm:w-3' size={15}/>
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billboard;