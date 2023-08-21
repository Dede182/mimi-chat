import { AuthUser } from '@/@types/users';
import { useAppSelector } from '@/app/hooks'
import { selectUser } from '@/app/slices/auth/UserSlice';
import { memo, useMemo } from 'react';
import { ChatMessageDatatType } from './types/ChatTypes';
import { toHour } from '../base/Aside/subs/ChatHelper';

// interface InlineChatMessage extends ChatMessageDatatType {
//   isRead : boolean
// } 

const ChatMessageLine = ({message } : {message : ChatMessageDatatType}) => {

    const memorizedMessage = useMemo(() => message , [message]);
    const authUser = useAppSelector(selectUser) as AuthUser | null;

    const whoSend = message.sender_id == authUser?.id ? 'chat-end' : 'chat-start';
    const messageHour = toHour(memorizedMessage.created_at);
    const chatMessage = ( <div className={`chat ${whoSend}`}>

    <div className="chat-header">
      {/* <time className="text-xs opacity-50">12:46</time> */}
    </div>
    <div className="chat-bubble flex gap-3 items-center justify-center relative">
      <p>{memorizedMessage.message}</p>
      <span className='messageHour self-end'>{messageHour}</span>
    </div>
    <div className="chat-footer opacity-50">
      {/* <p>{memorizedMessage.isRead ? 'seem' : 'unread'}</p> */}
    </div>
  </div>)

  return chatMessage
}


const isSameMessage = ({message : prevProps} : {message : ChatMessageDatatType} ,{message : nextProps} : {message : ChatMessageDatatType}  ) => {
  return Object.keys(prevProps).every((key) => {
 
    return prevProps[key as keyof ChatMessageDatatType] == nextProps[key as keyof ChatMessageDatatType]
  })
}

const MemorizedChatMessageLine = memo(ChatMessageLine , isSameMessage)

export default MemorizedChatMessageLine