import { t } from 'i18next'
import ChatHeadSwiper from './subs/ChatHeadSwiper'
import { ImSearch } from 'react-icons/im'
import ChatLine from './subs/ChatLine'

const MainAside = () => {

  const casts = {
    cast: [
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
  }
  return (
    <div className="animate__animated animate__fadeIn ">
      <div className="flex flex-col  pt-6 pb-1 gap-4 h-[100vh]">

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
            <div className="chat-cata" data-active="true">{t('chat')}</div>
            <div className="chat-cata">{t('contacts')}</div>
          </div>

          <div className="flex flex-col mt-8">

            <ChatLine />        
            <ChatLine />        
            <ChatLine />        
            <ChatLine />        
            <ChatLine />        
            <ChatLine />        
            <ChatLine />        

          </div>
        </div>


      </div>
    </div>

  )
}

export default MainAside