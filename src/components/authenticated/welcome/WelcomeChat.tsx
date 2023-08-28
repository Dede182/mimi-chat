import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { RingLoader } from "react-spinners";
const WelcomeChat = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  const navigate = useNavigate();
  const navigateUrl  = windowWidth < 768 ? '/aside' : '/chat'
  const navigateToChat = () => {
        navigate(navigateUrl)
    }

  return (
    <div className="chat-bg flex flex-col justify-between transition-all ">
        <div className="flex flex-col pt-6  gap-4 h-[100vh] justify-center items-center">
            <div className="recent-header flex flex-col gap-1 px-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col animate__animated  animate__zoomInDown animate__slow ">
                    <h3 className="text-4xl font-bold capitalize fle">Welcome </h3>
                     <p className="fade-text capitalize">Chat from your Friend & Family</p>
                    </div>
                <RingLoader color='#b2aeae33' className="animate__animated animate__zoomIn animate__slow  animate__delay-1s" loading={true} size={80} />
                </div>
                <button onClick={navigateToChat} 
                className="animate__animated animate__zoomInUp  animate__slow btn btn-soft text-white px-4 py-2 rounded-md">Start Chatting</button>
            </div>
        </div>
    
    </div>
  )
}

export default WelcomeChat