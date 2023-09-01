import React, { createRef, useCallback, useMemo, useState } from 'react'
import FileInput from './FileInput/FileInput'
import { LuSticker, HiPlus, BsEmojiLaughing, BsFillSendFill,  } from '@/utils/helpers/SidebarHelper'
import { MemoizedChatBtnCircle } from '@/components/authenticated/Chat/ChatIndex';
import { debounce } from "lodash"
import { sendEventMessage } from '@/api/generals/ChatList';
import { AuthUser } from '@/@types/users';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
import { PresenceChannel } from 'laravel-echo';
import { alertToast } from '@/components/tools/Toast/AlertToast';
import { AxiosError } from 'axios';
import EmojiBox from './EmojiInput/EmojiBox';
interface Props {
    chatId: string | undefined;
    user:  AuthUser | null;
    channelManager: PresenceEchoManager;
    chatPrefix: React.MutableRefObject<number>
    subscribe: () => PresenceChannel;
}
const ChatSendMessage = ({chatId,user,chatPrefix,subscribe} : Props) => {

    const textArea = createRef<HTMLTextAreaElement>();
    const [textMessage, setTextMessage] = useState<string>('');
    const formRef = createRef<HTMLFormElement>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [fall, setFall] = React.useState<any[]>([]);
    const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault(); // Prevent newline
            formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const messageOnChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextMessage(event.target.value);
      }, []);

    const onSubmit = useCallback(
       async () => {
              if(!loading)
              {
                setLoading(true);
                setFall([]);
                const messages = textMessage;
                const res = await sendEventMessage(messages !, user!.id, chatId!, chatPrefix.current,'text')
                if(res instanceof AxiosError){
                  res.response && setFall([res.response.data]);
                }
                else if(res && res.status === 200  ){
                  setTextMessage(()=> '');
                }
                setLoading(false);
              }
              },
        [loading, textMessage, user, chatId, chatPrefix]
      );

    if(fall.length > 0){
      alertToast({icon: 'error', title: fall[0].message})
      setFall([])
    }

    const formSubmit = useCallback(() => {
        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, [formRef]);

  const handleClick = useCallback(()=> debounce(formSubmit, 200)(), [formSubmit]);

    const icons = useMemo(() => {
        return {
          sticker: <LuSticker />,
          emoji: <BsEmojiLaughing />,
          plus: <HiPlus />,
          send: <BsFillSendFill />
        }
      }, [])

    const isTyping = useCallback(() => {
        if (textMessage && textMessage.length > 0) {
          subscribe()
            .whisper('startTyping', {
              name: user!.name,
            })
        }
        else{
          subscribe()
            .whisper('stopTyping', {
              name: user!.name,
            })
        }
      }, [subscribe, textMessage, user])

    return (
        <div className="chat-input w-full h-[10%] fixed bottom-0 md:relative ">

            <div className="flex items-center justify-evenly  h-full gap-2">

                <form ref={formRef} onSubmit={onSubmit} id="sendMessageForm"  className='hidden'>

                </form>
                <div className="w-2/6 flex justify-evenly">
                    {/* <MemoizedChatBtnCircle icon={icons.sticker} /> */}
                    <EmojiBox icon={icons.emoji} textMessage={textMessage}  setTextMessage={setTextMessage} textArea={textArea}/>
                    <FileInput icon={icons.plus} user={user} chatId={chatId !} chatPrefix={chatPrefix} />
                </div>

                <textarea
                    form='sendMessageForm'
                    ref={textArea}
                    placeholder='Write your Message'
                    onKeyUp={isTyping}
                    onKeyDown={handleTextareaKeyDown}
                    onChange={messageOnChange}
                    value={textMessage}
                    className="w-3/6 resize-none scroll pt-5 break-words rounded-full focus:outline-none focus:ring-transparent bg-transparent border-none px-4"
                    required
                    ></textarea>

                <div className="w-1/6">

                    <MemoizedChatBtnCircle type='button' form="sendMessageForm" loading={loading} clickFn={handleClick} icon={icons.send}  />

                </div>

            </div>
            

        </div>
    )
}

export default ChatSendMessage