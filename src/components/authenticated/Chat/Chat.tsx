
import './styles.scss'
import { BiArrowBack } from '@/utils/helpers/SidebarHelper'
import {  useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MemorizedChatMessageLine, InfiniteScroll } from '@/components/authenticated/Chat/ChatIndex';
import Cookies from 'js-cookie';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatMessageDatatType, ExpectedErrorType, FriendType } from './types/ChatTypes';
import { getChatData, updateLastMessage } from '@/api/generals/ChatList';
import { useAppSelector } from '@/app/hooks';
import { selectUser, selectOnlineActiveUsers } from '@/app/slices/slices';
import { BeatLoader } from "react-spinners";
import { groupByDate } from '@/utils/helpers/ChatHelper';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AuthUser } from '@/@types/users';
import ChatSendMessage from './ChatSendMessage';
import ChatFile from './ChatFile/ChatFile';
import { AxiosError, AxiosResponse } from 'axios';
import ErrorPage from '@/components/Error/Error';
const Chat = () => {

  const [messages, setMessages] = useState<ChatMessageDatatType[]>([]);
  const [friend, setFriend] = useState<FriendType>();
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentChatId, setCurrentChatId] = useState<string>();
  const [typing, setTyping] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errors, setErrors] = useState<ExpectedErrorType>();
  const token = Cookies.get('token');
  const params = useParams();
  const chatId = params['id'];
  const channel = `single.chat.${chatId}`;
  const onlineActiveUserSlice = useAppSelector(selectOnlineActiveUsers);
  const onlineActiveUser = onlineActiveUserSlice.find((user) => user.id == friend?.id);
  const isOnline = onlineActiveUser ? 'online' : 'offline';
  const user = useAppSelector<AuthUser | null>(selectUser);
  const chatPrefix = useRef<number>(0);
 
  const backIcon = useMemo(() => {
    return <BiArrowBack />
  }, [])

  const navigate = useNavigate();

  const channelManager = useMemo(() => {
    return new PresenceEchoManager(channel, token!)
  }, [channel, token])

  const subscribe = useCallback(() => {
    return channelManager.presenceSubscribe(
      () => {
        if(user &&(friend?.id != user!.id)){
          updateLastMessage(chatId!)
        }
      }
    )
  }, [channelManager, chatId, friend?.id, user]);

  useEffect(() => {
    setLoading(true);
    setMessages([]);
    setPage(1);
    fetchChatList(1)
    setCurrentChatId(chatId!);
    return () => {
      setMessages([]);
      setCurrentChatId(undefined);
    }
  }, [chatId, token])


  const fetchChatList = useCallback(async (pageNum: number) => {

    const url = `user/chats/messages/${chatId}?page=${pageNum}`;
    const res = await getChatData(url, token!) as AxiosResponse
    if(res instanceof AxiosError && res.response)
    {
      console.log(res);
      setIsError(true);
      setLoading(false);
      const errorStatus = res.response.status as number;
      const errorMessage = res.response.data.message as string;
      setErrors({ status: errorStatus, message: errorMessage });
      return;
    }
    const reversed = res.data.data.chatMessages.data;
    chatPrefix.current = res.data.data.chat_prefix;
    setLastPage(res.data.data.chatMessages.last_page)
    setMessages((prevMessages) => [...prevMessages, ...reversed]);
    setFriend(res.data.data.friend.user)
    setLoading(false);
    return () => {
      setMessages([]);
      setLoading(true);
      setIsError(false);
    }
  }, [chatId, currentChatId, token])
  //memorize the icons
 
  // Usage
  useEffect(() => {
    subscribe()
      .joining((user: any) => {
        console.log(user.name + 'joining');

      })
      .leaving((user: any) => {
        console.log(user)
      })
      .listen('.messageReceived', (e: any) => {
        console.log('message receieved from chat', e)
        setMessages((prev) => [e[0], ...prev])
        setTyping(false);
      })
      .listenForWhisper('startTyping', () => {
        setTyping(true);
      })
      .listenForWhisper('stopTyping', () => {
        setTyping(false);
      })

    return () => {
      channelManager.presenceUnsubscribe();
      setTyping(false);
    }

  }, [channel, token, channelManager])

  const loadMore = useCallback(() => {
    const pageNum = page + 1;
    if (lastPage >= pageNum) {
      setPage(pageNum);
      fetchChatList(pageNum);
    } else {
      return;
    }

    return () => {
      setPage(1);
    }

  }, [lastPage, page])

  const groupedMessages = groupByDate(messages);

  const messageElements = Object.keys(groupedMessages)
    .sort((a, b) => b.localeCompare(a))
    .map((date, index) => {
      const messagesForDate = groupedMessages[date];
      const messageText = messagesForDate.map((message: any) => (
        <MemorizedChatMessageLine key={`chat_${chatId}` + message.id} message={message} />
      ))
      return (
        <div key={index} className='flex flex-col-reverse'>
          {messageText}
          <div key={date} className='date'>
            <span>{date}</span>
          </div>
        </div>);
    });

  return (
    <div className="chat-bg flex flex-col justify-between transition-all ">
      
      {
        isError ? <ErrorPage errors={errors !} /> :
       (
        <>
         <div className="w-full h-[85%] md:px-12 md:pt-10 ">
        <div className="h-full flex flex-col gap-4 ">
          {loading ?
            <div>
              <Skeleton width={"100%"} height={"6rem"} baseColor='#b2aeae33' highlightColor='#6f6e6e13' />
            </div>
            :
            <div className="chat-banner h-full w-full flex items-center gap-6 py-6 ">
              <button onClick={() => navigate('/aside')} className="sidebar-item  w-10 h-10 z-20 md:hidden"  >
                <span >{backIcon}</span>
              </button>
              <div className={`avatar indicator ${isOnline}`}>
                {
                  typing && <span className="indicator-item indicator-bottom badge badge-primary">typing…</span>
                }
                <div className="w-14 mask mask-squircle">
                  <img src={friend?.profile_photo} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold">{friend?.name}</h1>
                <p className="text-sm fade-text">{friend?.email}</p>
              </div>
            </div>}

          <div id="chatBody" className="chatBody flex flex-col-reverse scroll h-[100vh] overflow-y-scroll px-7 md:px-0 pb-8 md:pb-0">

            {/* chat start */}

            {loading ? <div className="w-full text-center ">
              <BeatLoader color='#1c9dea' loading={true} size={10} />
            </div> :
              <>

                <InfiniteScroll
                  dataLength={messages.length}
                  next={loadMore}
                  style={{ display: 'flex', flexDirection: 'column-reverse' }}
                  scrollableTarget="chatBody"
                  hasMore={lastPage > page}
                  inverse={true}
                  loader={(<div className="w-full text-center ">
                    <BeatLoader color='#1c9dea' loading={true} size={10} />
                  </div>)
                  }>
                  {
                    messageElements
                  }
                </InfiniteScroll>

              </>
            }
          </div>
        </div>
      </div>
            <ChatSendMessage chatPrefix={chatPrefix} channelManager={channelManager} chatId={chatId} user={user} subscribe={subscribe} />
            <ChatFile />
        </>
       )
      }
    </div>
  )
}

export default Chat