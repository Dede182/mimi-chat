import { useAppSelector } from "@/app/hooks";
import { selectOnlineActiveUsers } from "@/app/slices/chat/onlineActiveUserSlice";
import { ChatListDataType } from "@/components/authenticated/Chat/types/ChatTypes"
import { memo } from "react"
import { useNavigate, useParams } from "react-router-dom";



const ChatLine = ({chatline}: {chatline:ChatListDataType}) => {
  const navigate = useNavigate();
  const chatId = chatline?.chat_id;

  const currentChat = useParams<{ id: string }>().id; 
  const currentChatAsNumber = parseInt(currentChat !, 10);
  const isActive = currentChatAsNumber  === chatId  ? 'bg-gray-400' : '';
  const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
  const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id === chatline?.user_id);
  const isOnline = onlineActiveUser ? 'online' : 'offline';
  console.log(onlineActiveUserSlice);
  return (
    <div
    onClick={() => navigate(`/chat/${chatId}`)}
    className={`chat-line flex gap-3  py-3 px-10 cursor-pointer ${isActive}`}>
                {/* avatar */}
                  <div className={`avatar w-[20%] ${isOnline}`}>
                    <div className="w-14 mask mask-squircle">
                    <img src={chatline.profile_photo !} />
                    </div>
                </div>

                {/* chat */}
                <div className="chat-message w-[60%] flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="">{chatline?.name}</div>
                    </div>
                  <div className="text-sm">{chatline?.lastMessage}</div>
                </div>

                {/* time */}
                <div className="chat-time w-[20%] flex flex-col gap-1">
                  <div className="text-sm">12:00</div>
                  <div className="text-sm">seen</div>
                 </div>
                  
            </div>
  )
}

export const MemorizedChatLine = memo(ChatLine)
