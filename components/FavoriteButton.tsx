import axios from "axios";
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  movieId,
}) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="
                cursor-pointer
                group/item 
                ml-auto
                w-6
                h-6
                lg:w-10
                lg:h-10
                flex
                border-2
                rounded-full
                justify-center
                items-center
                transition
                hover:scale-125
                hover:border-neutral-300
         ">
      <Icon className='text-white sm:scale-75' size={25} title="WishList" />
    </div>
  );
}

export default FavoriteButton;