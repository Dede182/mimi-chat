
import './styles.scss'
// import { PublicEchoManager } from "./EchoManager/PublicEchoManager";
import {LuSticker} from 'react-icons/lu'
import { HiPlus } from 'react-icons/hi'
import { BsEmojiLaughing,BsFillSendFill } from 'react-icons/bs'
import { MemoizedChatBtnCircle } from './ChatBtnCircle';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';

import { AuthUser } from '@/@types/users';
import MemorizedChatMessageLine, { MessageType } from './ChatMessageLine';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/slices/auth/UserSlice';
import Cookies from 'js-cookie';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
const Chat = () => {

  const [messages, setMessages] = useState<MessageType[]>([]);
  const user = useAppSelector(selectUser)  as AuthUser;
  const token = Cookies.get('token');
  console.log("🚀 ~ file: ddChat.tsx:s21 ~ Chat ~ token:", token)

  const {
    register,
    handleSubmit,
  } = useForm<any>();

  const onSubmit = (data: any) => {
    
    sendMessage(data.message)
  }

  const channelManager = useMemo(() => new PresenceEchoManager('presence.chat.1',token !), [token])
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
    channelManager.presenceSubscribe(() => {
      console.log('Subscribed tso channel');
    })
      .listen('.test', (e: any) => {
        console.log('listen')
        setMessages((prevMessages) => [...prevMessages, e])
        console.log(messages)
      })
  
      console.log(messages)
  
  }, [channelManager])
 
  const sendMessage = (message : string) => {
    channelManager.sendMessage(message,user.id)
  }


  return (
    <div className="chat-bg flex flex-col justify-between transition-all">

      <div className="w-full h-[85%] px-12 pt-10 ">
        <div className="h-full flex flex-col gap-4 ">

          <div className="chat-banner h-full w-full ">
            <div className="avatar w-[20%]">
              <div className="w-14 mask mask-squircle">
                <img src={`https://i.pravatar.cc/250?img=26`} />
              </div>
            </div>
          </div>

          <div className="chatBody scroll h-full overflow-y-scroll">

            {/* chat start */}
             {
                messages.map((message : MessageType,index) => (
                  <MemorizedChatMessageLine key={index} message={message} />
                ))
             }
          </div>
        </div>
      </div>

      <div className="chat-input w-full h-[10%] ">
     
        <form onSubmit={handleSubmit(onSubmit)}  className="flex items-center justify-evenly  h-full gap-2">
            
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