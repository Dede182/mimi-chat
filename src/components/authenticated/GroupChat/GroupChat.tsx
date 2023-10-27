import React, { useMemo, useRef, useState } from 'react'
import { ExpectedErrorType } from '../Chat/types/ChatTypes';
import ErrorPage from '@/components/Error/Error';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from '@/utils/helpers/SidebarHelper'
import { BeatLoader } from "react-spinners";
import InfiniteScroll from 'react-infinite-scroll-component';
// import ChatSendMessage from '../Chat/ChatSendMessage';
import { useAppSelector } from '@/app/hooks';
import { AuthUser } from '@/@types/users';
import { selectUser } from '@/app/slices/slices';


const GroupChat = () => {

  const [errors, setErrors] = useState<ExpectedErrorType>();
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const backIcon = useMemo(() => {
    return <BiArrowBack />
  }, [])

  const loadMore = () =>{

  }


  const coverPhoto = "https://i2.wp.com/s3.amazonaws.com/laracasts/images/forum/avatars/default-avatar-2.png?ssl=1";

  return (
    <div className="chat-bg flex flex-col justify-between transition-all">
        {
             isError ? <ErrorPage errors={errors !} /> :
             (
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
                          <div className={`avatar indicator`}>
                            <div className="w-14 mask mask-squircle">
                              <img src={coverPhoto}/>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <h1 className="text-lg font-bold">XOS</h1>
                            <p className="text-sm fade-text">4 members</p>
                          </div>
                        </div>}
            
                      <div id="chatBody" className="chatBody flex flex-col-reverse scroll h-[100vh] overflow-y-scroll px-7 md:px-0 pb-8 md:pb-0">
            
                        {/* chat start */}
            
                        {loading ? <div className="w-full text-center ">
                          <BeatLoader color='#1c9dea' loading={true} size={10} />
                        </div> :
                          <>
            
                            <InfiniteScroll
                              dataLength={20}
                              next={loadMore}
                              style={{ display: 'flex', flexDirection: 'column-reverse' }}
                              scrollableTarget="chatBody"
                              hasMore={false}
                              inverse={true}
                              loader={(<div className="w-full text-center ">
                                <BeatLoader color='#1c9dea' loading={true} size={10} />
                              </div>)
                              }>
                              {
                                <p></p>
                              }
                            </InfiniteScroll>
            
                          </>
                        }
                      </div>
                    </div>
                  </div>
                        {/* <ChatSendMessage chatPrefix={chatPrefix} chatId={chatId} user={user}  /> */}
                        {/* <ChatFile /> */}
                    </>
                   )
             )
        }
    </div>
  )
}

export default GroupChat