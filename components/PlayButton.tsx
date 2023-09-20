import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
      bg-white 
      font-bold
      text-black
      text-opacity-60
      bg-opacity-30
      rounded-lg
      py-1 md:py-3
      px-2 md:px-4
      w-auto
      text-[10px] lg:text-[15px]
      flex 
      flex-row
      items-center
      hover:bg-opacity-100
      hover:text-opacity-100
      transition
      hover:animate-bounce
        "
      >
        <BsFillPlayFill className="mr-1 md:h-5 md:w-5 sm:h-3 sm:w-3" size={30}/>
        Play
    </button>
  );
}

export default PlayButton;