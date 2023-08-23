import { findFavorites, postFavorites } from '@/api/generals/Favorites'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi'
import { FavoriteUser } from '../types'
import { BeatLoader } from 'react-spinners'
import {AiFillHeart} from 'react-icons/ai'


const AddFavorite = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<any[]>([]);
    const endpoint = "/user/favorites/find";
    const PlusIcon = useMemo(()=>{
        return <HiPlus />
    },[])

    const fetchFavorites = async (search: string) => {
        setLoading(true);
        try {
            const response: any = await findFavorites(endpoint,search);
            console.log(response)
            setFavorites(response!.data.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const {
        register,
        handleSubmit,
    } = useForm<any>({
        //   resolver: yupResolver(error)
    });

    const onSubmit = (data: any) => {
        fetchFavorites(data.search);
    };
  return (
    <>
            {/* The button to open modal */}
            <label htmlFor="my_modal_8" className="cursor-pointer sidebar-item w-8 h-8">
            <span className="sidebar-icon text-[1.3rem]">{PlusIcon}</span>
            </label>

            <input type="checkbox" id="my_modal_8" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box scroll !z-[100] relative w-4/6 max-h-[60%]">
                    <h3 className="text-lg font-bold mb-3 pb-4 bb capitalize">{t('add chat to favorite')}</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full flex flex-row gap-3">

                            <input type="text"
                                 {...register('search')}
                                placeholder={t('find the user')} className="input modal-input w-full input-bordered" />
                        
                            <button type="submit"
                      
                            className="btn btn-primary">{t('search')}</button>

                        </div>

                    </form>

                    {
                        <div>
                            {/* Your form and rendering logic here */}
                            {loading ?   <BeatLoader color='blue' className="text-center mt-8" loading={true} size={10} /> : null}
                            <div className="flex flex-col gap-8 mt-8">
                                {favorites.map((fav, index) => (
                                    <div key={index} className="user-chat ">
                                        <InlineUser user={fav} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                </div>


                <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
            </div>
        </>
  )
}




const InlineUser = ({ user }: { user: FavoriteUser }) => {
    // const model = document.getElementById('my_modal_7') as HTMLInputElement;
    const HeartIcon = useMemo(()=>{
        return <AiFillHeart />
    },[])
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    // const AddUserToChat = async ()=>{
    //     model.checked = false;
    //     const res :any = await postFavorites('/user/favorites/remove', { favorite_id : user.id },'post');

    //     // if(response.status === 200){
    //     //     window.dispatchEvent(new CustomEvent('newChatAdded', { detail: response.data.data.single_chat_id }));
    //     //     navigate(`/chat/${response.data.data.single_chat_id}`)
    //     // }
    // }
  
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
                    isFavorite ? <button className="heartful" onClick={()=>setIsFavorite(false)}>
                        <span className="sidebar-icon">{HeartIcon} </span> 
                    </button> : <button className="sidebar-item" onClick={()=>setIsFavorite(true)}>
                        <span className="sidebar-icon">{HeartIcon} </span> 
                    </button> 
                }
            </div>
        </>
    )
  }
  

export default AddFavorite