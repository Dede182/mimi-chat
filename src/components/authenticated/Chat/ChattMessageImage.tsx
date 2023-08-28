import { useEffect, useState } from 'react';
import { FilePath } from './types/ChatTypes'
import { useAppDispatch } from '@/app/hooks';
import { openChatFile, setChatFile } from '@/app/slices/chat/chatFileSlice';

const ChattMessageImage = ({ images} : { images :  FilePath[]}) => {
  return (
    <div className='h-full px-4 py-3 chat-bubble rounded-lg'>
        <div className=" gap-4 flex flex-wrap" >
            {images.map((image, index) => (
                <div key={index} className="grid">
                    <ChatMessageSingleMessage image={image} />
                </div>
            ))}
        </div>
    </div>
  )
}

const ChatMessageSingleMessage = ({ image }: { image: FilePath }) => {
    const [currentImage,setCurrentImage] = useState<string>(image.preview);
    const [loading, setLoading] = useState<boolean>(true); 
    const dispatch = useAppDispatch();

    const openImageModal = () =>{
      dispatch(openChatFile());
      dispatch(setChatFile(image));
    }
    const fetchImage = (src : string) => {
        const loadingImage = new Image();
        loadingImage.src = src;
        loadingImage.onload = () => {  
            setCurrentImage(src);
            setLoading(false);
        };
      };
    const blurEffect = loading ? 'blur-sm' : '';

      useEffect(() => {
        fetchImage(image.hd);
      }, [image]);
    return (
        <button onClick={openImageModal} className={`md:w-32 md:h-32 w-28 h-28 rounded-lg`}>
          <img src={currentImage} alt="" className={`w-full h-full object-cover rounded-lg ${blurEffect}`} />
        </button>
    )
    }

export default ChattMessageImage