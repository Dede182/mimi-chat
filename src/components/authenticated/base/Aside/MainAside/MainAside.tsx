import { t } from 'i18next'
import ChatHeadSwiper from '../subs/ChatHeadSwiper'
import { ImSearch } from 'react-icons/im'

import { CastType } from '../subs/ChatHeadSwiperItem'
import { ChatListDataType } from '../../../Chat/types/ChatTypes'
import { useCallback, useEffect, useState } from 'react'
import { getChatData } from '@/api/generals/ChatList'
import Cookies from 'js-cookie'
import MemorizedChatLine from '../subs/ChatLine'
import AddChat from './AddChat'


const MainAside = () => {

  const [chatList, setChatList] = useState<Array<ChatListDataType>>([])
  const token = Cookies.get('token')

  const fetchChatList = useCallback(async () => {
    const res = await getChatData('user/chats/list',token!)
    const ordered = res.data.data.sort((a : any,b : any) => {
  
      if (a.is_read !== b.is_read) {
        // Sort unread messages first (unread before read)
        return a.is_read - b.is_read ;
      } else if (a.is_read === 0) {
        // If both messages are unread, sort by created_at in descending order
        const aCreatedAt = new Date(a.created_at);
        const bCreatedAt = new Date(b.created_at);
        return bCreatedAt.getTime() - aCreatedAt.getTime();
      } else {
        // If both messages are read, sort by created_at in descending order
        const aCreatedAt = new Date(a.created_at);
        const bCreatedAt = new Date(b.created_at);
        return bCreatedAt.getTime() - aCreatedAt.getTime();
      }
    })
    setChatList(ordered)
  },[token])

  useEffect(() => {
    console.log('chat list run')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleItemAdded = (event : any) => {
      fetchChatList()

    };

    window.addEventListener('newChatAdded', handleItemAdded);
    fetchChatList()
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('newChatAdded', handleItemAdded);
    };
  }, [token])


  const casts : Array<CastType> = 
   [
      {
        id: 1,
        name: 'cast 1',
      },
      {
        id: 2,
        name: 'cast 2',
      },
      {
        id: 3,
        name: 'cast 3',
      },
      {
        id: 4,
        name: 'cast 4',
      },
      {
        id: 1,
        name: 'cast 1',
      },
      {
        id: 2,
        name: 'cast 2',
      },
      {
        id: 3,
        name: 'cast 3',
      },
      {
        id: 4,
        name: 'cast 4',
      },
    ]
  
  return (
    <div className="animate__animated animate__fadeIn z-50 relative">
      <div className="flex flex-col  pt-6  gap-4 h-[100vh]">

        <div className="recent-header flex flex-col gap-1 px-10">
          <h3 className="text-3xl font-bold capitalize">{t('recent')}</h3>
          <p className="text-gray-500 capitalize">{t('chat from your friends')}</p>
        </div>

        <ChatHeadSwiper casts={casts} />

        <div className="chat-section scroll  overflow-auto hover:overflow-y-scroll ">
          <div className="flex justify-between px-10 mb-4">
            <div className="recent-header flex flex-col gap-1">
              <h3 className="text-2xl font-bold capitalize">{t('chat')}</h3>
              <p className="text-gray-500 capitalize">{t('Your conservations')}</p>
            </div>

            <div className="">
              <button className="sidebar-item  w-10 h-10 z-20"  >
                <span className="sidebar-icon">
                  <ImSearch />
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-between px-10">
            <button className="chat-cata" data-active="true">{t('chat')}</button>
            <AddChat />
          </div>

          <div className="flex flex-col mt-8">

            {chatList.map((chat,index) => (
              <MemorizedChatLine key={chat.chat_id || index} chatline={chat} />
            ))}      

          </div>
        </div>


      </div>
    </div>

  )
}

export default MainAside