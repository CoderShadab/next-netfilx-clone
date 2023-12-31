import React, { useState, useEffect, useRef } from 'react';
import SearchCard from './SearchCard';
import useMovieList from '@/hooks/useMovieList';

function Card({ person }) {
  const { data: movies = [] } = useMovieList();
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const cardRef = useRef(null);
  const matchingMovie = movies.find(movie => movie.id === person.id);

  const handleMouseEnter = () => {
    setIsInfoVisible(true);
  };

  const handleDocumentClick = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsInfoVisible(false);
    }
  };

  useEffect(() => {
    if (isInfoVisible) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isInfoVisible]);

  return (
    <div className="text-white bg-opacity-30 backdrop-blur-sm bg-black p-2 pb-5 rounded-md" ref={cardRef}>
      <div>
        <h2
          className='cursor-pointer'
          onMouseEnter={handleMouseEnter}
        >
          {person.title}
        </h2>
        <hr className="opacity-50 mt-1" />
        {isInfoVisible && matchingMovie && (
          <SearchCard data={matchingMovie} />
        )}
      </div>
    </div>
  );
}

export default Card;
