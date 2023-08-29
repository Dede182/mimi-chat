import React, { createRef, useCallback, useMemo } from 'react'
import FileInput from './FileInput/FileInput'
import { LuSticker, HiPlus, BsEmojiLaughing, BsFillSendFill,  } from '@/utils/helpers/SidebarHelper'
import { useForm } from 'react-hook-form';
import { MemoizedChatBtnCircle } from '@/components/authenticated/Chat/ChatIndex';
import { debounce } from "lodash"
import { sendEventMessage } from '@/api/generals/ChatList';
import { AuthUser } from '@/@types/users';
import { PresenceEchoManager } from './EchoManager/PresenceEchoManager';
import { PresenceChannel } from 'laravel-echo';
import { alertToast } from '@/components/tools/Toast/AlertToast';
import { AxiosError } from 'axios';
import InputError from '@/components/ui/Fields/InputError';

type FormValues = {
    message: string,
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
    const [loading, setLoading] = React.useState<boolean>(false);
    const [fall, setFall] = React.useState<any[]>([]);
    const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault(); // Prevent newline
            formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        getValues,
        resetField,
      } = useForm<FormValues>();
    

    const onSubmit = useCallback(
       async (data: any) => {
              if(!loading)
              {
                setLoading(true);
                setFall([]);
                const res = await sendEventMessage(data.message, user!.id, chatId!, chatPrefix.current,'text')
                if(res instanceof AxiosError){
                  res.response && setFall([res.response.data]);
                }
                else{
                  res && res.status === 200 && resetField('message');
                }
                setLoading(false);
              }
              },
        [user, chatId, chatPrefix]
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

                    <FileInput icon={icons.plus} user={user} chatId={chatId !} chatPrefix={chatPrefix} />
                </div>

                <textarea
                    form='sendMessageForm'
                    {...register('message' , { required: true })}
                    placeholder='Write your Message'
                    onKeyUp={isTyping}
                    // ref={textArea}
                    onKeyDown={handleTextareaKeyDown}
                    className="w-3/6 resize-none scroll pt-5 break-words rounded-full focus:outline-none focus:ring-transparent bg-transparent border-none px-4"
                    required
                    ></textarea>
                <InputError errors={errors.message !} />


                <div className="w-1/6">

                    <MemoizedChatBtnCircle type='button' form="sendMessageForm" loading={loading} clickFn={handleClick} icon={icons.send}  />

                </div>

            </div>
            

        </div>
    )
}

export default ChatSendMessage