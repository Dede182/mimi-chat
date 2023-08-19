import { useAppSelector } from "@/app/hooks";
import { selectOnlineActiveUsers } from "@/app/slices/chat/onlineActiveUserSlice";
import { ChatListDataType } from "@/components/authenticated/Chat/types/ChatTypes"
import { memo, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {BiSolidMessageDetail} from 'react-icons/bi'
const cutTime = (date : string)=>{
  const today = new Date();
  const seemAtDate = new Date(date);

  const timeDifference = today.getTime() - seemAtDate.getTime();
  const oneDayInMillis = 24 * 60 * 60 * 1000;
  let displayTime: string;

  if (timeDifference >= oneDayInMillis) {
    // More than 1 day ago, show date
    //show only month and day like 06/12
    displayTime = seemAtDate.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
  } 
  else {
    // Less than 1 day ago, show hours with am or prm
    displayTime =  seemAtDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return displayTime;
}


const ChatLine = ({ chatline }: { chatline: ChatListDataType }) => {
  const navigate = useNavigate();
  const chatId = chatline?.chat_id;
  const currentChat = useParams<{ id: string }>().id;
  const currentChatAsNumber = parseInt(currentChat!, 10);
  const isActive = currentChatAsNumber == chatId ? 'active-chat' : '';
  const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
  const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id === chatline?.user_id);
  const isOnline = onlineActiveUser ? 'online' : 'offline';
  const isRead = chatline.is_read ? 'seem' : 'unread';
  const isReadText = chatline.is_read ? 'fade-text' : 'unread';
  const last_message = chatline?.last_message.length > 20
  ? `${chatline?.last_message.substring(0, 20)}...`
  : chatline?.last_message;

  const isMe = chatline?.sender_id !== chatline?.user_id;
  const lastMessage = isMe ? 'You: ' + last_message: last_message;

  const MemorizedMessageIcon = useMemo(()=> 
    <div className="w-10 h-10 flex justify-center items-center rounded-full sidebar-item
    ">
      <BiSolidMessageDetail className="animate__animated animate__swing animate__repeat-2 w-5 h-5 text-blue-600"/>
    </div>
  ,[])

  //seem_at is 2023-02-26 13:27:15 and if seem_at is more than 1 day ago, then show date if not show hours
  const lastMessageTime = useMemo(()=>{
   return cutTime(chatline?.seem_at)
  },[chatline?.seem_at]);

  return (
    <div
      onClick={() => navigate(`/chat/${chatId}`)}
      className={`chat-line flex gap-3  py-3 px-10 cursor-pointer ${isActive}`}>
      {/* avatar */}
      <div className={`avatar w-[20%] ${isOnline}`}>
        <div className="w-14 mask mask-squircle">
          <img src={chatline.profile_photo!} />
        </div>
      </div>

      {/* chat */}
      <div className={`chat-message w-[60%] flex flex-col gap-1 ${isReadText}`}>
        <div className={`flex justify-between`}>
          <div className="capitalize">{chatline?.name}</div>
        </div>
        <div className={`text-sm ` + chatline.is_read ? '' : 'font-bold text-white'}>{lastMessage}</div>
      </div>

      {/* time */}
      <div className="chat-time w-[20%] flex flex-col gap-1 justify-center">
        <div className="text-sm">{ isMe  ? lastMessageTime : 
        chatline.is_read ? lastMessageTime : MemorizedMessageIcon
       }
          </div>
        <div className="text-xs">{ chatline?.sender_id === chatline?.user_id ? '' : isRead}</div>
      </div>

    </div>
  )
}

const IsSameChat = ({chatline : prevProps} : {chatline : ChatListDataType} ,{chatline : nextProps} : {chatline : ChatListDataType}  ) => {
  return Object.keys(prevProps).every((key) => {
    console.log('here');
    return prevProps[key as keyof ChatListDataType] === nextProps[key as keyof ChatListDataType]
  })
}

 const MemorizedChatLine = memo(ChatLine, IsSameChat)
 export default MemorizedChatLine
