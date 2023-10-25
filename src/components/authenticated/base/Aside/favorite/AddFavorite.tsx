import { findFavorites, findFavoritesResponse, postFavorites } from '@/api/generals/Favorites'
import { t } from 'i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import { FavoriteUserResponse, UnFavList } from '../types'
import { BeatLoader } from 'react-spinners'
import { AiFillHeart,AiOutlineReload } from 'react-icons/ai'


const AddFavorite = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [loadMoreLoading,setLoadMoreLoading] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<FavoriteUserResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const PlusIcon = useMemo(() => {
        return <HiPlus />
    }, [])

    const fetchFavorites = useCallback(async (pageNumber: number, searchTerm: string) => {
     
        try {
            const endpoint = `/user/favorites/find?page=${pageNumber}`;
            const response: findFavoritesResponse = await findFavorites(endpoint, searchTerm) as findFavoritesResponse;
            if (response?.status === 200) {
                const res = response?.data?.data?.data;
                setFavorites((prev) => (pageNumber === 1 ? res : [...prev, ...res]));
                setLastPage(response!.data.data.last_page);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);


    const loadMore = () => {
        setLoadMoreLoading(true);
        const nextPage = page + 1;
        if (nextPage <= lastPage) {
            setPage(nextPage);
            fetchFavorites(nextPage, search);
            setLoadMoreLoading(false);
        }
    };

    useEffect(() => {
        const handleFavoritesUpdated = (e: any) => {
            setFavorites((prev) => [...prev, e.detail.favorite as FavoriteUserResponse]);
        };

        const handleFavoritesAdded = (e: any) => {
            console.log(e);
            setFavorites((prev) =>
                prev.filter((favorite) => favorite.id !== e.detail.fav_id)
            );
        };

        window.addEventListener('favorites-updated', handleFavoritesUpdated);
        window.addEventListener('favorites-added', handleFavoritesAdded);

        return () => {
            window.removeEventListener('favorites-updated', handleFavoritesUpdated);
            window.removeEventListener('favorites-added', handleFavoritesAdded);

        };
    }, [favorites]);

    const {
        register,
        handleSubmit,
    } = useForm<any>({
        //   resolver: yupResolver(error)
    });

    const onSubmit = async (data: any) => {
        setSearch(data.search);
        setPage(1);
        setLoading(true);
        await fetchFavorites(1, data.search);
        
    };

    const spin = loadMoreLoading ? 'spin-full' : '';

    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my_modal_8" className="cursor-pointer sidebar-item w-8 h-8">
                <span className="sidebar-icon text-[1.3rem]">{PlusIcon}</span>
            </label>

            <input type="checkbox" id="my_modal_8" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box scroll !z-[100] relative  w-5/6 md:w-4/6  max-h-[60%]">
                    <h3 className="text-lg font-bold mb-3 pb-4 bb capitalize">{t('add your favorite')}</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full flex flex-row gap-3">

                            <input type="text"
                                {...register('search')}
                                placeholder={t('find the user')} className="res-input w-full input-bordered" />

                            <button type="submit"

                                className="btn btn-primary btn-sm md:btn-md">{t('search')}</button>

                        </div>

                    </form>

                    {
                        <div>
                            {/* Your form and rendering logic here */}
                            {loading ? <BeatLoader color='blue' className="text-center mt-8" loading={true} size={10} /> : null}
                            <div className="flex flex-col gap-8 mt-8">
                                { favorites.length === 0 ? <div className="text-center text-gray-500 capitalize">{t('add more friends to get better result')}</div> : null}
                                {favorites.map((fav) => (
                                    <div key={fav.id} className="user-chat ">
                                        <InlineUser user={fav} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                    {
                        loading ? null : lastPage <= page ? null : (
                            <button onClick={loadMore} className={`mb-2 mt-4 w-full flex justify-center ${spin}`}>
                                <span className='text-[1.2rem]'>
                                        <AiOutlineReload />
                                </span>
                            </button>
                        )
                    }


                </div>


                <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
            </div>
        </>
    )
}

const InlineUser = ({ user }: { user: FavoriteUserResponse }) => {
    const model = document.getElementById('my_modal_8') as HTMLInputElement;
    const HeartIcon = useMemo(() => {
        return <AiFillHeart />
    }, [])
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    if((user as unknown as UnFavList)?.single_chat_infos?.length > 0){
        user.chat_id = (user as unknown as UnFavList)?.single_chat_infos[0]?.single_chat_id

    }
    user.fav_id = user.id;
    console.log(user);
    
    const addFavorite = async () => {
        const res: any = await postFavorites('/user/favorites/add', { favorite_id: user.id }, 'post');
        if (res?.status === 200) {
            console.log('here')
            window.dispatchEvent(new CustomEvent('favorites-added', {
                detail: {
                    favorite_id: res.data.data.favorite_id,
                    favorite: user
                }
            }));
            model.checked = false;
        }
    }

    useEffect(() => {

        return () => {
            setIsFavorite(false);
        }
    }, [])

    return (
        <>
            <div className={`avatar w-[20%]`}>
                <div className="w-14 mask mask-squircle">
                    <img src={user.profile_photo!} />
                </div>
            </div>

            {/* chat */}
            <div className={` w-[60%] flex flex-col gap-1 `}>
                <div className={`flex justify-between`}>
                    <div className="capitalize">{user?.name}</div>
                </div>

            </div>

            {/* time */}
            <div className=" w-[20%] flex flex-col gap-1 justify-center items-center">
                {
                    isFavorite ? <button className="heartful" >
                        <span className="sidebar-icon">{HeartIcon} </span>
                    </button> : <button className="sidebar-item" onClick={addFavorite}>
                        <span className="sidebar-icon">{HeartIcon} </span>
                    </button>
                }
            </div>
        </>
    )
}


export default AddFavorite