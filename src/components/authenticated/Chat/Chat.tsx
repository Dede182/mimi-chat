
import { t } from "i18next"
import './styles.scss'
import { PublicEchoManager } from "./EchoManager/PublicEchoManager";


const Chat = () => {

  // Usage
  const channelManager = new PublicEchoManager('public.chat.1');
  channelManager.publicSubscribe(() => {
    console.log('Subscribed to channel');
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .listen('.test',(e : any)=>{
    console.log(e)
  })

  const sendMessage = () => {
    console.log('send')
    channelManager.sendMessage('test')
  }

  
  return (
    <div className="chat-bg transitionall">

      <div className="w-full h-full px-12 py-10 ">
        <div className="bg-gray-500 h-full flex flex-col gap-4 ">

          <div className="chat-banner w-full">
            <div className="avatar w-[20%]">
              <div className="w-14 mask mask-squircle">
                <img src={`https://i.pravatar.cc/250?img=26`} />
              </div>
            </div>
          </div>

          <div className="chatBody scroll h-full overflow-y-scroll">


            <button onClick={()=>sendMessage()}>Send</button>
            {/* chat start */}
            <div className="chat chat-start">

              <div className="chat-header">

                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">
                Delivered
              </div>
            </div>
            {/* chat end */}
            <div className="chat chat-end">

              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">
                Seen at 12:46
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Chat