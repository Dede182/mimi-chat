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
import { sortedByDate } from '@/utils/helpers/ChatHelper'
import { BeatLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'


const MainAside = () => {

  const [chatList, setChatList] = useState<Array<ChatListDataType>>([])
  const [page, setPage] = useState<number>(1);
  const token = Cookies.get('token')
  const [loading, setLoading] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<number>(1)

  const fetchChatList = useCallback(async (page: number) => {
    const res = await getChatData(`user/chats/list?page=${page}`, token!)
    console.log(res.data.data);
    const ordered = res.data.data.data.sort((a: ChatListDataType, b: ChatListDataType) => {
      return sortedByDate({ a, b });
    })
    setLastPage(res.data.data.last_page)
    setChatList((prevMessages) => [...prevMessages,...ordered])
  }, [token])
  
  useEffect(() => {
    console.log('chat list run')
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleItemAdded = () => {
      setChatList([])
      fetchChatList(page)
    };

    window.addEventListener('newChatAdded', handleItemAdded);
    fetchChatList(page)

    setLoading(false);
    // Clean up event listener when component unmounts
    return () => {
      setLoading(true);
      window.removeEventListener('newChatAdded', handleItemAdded);
    };
  }, [token,page])

  const loadMore = useCallback(() => {
    const pageNum = page + 1;
    if (lastPage >= pageNum) {
      setPage(pageNum);
      console.log('loadmore run')
    } else {
      return;
    }
  }, [lastPage, page])

  const casts: Array<CastType> =
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
    <div className="animate__animated animate__fadeIn z-50 relative max-w-[30vw]">
      <div className="flex flex-col  pt-6  gap-4 h-[100vh]">

        <div className="recent-header flex flex-col gap-1 px-10">
          <h3 className="text-3xl font-bold capitalize">{t('recent')}</h3>
          <p className="text-gray-500 capitalize">{t('chat from your friends')}</p>
        </div>

        <ChatHeadSwiper casts={casts} />

        <div id="chatListBody" className="chat-section scroll  overflow-y-scroll ">
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
            {loading ? <div className="w-full text-center ">
              <BeatLoader color='#1c9dea' loading={true} size={10} />
            </div> :
              <>

                <InfiniteScroll
                  dataLength={chatList.length}
                  next={loadMore}
                  scrollableTarget="chatListBody"
                  hasMore={lastPage > page}
                  loader={(<div className="w-full text-center ">
                    <BeatLoader color='#1c9dea' loading={true} size={10} />
                  </div>)
                  }>
                  {chatList.map((chat, index) => (
                    <MemorizedChatLine key={chat.chat_id || index} chatline={chat} />
                  ))}
                </InfiniteScroll>

              </>
            }


          </div>
        </div>


      </div>
    </div>

  )
}

export default MainAside