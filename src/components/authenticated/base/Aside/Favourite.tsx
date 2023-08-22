import { t } from "i18next";

import { FavoriteLine } from "./subs/FavoriteLine";
import { FavoriteUserResponse } from "./types";
import { useCallback, useEffect, useState } from "react";
import { getFavorites } from "@/api/generals/Favorites";
import { BeatLoader } from "react-spinners";

const Favourite = () => {
  
  const [favorites, setFavorites] = useState<Array<FavoriteUserResponse>>([])
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFavorites = useCallback(async (page: number) => {
    setLoading(true);
    const res : any = await getFavorites(`user/favorites?page=${page}`) !
    const data = res.data.data;
    setFavorites((prev) => [...prev, ...data]);
    setLoading(false);
  }, [])

  useEffect(() => {
    fetchFavorites(page);

  },[]);

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="max-h-[100vh] w-[30vw] scroll py-12">

        <div className="flex flex-col">
            <div className="flex items-center px-10 mb-10">
                <h3 className="text-2xl font-bold capitalize">{t('Favorites')}</h3>
            </div>

            <div className="favorites-body ">
                { loading ? <div className="w-full text-center ">
                  <BeatLoader color='#1c9dea' loading={true} size={10} />
                </div>:
                    favorites.map((favorite) => (
                        <FavoriteLine key={favorite.favorite.id} favoriteUser={favorite} />
                    ))
                }
            </div>

        </div>

      
      </div>
    </div>
  );
};

export default Favourite;
