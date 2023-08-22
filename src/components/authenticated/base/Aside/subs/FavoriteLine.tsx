import { useAppSelector } from "@/app/hooks";
import { FavoriteUserResponse } from "../types";
import { selectOnlineActiveUsers } from "@/app/slices/chat/onlineActiveUserSlice";

export const FavoriteLine = ({favoriteUser} : {favoriteUser:FavoriteUserResponse}) => {

    const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
    const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id === favoriteUser.favorite.id);
    const isOnline = onlineActiveUser ? 'online' : 'offline';

    return (
        <div>
            <div
                // onClick={() => navigateToChat()}
                className={`chat-line flex gap-3  py-3 px-10 cursor-pointer`}>
                {/* avatar */}
                <div className={`avatar w-[50px] ${isOnline}`}>
                    <div className="w-14 mask mask-squircle">
                        <img src={favoriteUser.favorite.profile_photo} />
                    </div>
                </div>

                {/* chat */}
                <div className={`chat-message w-[60%] flex flex-col gap-1`}>
                    <div className={`flex justify-between`}>
                        <div className="capitalize">{favoriteUser.favorite.name}</div>
                    </div>
                  
                </div>

            </div>
        </div>
    )
}
