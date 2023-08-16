import { memo } from "react"

const ChatLine = () => {
  return (
    <div className="chat-line flex gap-3 bg-gray-400 py-3 px-10">
                {/* avatar */}
                  <div className="avatar w-[20%]">
                    <div className="w-14 mask mask-squircle">
                    <img src={`https://i.pravatar.cc/250?img=26`} />
                    </div>
                </div>

                {/* chat */}
                <div className="chat-message w-[60%] flex flex-col gap-1">
                  <div className="flex justify-between">
                    <div className="">Ahmed</div>
                    </div>
                  <div className="text-sm">hello</div>
                </div>

                {/* time */}
                <div className="chat-time w-[20%] flex flex-col gap-1">
                  <div className="text-sm">12:00</div>
                  <div className="text-sm">seen</div>
                 </div>
                  
            </div>
  )
}

export const MemorizedChatLine = memo(ChatLine)
