
import './styles.scss'
// import { PublicEchoManager } from "./EchoManager/PublicEchoManager";
import { LuSticker } from 'react-icons/lu'
import { HiPlus } from 'react-icons/hi'
import { BsEmojiLaughing, BsFillSendFill } from 'react-icons/bs'
import { MemoizedChatBtnCircle } from './ChatBtnCircle';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import MemorizedChatMessageLine from './ChatMessageLine';
import Cookies from 'js-cookie';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
import { useParams } from 'react-router-dom';
import { ChatMessageDatatType } from './types/ChatTypes';
import { getChatData } from '@/api/generals/ChatList';
import { useAppSelector } from '@/app/hooks';
import { selectOnlineActiveUsers } from '@/app/slices/chat/onlineActiveUserSlice';

interface FriendType {
  name: string,
  email: string,
  profile_photo: string,
  isActive: boolean,
}

const Chat = () => {

  const [messages, setMessages] = useState<ChatMessageDatatType[]>([]);
  const [friend, setFriend] = useState<FriendType>();
  const token = Cookies.get('token');
  const params = useParams();
  const chatId = params['id'];
  const channel = `single.chat.${chatId}`;
  const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
  const onlineActiveUser = onlineActiveUserSlice.find((user) => user.name == friend?.name);
  const isOnline = onlineActiveUser ? 'online' : 'offline';

  const {
    register,
    handleSubmit,
  } = useForm<any>();

  const onSubmit = (data: any) => {
    sendMessage(data.message)
  }

  //memorize the icons
  const icons = useMemo(() => {
    return {
      sticker: <LuSticker />,
      emoji: <BsEmojiLaughing />,
      plus: <HiPlus />,
      send: <BsFillSendFill />
    }
  }, [])
  // Usage
  useEffect(() => {
    const channelManager = new PresenceEchoManager(channel, token!)

    channelManager.presenceSubscribe()
      .joining((user: any) => {

        console.log(user.name + 'joining');
      })
      .leaving((user: any) => {
        console.log(user)
      })

  }, [channel, messages, token, chatId])

  useEffect(() => {
    const fetchChatList = async () => {
      const res = await getChatData(`user/chats/messages/${chatId}`, token!)
      setMessages(res.data.data.chatMessages.data)
      setFriend(res.data.data.friend.user)

    }
    fetchChatList()
  }, [chatId, token])


  const sendMessage = (message: string) => {
    console.log(message);
    // channelManager.sendMessage(message,user.id)
  }


  return (
    <div className="chat-bg flex flex-col justify-between transition-all">

      <div className="w-full h-[85%] px-12 pt-10 ">
        <div className="h-full flex flex-col gap-4 ">

          <div className="chat-banner h-full w-full ">
            <div className={`avatar ${isOnline}`}>
              <div className="w-14 mask mask-squircle">
                <img src={friend?.profile_photo} />
              </div>
            </div>
          </div>

          <div className="chatBody scroll h-full overflow-y-scroll">

            {/* chat start */}

            {messages.length != 0 ?
              messages.map((message: ChatMessageDatatType, index) => (
                <MemorizedChatMessageLine key={index} message={message} />
              )) : <p>Start a chat</p>
            }
          </div>
        </div>
      </div>

      <div className="chat-input w-full h-[10%] ">

        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-evenly  h-full gap-2">

          <div className="w-2/6 flex justify-evenly">
            <MemoizedChatBtnCircle icon={icons.sticker} />
            <MemoizedChatBtnCircle icon={icons.emoji} />
            <MemoizedChatBtnCircle icon={icons.plus} />
          </div>


          <textarea
            {...register('message')}
            placeholder='Write your Message' className="w-3/6 resize-none scroll pb-0 rounded-full focus:outline-none focus:ring-transparent bg-transparent border-none px-4" ></textarea>

          <div className="w-1/6">

            <MemoizedChatBtnCircle type='submit' icon={icons.send} />

          </div>

        </form>

      </div>
    </div>
  )
}

export default Chat