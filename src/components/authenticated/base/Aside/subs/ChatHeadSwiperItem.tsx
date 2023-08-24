import { memo } from "react"

export type CastType = {
    id : number,
    name: string,
}

const ChatHeadSwiperItem = ({cast} : {cast : CastType}) => {
  return (


    <div className="avatar online  ">
    <div className="h-28 rounded-xl shadow-lg relative">
      <img src={`https://i.pravatar.cc/250?img=${cast.id}`} />
      <div className='absolute bottom-4  text-white right-2 flex justify-between items-center'>
          <p>{cast.name !}</p>

      </div>
    </div>
  </div>
  )
}

const isSameChatHeadItem = (prevProps : any, nextProps : any) => {
    console.log(prevProps.cast.name == nextProps.cast.name)
    return prevProps.cast.name === nextProps.cast.name
}

export const MemorizedChatHeadItem = memo(ChatHeadSwiperItem, isSameChatHeadItem)