import { useEffect, useState } from 'react';
import { FilePath } from './types/ChatTypes'

const ChattMessageImage = ({ images} : { images :  FilePath[]}) => {
  return (
    <div className='w-full h-full px-4 py-3 bg-gray-300 rounded-lg'>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div className={`w-full h-full px-4 py-3 bg-gray-300 rounded-lg`}>
        <img src={currentImage} alt="" className={`w-full h-full object-cover rounded-lg ${blurEffect}`} />
        </div>
    )
    }


export default ChattMessageImage