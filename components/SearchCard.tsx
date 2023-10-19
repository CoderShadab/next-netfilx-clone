import React from 'react';
import { useRouter } from 'next/router';
import { BsFillPlayFill, BsChevronDown } from 'react-icons/bs';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModel';

interface SearchCardProps {
    data: Record<string, any>;
}

const SearchCard: React.FC<SearchCardProps> = ({
    data
}) => {
    const router = useRouter();
    const { openModal } = useInfoModal();

    return (
        <div className='group bg-zinc-900 col-span relative pt-3 h-[12vw]'>
            <img
                className='
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-md
                    group-hover:opacity-90
                    sm:group-hover:opacity-0
                    delay-300
                    w-full
                    h-[12vw]
                '
                src={data?.thumbnailUrl} alt="Thumbnail" />
            <div
                className='
                    opacity-0
                    absolute
                    top-0
                    transition
                    duration-200
                    z-10
                    invisible
                    sm:visible
                    delay-300
                    w-full
                    scale-0
                    group-hover:scale-110
                    group-hover:-translate-y-[2vw]
                    group-hover:opacity-100
                '
            >
                <img
                    className='
                        cursor-pointer
                        object-cover
                        transition
                        duration
                        shadow-xl
                        rounded-md
                        w-full
                        h-[12vw]
                        relative
                    '
                    src={data?.thumbnailUrl} alt="Thumbnail" />
                <div
                    className='
                            z-10
                            bg-zinc-800
                            p-2
                            sm:p-4
                            lg:p-4
                            absolute
                            w-full
                            transition
                            shadow-md
                            rounded-b-md
                        '
                >
                    <div
                        className='flex flex-row items-center gap-3 text-[10px] md:text-[15px]'
                    >
                        <div
                            className='
                                    cursor-pointer
                                    w-6
                                    h-6
                                    lg:w-10
                                    lg:h-10
                                    bg-white
                                    rounded-full
                                    flex
                                    justify-center
                                    items-center
                                    transition
                                    hover:bg-neutral-300
                                    hover:animate-pulse
                                    hover:scale-125
                                '
                            onClick={() => router.push(`/watch/${data?.id}`)}
                        >
                            <BsFillPlayFill size={30} color='black' className='sm:scale-75' title='Play Now' />
                        </div>
                        <FavoriteButton movieId={data?.id} />
                        <div
                            onClick={() => openModal(data?.id)}
                            className='cursor-pointer 
                                            group/items 
                                            w-6
                                            sm:w-10
                                            h-6 
                                            lg:h-10 
                                            border-white 
                                            border-2 
                                            rounded-full 
                                            flex
                                            justify-center 
                                            items-center 
                                            transition 
                                            hover:border-neutral-300 -rotate-90
                                            hover:rotate-0
                                            hover:scale-125
                                            '
                            title='More Info'
                        >
                            <BsChevronDown size={15} className='text-white' />
                        </div>
                    </div>
                    <p className='text-green-400 mt-1'>
                        New <span className='text-white md:text-[15px] sm:text-[13px]'>2023</span>
                    </p>
                    <div className='flex flex-row mt-1 gap-2 items-center'>
                        <p className='text-white text-[10px] md:text-[15px]'>duration: {data?.duration}</p>
                    </div>
                    <div className='flex flex-row mt-1 gap-2 items-center'>
                        <p className='text-white text-[10px] md:text-[15px]'>genre: {data?.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchCard;