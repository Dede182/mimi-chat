
import './styles.scss'
// import { PublicEchoManager } from "./EchoManager/PublicEchoManager";
import { LuSticker } from 'react-icons/lu'
import { HiPlus } from 'react-icons/hi'
import { BsEmojiLaughing, BsFillSendFill } from 'react-icons/bs'
import { MemoizedChatBtnCircle } from './ChatBtnCircle';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MemorizedChatMessageLine from './ChatMessageLine';
import Cookies from 'js-cookie';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
import { useParams } from 'react-router-dom';
import { ChatMessageDatatType } from './types/ChatTypes';
import { getChatData, sendEventMessage, updateLastMessage } from '@/api/generals/ChatList';
import { useAppSelector } from '@/app/hooks';
import { selectOnlineActiveUsers } from '@/app/slices/chat/onlineActiveUserSlice';
import { selectUser } from '@/app/slices/auth/UserSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BeatLoader } from "react-spinners";

interface FriendType {
  name: string,
  email: string,
  profile_photo: string,
  isActive: boolean,
}

const Chat = () => {

  const [messages, setMessages] = useState<ChatMessageDatatType[]>([]);
  const [friend, setFriend] = useState<FriendType>();
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentChatId , setCurrentChatId] = useState<string>();
  const token = Cookies.get('token');
  const params = useParams();
  const chatId = params['id'];
  const channel = `single.chat.${chatId}`;
  const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
  const onlineActiveUser = onlineActiveUserSlice.find((user) => user.name == friend?.name);
  const isOnline = onlineActiveUser ? 'online' : 'offline';
  const user = useAppSelector(selectUser);
  const chatPrefix = useRef(0);
  const {
    register,
    reset,
    handleSubmit,
  } = useForm<any>();

  const onSubmit = (data: any) => {
    sendMessage(data.message)
  }

  useEffect(() => {
    setCurrentChatId(chatId);
    setMessages([]);
    setPage(1);
    
    return ()=>{
      setCurrentChatId(undefined);
    }
  },[chatId, currentChatId])

  const fetchChatList = useCallback(async (pageNum: number) => {
    const url = `user/chats/messages/${chatId}?page=${pageNum}`;
    const res = await getChatData(url, token!)
    //reverse the chat messages
    const reversed = res.data.data.chatMessages.data;
    chatPrefix.current = res.data.data.chat_prefix;
  
    setLastPage(res.data.data.chatMessages.last_page)
    setMessages((prevMessages) => [...prevMessages, ...reversed]);
    
    setFriend(res.data.data.friend.user)
    setLoading(false);

    return ()=>{
      setMessages([]);
    }

  }, [chatId, currentChatId, token])
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
    console.log('channel run ')
    channelManager.presenceSubscribe(
      () => {
        updateLastMessage(chatId!);
      }
    )
      .joining((user: any) => {
        console.log(user.name + 'joining');

      })
      .leaving((user: any) => {
        console.log(user)
      })
      .listen('.messageReceived', (e: any) => {
        console.log(e)
        setMessages((prev) => [e[0], ...prev])
        reset();
      })

  }, [channel, token, chatId])


  useEffect(() => {
    console.log('chat Id' + chatId + ' page run',[messages])
    fetchChatList(page)
    setCurrentChatId(chatId !);
  }, [chatId, token])


  const sendMessage = (message: string) => {
    sendEventMessage(message, user!.id, chatId!, chatPrefix.current)
  }
  // scroll to whole bottom
  // useEffect(() => {
  //   const chatBody = document.querySelector('.chatBody');

  //   chatBody?.scrollTo(0, chatBody.scrollHeight)
  // }, [messages])

  const loadMore = useCallback(() => {
    const pageNum = page + 1;
    if (lastPage >= pageNum) {
      setPage(pageNum);
      console.log('b run')
    } else {
      return;
    }
  }, [lastPage, page])

  return (
    <div className="chat-bg flex flex-col justify-between transition-all">

      <div className="w-full h-[85%] px-12 pt-10 ">
        <div className="h-full flex flex-col gap-4 ">

          <div className="chat-banner h-full w-full flex items-center gap-6">
            <div className={`avatar ${isOnline}`}>
              <div className="w-14 mask mask-squircle">
                <img src={friend?.profile_photo} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold">{friend?.name}</h1>
              <p className="text-sm fade-text">{friend?.email}</p>
            </div>
          </div>

          <div id="chatBody" className="chatBody flex flex-col-reverse scroll h-[100vh] overflow-y-scroll ">

            {/* chat start */}

            {loading ? <p>loadiing</p> :
              <>
                <InfiniteScroll
                  dataLength={messages.length}
                  next={loadMore}
                  style={{ display: 'flex', flexDirection: 'column-reverse' }}
                  scrollableTarget="chatBody"
                  hasMore={lastPage >= page}
                  inverse={true}
                  loader={lastPage >= page ? (
                    <div className="w-full text-center ">
                      <BeatLoader color='blue' loading={true} size={10} />
                    </div>

                  ) : <div></div>
                  }>
                    
                  {
                  messages.map((message) => (
                    <>
                    <MemorizedChatMessageLine key={ `chat_${chatId}` + message.id } message={message} />

                    </>
                  ))
                  }
                </InfiniteScroll>


              </>
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


          {/* <textarea
            {...register('message')}
            placeholder='Write your Message' className="w-3/6 resize-none scroll pb-0 rounded-full focus:outline-none focus:ring-transparent bg-transparent border-none px-4" ></textarea> */}

          <input type='text'
            {...register('message')}
            placeholder='Write your Message' className="w-3/6 resize-none scroll pb-0 rounded-full focus:outline-none focus:ring-transparent bg-transparent border-none px-4" />

          <div className="w-1/6">

            <MemoizedChatBtnCircle type='submit' icon={icons.send} />

          </div>

        </form>

      </div>
    </div>
  )
}

export default Chat