import { useAppSelector } from "@/app/hooks";
import { selectOnlineActiveUsers } from "@/app/slices/chat/onlineActiveUserSlice";
import { ChatListDataType } from "@/components/authenticated/Chat/types/ChatTypes"
import { memo, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {BiSolidMessageDetail} from 'react-icons/bi'
import { cutString, cutTime } from "../../../../../utils/helpers/ChatHelper";
import { PresenceEchoManager } from "@/components/authenticated/Chat/EchoManager/PresenceEchoManager";
import Cookies from "js-cookie";


const ChatLine = ({ chatline }: { chatline: ChatListDataType }) => {
  const token = Cookies.get('token')
  const navigate = useNavigate();

  const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
  const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id === chatline?.user_id);
  const isOnline = onlineActiveUser ? 'online' : 'offline';
 
  const [chatId] = useState<number>(chatline?.chat_id);
  const currentChat = (parseInt(useParams().id !, 10)) ;
  const [lastMessage,setLastMessage] = useState<string>(chatline?.last_message);
  const [readed,setReaded] = useState<boolean>(!!chatline.is_read);
  const [senderId,setSenderId] = useState<number>(chatline?.sender_id);
  

  const isReadText = readed ? 'fade-text' : 'unread';
 
  const channel = `single.list.${chatId}`;

  const isActive = currentChat == chatId ? 'active-chat' : '';
  const last_message = cutString(lastMessage,20);

  const isMe = senderId != chatline?.user_id;
  const whoSendMessage = isMe ? 'You: ' + last_message: last_message;

  const MemorizedMessageIcon = useMemo(()=> 
    <div className="w-10 h-10 flex justify-center items-center rounded-full sidebar-item
    ">
      <BiSolidMessageDetail className="animate__animated animate__swing animate__repeat-2 w-5 h-5 text-blue-600"/>
    </div>
  ,[])

  //seem_at is 2023-02-26 13:27:15 and if seem_at is more than 1 day ago, then show date if not show hours
  const lastMessageTime = useMemo(()=>{
   return cutTime(chatline?.created_at)
  },[chatline?.created_at]);

  useEffect(() => {
    const channelManager = new PresenceEchoManager(channel, token!)
    channelManager.presenceSubscribe()
      .listen('.messageReceived', (e: any) => {
        setLastMessage(e[0].message);
        currentChat == e[0].single_chat_id ?  setReaded(true) : setReaded(false);
        console.log(e[0].sender_id , chatline?.user_id)
        setSenderId(e[0].sender_id);
      })

    return () => {
      channelManager.presenceUnsubscribe();
      setSenderId(0);
    }
  }, [channel, token])


  const navigateToChat = () => {
    setReaded(true);
    navigate(`/chat/${chatId}`)
  }

  return (
    <div
      onClick={() => navigateToChat()}
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
        <div className={`text-sm ` + readed ? '' : 'font-bold text-white'}>{whoSendMessage}</div>
      </div>

      {/* time */}
      <div className="chat-time w-[20%] flex flex-col gap-1 justify-center">
        <div className={`text-sm ${isReadText}`}>{ 
        isMe ? lastMessageTime  : readed ? lastMessageTime  :   MemorizedMessageIcon 
       }
          </div>
        <div className="text-xs">{ senderId == chatline?.user_id ? '' : readed}</div>
      </div>

    </div>
  )
}

const IsSameChat = ({chatline : prevProps} : {chatline : ChatListDataType} ,{chatline : nextProps} : {chatline : ChatListDataType}  ) => {
  return Object.keys(prevProps).every((key) => {
    return prevProps[key as keyof ChatListDataType] === nextProps[key as keyof ChatListDataType]
  })
}

 const MemorizedChatLine = memo(ChatLine, IsSameChat)
 export default MemorizedChatLine
