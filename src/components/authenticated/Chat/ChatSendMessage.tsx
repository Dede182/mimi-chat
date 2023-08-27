import React, { createRef, useCallback, useMemo } from 'react'
import FileInput from './FileInput'
import { LuSticker, HiPlus, BsEmojiLaughing, BsFillSendFill,  } from '@/utils/helpers/SidebarHelper'
import { useForm } from 'react-hook-form';
import { MemoizedChatBtnCircle } from '@/components/authenticated/Chat/ChatIndex';
import { debounce } from "lodash"
import { sendEventMessage } from '@/api/generals/ChatList';
import { AuthUser } from '@/@types/users';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
import { PresenceChannel } from 'laravel-echo';

type FormValues = {
    message: string
  }

interface Props {
    chatId: string | undefined;
    user:  AuthUser | null;
    channelManager: PresenceEchoManager;
    chatPrefix: React.MutableRefObject<number>
    subscribe: () => PresenceChannel;
}
const ChatSendMessage = ({chatId,user,channelManager,chatPrefix,subscribe} : Props) => {

    const textArea = createRef<HTMLTextAreaElement>();

    const formRef = createRef<HTMLFormElement>();
    
    const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault(); // Prevent newline
            formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
      } = useForm<FormValues>();
    

    const onSubmit = useCallback(
        (data: any) => {
              sendEventMessage(data.message, user!.id, chatId!, chatPrefix.current,'text').then((res : any) => {
                if (res.status == 200) {
                    reset()
                }
            })
        },
        [user, chatId, chatPrefix]
      );

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
        const text = getValues('message');
        if (text.length > 0) {
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
      }, [channelManager, getValues, user])

    const emojiModal = () => {
        const text = getValues('message');
        const cursorPosition = textArea.current?.selectionStart;
        const newText = text.slice(0, cursorPosition) + "😀" + text.slice(cursorPosition);
        setValue('message', newText, { shouldDirty: true });
    };

    return (
        <div className="chat-input w-full h-[10%] fixed bottom-0 md:relative ">

            <div className="flex items-center justify-evenly  h-full gap-2">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} id="sendMessageForm"  className='hidden'>

                </form>
                <div className="w-2/6 flex justify-evenly">
                    <MemoizedChatBtnCircle icon={icons.sticker} />
                    <MemoizedChatBtnCircle icon={icons.emoji} clickFn={emojiModal} />

                    <FileInput icon={icons.plus} />
                </div>

                <textarea
                    form='sendMessageForm'
                    {...register('message')}
                    placeholder='Write your Message'
                    onKeyUp={isTyping}
                    // ref={textArea}
                    onKeyDown={handleTextareaKeyDown}
                    className="w-3/6 resize-none scroll pt-5 break-words rounded-full focus:outline-none focus:ring-transparent bg-transparent border-none px-4"></textarea>

                <div className="w-1/6">

                    <MemoizedChatBtnCircle type='button' form="sendMessageForm" clickFn={handleClick} icon={icons.send}  />

                </div>

            </div>
            

        </div>
    )
}

export default ChatSendMessage