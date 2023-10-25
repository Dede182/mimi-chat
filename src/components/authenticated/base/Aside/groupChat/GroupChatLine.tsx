import React from 'react'

const GroupChatLine = () => {

    const img : string = "https://i2.wp.com/s3.amazonaws.com/laracasts/images/forum/avatars/default-avatar-2.png?ssl=1";
  return (
    <div
    //   onClick={() => navigateToChat()}
      className={`chat-line flex gap-3 w-full  py-3 px-10 cursor-pointer`}>
      {/* avatar */}
      <div className={`avatar w-1/5 `}>
        <div className="w-14 mask mask-squircle">
          <img src={img} />
        </div>
      </div>

      {/* chat */}
      <div className={`chat-message w-4/5 flex flex-col gap-1`}>
        <div className={`flex justify-between`}>
          <div className="capitalize whitespace-nowrap overflow-hidden">RAMM group organization Limited of Myanmar State (MOSG)</div>
        </div>
        <div className="flex">
        <p className={`text-[.8em] w-5/6 message`}>
            Let' group together
        </p>
        <p className={`text-[.4em] message font-bold time`}>
            12:00 PM
        </p>
        </div>
      </div>

      {/* time */}
      {/* <div className="chat-time w-1/4 flex flex-col gap-1">
        <div className={`text-sm `}>    
            ⎷⎷
          </div>
      </div> */}

    </div>
  )
}

export default GroupChatLine