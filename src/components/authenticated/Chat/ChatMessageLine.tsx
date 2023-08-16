import { AuthUser } from '@/@types/users';
import { useAppSelector } from '@/app/hooks'
import { selectUser } from '@/app/slices/auth/UserSlice';
import { memo } from 'react';
export type MessageType = {
    message: string,
    user : AuthUser,
}


const ChatMessageLine = ({message } : {message : MessageType}) => {

    const authUser = useAppSelector(selectUser) as AuthUser | null;

    const whoSend = message.user?.id == authUser?.id ? 'chat-end' : 'chat-start';

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
  prevProps: Readonly<{ message: MessageType }>,
  nextProps: Readonly<{ message: MessageType }>
) => {
  return (
    prevProps.message.message === nextProps.message.message &&
    prevProps.message.user === nextProps.message.user
  );
};

const MemorizedChatMessageLine = memo(ChatMessageLine , isSameMessage)

export default MemorizedChatMessageLine