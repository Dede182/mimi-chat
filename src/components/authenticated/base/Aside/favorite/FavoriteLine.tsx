import { useAppSelector } from "@/app/hooks";
import { FavoriteUserResponse } from "../types";
import { selectOnlineActiveUsers } from "@/app/slices/chat/onlineActiveUserSlice";
import { postFavorites } from "@/api/generals/Favorites";
import { cutString } from "@/utils/helpers/ChatHelper";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
const FavoriteLine = ({ favoriteUser }: { favoriteUser: FavoriteUserResponse }) => {

    const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
    const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id === favoriteUser.fav_id);
    const isOnline = onlineActiveUser ? 'online' : 'offline';
    // const navigate = useNavigate()

    const name = cutString(favoriteUser?.name)

    const navigate = useNavigate();

    const memorizedDropDown = useMemo(() => {
        const removeFavorite = async () => {
            const res = await postFavorites('/user/favorites/remove', { favorite_id: favoriteUser.fav_id });
            if (res?.status === 200) {
                window.dispatchEvent(new CustomEvent('favorites-updated', {
                    detail: {
                        favorite_id: favoriteUser.fav_id,
                        favorite: favoriteUser
                    }
                }));
            }
        }
        return (
            <div className="dropdown dropdown-end">
                <div className="flex items-center h-full">
                    <label tabIndex={0} className="px-3 cursor-pointer">...</label>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <button onClick={removeFavorite}>Remove</button>
                    </li>
                    {/* <li><a>Item 2</a></li> */}
                </ul>
            </div>
        )
    },[favoriteUser])

    const navigateToChat = () => {
        navigate(`/chat/${favoriteUser.chat_id}`)
      }

    return (
        <div
        className="w-full ">
            <div
            
                className={`chat-line flex justify-between gap-4 py-3 px-10 cursor-pointer relative`}>
                {/* avatar */}
                <div  onClick={() => navigateToChat()}  className={`avatar w-[50px] ${isOnline}` }>
                    <div className="w-14 mask mask-squircle">
                        <img src={favoriteUser.profile_photo} />
                    </div>
                </div>

                {/* chat */}
                <div  onClick={() => navigateToChat()} className={`chat-message w-[40vw] md:w-[10vw] overflow-x-hidden flex flex-col gap-1`}>
                    <div className={`flex justify-between`}>
                        <div className="capitalize whitespace-nowrap">{name}</div>
                    </div>

                </div>

                {memorizedDropDown}

            </div>

        </div>
    )
}


const IsSameChat = ({ favoriteUser: prevProps }: { favoriteUser: FavoriteUserResponse }, { favoriteUser: nextProps }: { favoriteUser: FavoriteUserResponse }) => {
    return Object.keys(prevProps).every((key) => {
        return prevProps[key as keyof FavoriteUserResponse] === nextProps[key as keyof FavoriteUserResponse]
    })
}

export const MemorizedChatLine = memo(FavoriteLine, IsSameChat)