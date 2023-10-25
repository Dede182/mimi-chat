import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import CloseBtn from '@/components/tools/CloseBtn'
import GroupChatLine from './GroupChatLine'
import Skeleton from 'react-loading-skeleton'

import './style.scss';
const AddGroupChat = React.lazy(() => import('./AddGroupChat'));
const GroupChat = () => {
  const [loading,setLoading] = useState<boolean>(true);
  const [skeCount,setSkeCount] = useState<number>(3);
  useEffect(() => { 
    const count : number = parseInt(localStorage.getItem('gskechatCount')?? '3') ;
    setSkeCount(count);
    setTimeout(() => {
      setLoading(false);
    },1300);
  
  },[]);
  const render = loading ? (
    <div className="flex px-10 gap-8">
                <Skeleton height={80} baseColor='#96969613' className='w-[80vw] md:w-[24vw]' highlightColor='#6f6e6e13' count={skeCount} />
              </div>
  ) : 
  (
    <>
    <GroupChatLine />
    <GroupChatLine />
    <GroupChatLine />
    </>
  )


  return (
    <div className="animate__animated animate__fadeIn  relative  z-[200]">
      <div className="py-5">

        <div className="flex flex-col ">
          <div className="flex justify-between items-center px-10 mb-10">
            <h3 className="text-2xl font-bold capitalize">{t('Group Chats')}</h3>

            <div className="flex gap-4">
              <AddGroupChat />
              <CloseBtn />
            </div>
          </div>

         
          <div className="favorites-body  h-[87vh] scroll overflow-y-scroll">
           
            {render}
          </div>

        </div>


      </div>
    </div>
  )
}

export default GroupChat