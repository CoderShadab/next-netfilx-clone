import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  const storedIndex = localStorage.getItem('selectedProfileIndex');
  const initialIndex = storedIndex ? parseInt(storedIndex, 10) : 0;

  const handleClick = (index: number) => {
    
    router.push({
        pathname: '/',
        query: { index: index },
    } as any); // "as any" to avoid TypeScript error
    
};
  return (
    <div className="h-screen w-screen bg-black">
      
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <BsArrowLeft onClick={() => handleClick(initialIndex)} size={25} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-70 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      <video id="stream" className="h-full w-full" autoPlay controls src={data?.videoUrl} controlsList='nodownload'></video>
    </div>
  )
}

export default Watch;