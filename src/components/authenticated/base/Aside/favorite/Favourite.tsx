import { t } from "i18next";

import { MemorizedChatLine } from "./FavoriteLine";
import { FavoriteUserResponse } from "../types";
import { useCallback, useEffect, useState } from "react";
import { getFavorites } from "@/api/generals/Favorites";
import { BeatLoader } from "react-spinners";
import CloseBtn from "@/components/tools/CloseBtn";
import AddFavorite from "./AddFavorite";

const Favourite = () => {

  const [favorites, setFavorites] = useState<Array<FavoriteUserResponse>>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavorites = useCallback(async (page: number) => {
    setLoading(true);
    const res: any = await getFavorites(`user/favorites?page=${page}`)!;
    const data = res.data.data;
    setFavorites((prev) => [...prev, ...data]);
    setLoading(false);
  }, [])

  useEffect(() => {
    fetchFavorites(page);

  }, [page]);

  useEffect(() => {
    const handleFavoritesUpdated = (e: any) => {
      setFavorites((prev) =>
        prev.filter((favorite) => favorite.fav_id !== e.detail.favorite_id)
      );
    };

    const handleFavoritesAdded = (e: any) => {
      
      setFavorites((prev) => [...prev, e.detail.favorite]);
      console.log(favorites);
    };

    window.addEventListener('favorites-updated', handleFavoritesUpdated);
    window.addEventListener('favorites-added', handleFavoritesAdded);

    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdated);
      window.removeEventListener('favorites-added', handleFavoritesAdded);
    };
  }, [favorites]);

  console.log(favorites);


  return (
    <div  
     className="animate__animated animate__fadeIn  relative  z-[200]">
      <div className="py-5">

        <div className="flex flex-col ">
          <div className="flex justify-between items-center px-10 mb-10">
            <h3 className="text-2xl font-bold capitalize">{t('Favorites')}</h3>

            <div className="flex gap-4">
              <AddFavorite />
              <CloseBtn />

            </div>
          </div>

         
          <div className="favorites-body  h-[87vh] scroll overflow-y-scroll">
            {loading ? <div className="w-full text-center ">
              <BeatLoader color='#1c9dea' loading={true} size={10} />
            </div> :
              favorites.length > 0 ? favorites.map((favorite) => (
                <MemorizedChatLine key={favorite.id} favoriteUser={favorite} />
              )) : <div className="w-full text-center text-gray-500">
                <p>{t('No favorites yet')}</p>
              </div>
            }
          </div>

        </div>


      </div>
    </div>
  );
};


export default Favourite;
