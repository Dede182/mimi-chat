import { AuthUser } from '@/@types/users';
import { useAppSelector } from '@/app/hooks'
import { selectUser } from '@/app/slices/auth/UserSlice';
import { memo, useMemo } from 'react';
import { ChatMessageDatatType } from './types/ChatTypes';
import { toHour } from '../../../utils/helpers/ChatHelper';
import ChattMessageImage from './ChattMessageImage';

enum MessageType {
  TEXT = 'text',
  FIlE = 'file',
}

const ChatMessageLine = ({ message }: { message: ChatMessageDatatType }) => {

  const memorizedMessage = useMemo(() => message, [message]);
  const authUser = useAppSelector(selectUser) as AuthUser | null;

  const whoSend = message.sender_id == authUser?.id ? 'chat-end' : 'chat-start';
  const messageHour = toHour(memorizedMessage.created_at);


  const CheckType = () => {
    if (memorizedMessage.message_type == MessageType.TEXT) {
      return (<div className="chat-bubble flex gap-3 items-center justify-center relative">
        <p>{memorizedMessage.message}</p>
        <span className='messageHour self-end'>{messageHour}</span>
      </div>)
    }
    if (memorizedMessage.message_type == MessageType.FIlE) {
      return <ChattMessageImage images={memorizedMessage.file_path} />
    }
    return <p>{memorizedMessage.message}</p>
  };


  const chatMessage = (<div className={`chat ${whoSend}`}>
    <div className="chat-header">
      {/* <time className="text-xs opacity-50">12:46</time> */}
    </div>
        <CheckType /> 
    <div className="chat-footer opacity-50">
      {/* <p>{memorizedMessage.isRead ? 'seem' : 'unread'}</p> */}
    </div>
  </div>)

  return chatMessage
}


const isSameMessage = ({ message: prevProps }: { message: ChatMessageDatatType }, { message: nextProps }: { message: ChatMessageDatatType }) => {
  return Object.keys(prevProps).every((key) => {

    return prevProps[key as keyof ChatMessageDatatType] == nextProps[key as keyof ChatMessageDatatType]
  })
}

const MemorizedChatMessageLine = memo(ChatMessageLine, isSameMessage)

export default MemorizedChatMessageLine