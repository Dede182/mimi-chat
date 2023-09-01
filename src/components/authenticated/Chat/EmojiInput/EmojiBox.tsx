import  { Theme } from 'emoji-picker-react';
import { Suspense, lazy, useState } from 'react';
import { MemoizedChatBtnCircle } from '../ChatBtnCircle';
import { useAppSelector } from '@/app/hooks';
import { selectTheme } from '@/app/slices/settingSlices';

const LazyEmojiPicker = lazy(() => import('emoji-picker-react'));


interface EmojiBoxProps {
    icon: JSX.Element,
    textMessage : string,
    textArea: React.RefObject<HTMLTextAreaElement>,
    setTextMessage : React.Dispatch<React.SetStateAction<string>>,
}
const EmojiBox = ({icon,setTextMessage,textArea,textMessage} : EmojiBoxProps)  => {
    const [open,setOpen] = useState<boolean>(false);
    const theme = useAppSelector(selectTheme)

    const th = (theme == 'theme-dark') ? Theme.DARK : Theme.LIGHT;
    const toggleEmoji = () => {
        setOpen(!open);
    }

    const emojiClicked = (emojiObject: any) => {
        const emoji = emojiObject.emoji;
        const text = textMessage;
        const cursorPosition = textArea.current?.selectionStart;
        const newText = text.slice(0, cursorPosition) + emoji + text.slice(cursorPosition);
        setTextMessage(newText);
    }


  return (
    <div>
        <MemoizedChatBtnCircle icon={icon} clickFn={toggleEmoji} />
        
        {
            open && 
            <div className='absolute bottom-20 '>
                <Suspense fallback={<div>Loading...</div>}> 
                <LazyEmojiPicker
                width={300} height={400}
                onEmojiClick={emojiClicked}
                previewConfig={{showPreview: false}}
                theme={th} skinTonesDisabled={true} searchDisabled={true}  />
                </Suspense>
            </div>
        }

    </div>
  )
}

export default EmojiBox