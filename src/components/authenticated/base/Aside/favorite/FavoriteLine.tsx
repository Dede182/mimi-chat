import { useAppSelector } from "@/app/hooks";
import { FavoriteUserResponse } from "../types";
import { selectOnlineActiveUsers } from "@/app/slices/chat/onlineActiveUserSlice";
import { postFavorites } from "@/api/generals/Favorites";
// import { useNavigate } from "react-router-dom";

export const FavoriteLine = ({ favoriteUser }: { favoriteUser: FavoriteUserResponse }) => {

    const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
    const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id === favoriteUser.favorite.id);
    const isOnline = onlineActiveUser ? 'online' : 'offline';
    // const navigate = useNavigate()

    const removeFavorite = async () => {
        const res = await postFavorites('/user/favorites/remove', { favorite_id: favoriteUser.favorite_id });
        if(res?.status === 200)
        {
            window.dispatchEvent(new CustomEvent('favorites-updated', { detail: { favorite_id: favoriteUser.favorite_id } }));
        }
    }

   

    return (
        <div className="w-full ">
            <div
                // onClick={() => navigateToChat()}
                className={`chat-line flex justify-between gap-4 py-3 px-10 cursor-pointer relative`}>
                {/* avatar */}
                <div className={`avatar w-[50px] ${isOnline}`}>
                    <div className="w-14 mask mask-squircle">
                        <img src={favoriteUser.favorite.profile_photo} />
                    </div>
                </div>

                {/* chat */}
                <div className={`chat-message w-[10vw] flex flex-col gap-1`}>
                    <div className={`flex justify-between`}>
                        <div className="capitalize">{favoriteUser.favorite.name}</div>
                    </div>

                </div>
                <div className="dropdown dropdown-end">
                    <div className="flex items-center h-full">
                    <label tabIndex={0} className="px-3 cursor-pointer">...</label>
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button onClick={removeFavorite }>Remove</button>
                        </li>
                        {/* <li><a>Item 2</a></li> */}
                    </ul>
                </div>
            </div>

        </div>
    )
}
