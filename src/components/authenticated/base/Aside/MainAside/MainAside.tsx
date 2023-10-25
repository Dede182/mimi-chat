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
import { ske } from '@/skeletons/ske'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { TbReload } from '@/utils/helpers/SidebarHelper'
const MainAside = () => {

  const [chatList, setChatList] = useState<Array<ChatListDataType>>([])
  const [page, setPage] = useState<number>(1);
  const token = Cookies.get('token')
  const [loading, setLoading] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<number>(1)
  const fetchChatList = useCallback(async (page: number) => {

    const res = await getChatData(`user/chats/list?page=${page}`, token!)!
    if (res) {
      console.log(res)
      const result = res && res.data.data.data
      ske.chatCount = result.length > 6 ? 6 : result.length;
      localStorage.setItem('ske', JSON.stringify(ske));

      const ordered = result.sort((a: ChatListDataType, b: ChatListDataType) => {
        return sortedByDate({ a, b });
      })
      setLastPage(res.data.data.last_page)
      setChatList((prevMessages) => [...prevMessages, ...ordered])

      setLoading(false);
    }

  }, [token])

  useEffect(() => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleItemAdded = () => {
      setChatList([])
      fetchChatList(page)
    };

    window.addEventListener('newChatAdded', handleItemAdded);
    fetchChatList(page)

    // Clean up event listener when component unmounts
    return () => {
      setLoading(true);
      setChatList([]);
      window.removeEventListener('newChatAdded', handleItemAdded);
    };
  }, [token, page])

  const refresh = useCallback(() => {
    setLoading(true);
    setChatList([])
    fetchChatList(page)
  }, [fetchChatList, page])

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
        id: 5,
        name: 'cast 1',
      },
      {
        id: 6,
        name: 'cast 2',
      },
      {
        id: 7,
        name: 'cast 3',
      },
      {
        id: 8,
        name: 'cast 4',
      },
    ]


  return (
    <div className="animate__animated animate__fadeIn z-50 relative md:max-w-[30vw] h-[100vh]  ">
      <div className="flex flex-col  pt-6  gap-4 h-full">

        <div className="recent-header flex flex-col gap-1 px-10">
          <h3 className="text-3xl font-bold capitalize">{t('recent')}</h3>
          <p className="text-gray-500 capitalize">{t('chat from your friends')}</p>
        </div>

        <ChatHeadSwiper casts={casts} />

        <div id="chatListBody" className="chat-section scroll  overflow-y-scroll h-full">
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

          <div className="flex flex-col mt-8 h-full">
            {loading ?
              <div className="flex px-10 gap-8">
                <Skeleton height={80} baseColor='#96969613' className='w-[80vw] md:w-[24vw]' highlightColor='#6f6e6e13' count={ske.chatCount} />
              </div>
              :
              <>
                {chatList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <h3 className="text-2xl font-bold">{t('No Messages')}</h3>
                    <p className="text-gray-500">{t('Start a new conversation')}</p>
                  </div>
                ) :
                  <InfiniteScroll
                    dataLength={chatList.length}
                    next={loadMore}
                    scrollableTarget="chatListBody"
                    hasMore={lastPage > page}
                    loader={(<div className="w-full text-center ">
                      <BeatLoader color='#1c9dea' loading={true} size={10} />
                    </div>)
                    }
                    refreshFunction={refresh}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                      <div className='w-full text-2xl flex items-center justify-center mb-10 '>
                        <TbReload />
                      </div>
                    }
                    releaseToRefreshContent={
                      <div className='w-full text-2xl flex items-center justify-center mb-10 '>
                        <TbReload />
                      </div>
                    }
                  >
                    {chatList.map((chat, index) => (
                      <MemorizedChatLine key={chat.chat_id || index} chatline={chat} />
                    ))}
                  </InfiniteScroll>

                }
              </>
            }

          </div>
        </div>


      </div>
    </div >

  )
}

export default MainAside