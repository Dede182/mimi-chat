import { AuthUser } from '@/@types/users';
import { useAppSelector } from '@/app/hooks'
import { selectUser } from '@/app/slices/auth/UserSlice';
import { memo } from 'react';
import { ChatMessageDatatType } from './types/ChatTypes';


const ChatMessageLine = ({message } : {message : ChatMessageDatatType}) => {

    const authUser = useAppSelector(selectUser) as AuthUser | null;

    const whoSend = message.sender_id == authUser?.id ? 'chat-end' : 'chat-start';

    const chatMessage = ( <div className={`chat ${whoSend}`}>

    <div className="chat-header">
      Anakin
      <time className="text-xs opacity-50">12:46</time>
    </div>
    <div className="chat-bubble">{message?.message}</div>
    <div className="chat-footer opacity-50">
      Seen at 12:46
    </div>
  </div>)

  return chatMessage
}

const isSameMessage = (
  prevProps: Readonly<{ message: ChatMessageDatatType }>,
  nextProps: Readonly<{ message: ChatMessageDatatType }>
) => {
  return (
    prevProps.message.message === nextProps.message.message &&
    prevProps.message.sender_id === nextProps.message.sender_id
  );
};

const MemorizedChatMessageLine = memo(ChatMessageLine , isSameMessage)

export default MemorizedChatMessageLine