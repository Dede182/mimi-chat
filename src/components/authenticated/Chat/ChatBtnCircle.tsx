import { memo } from "react";


type CircleProps = {
    icon: JSX.Element,
    clickFn?: () => void,
    akey?: string,
    type?: "button" | "submit" | "reset" | undefined

}
const ChatBtnCircle = ({ icon, clickFn, akey = "spine", type }: CircleProps) => {

    akey = akey ? akey : "spin";
    type = type ? type : "button";

    const click  = () => {
        if(clickFn){
            clickFn();
        }
    }
    return (
        <button type={type} className={`sidebar-item ${akey}`}
            onClick={click}>
            <span className="sidebar-icon">
                {icon}
            </span>
        </button>
    )
}

const isSameChatCircle = (prevProps: CircleProps, nextProps: CircleProps) => {

    return Object.keys(prevProps).every((key) => {
        if (prevProps[key as keyof CircleProps] == nextProps[key as keyof CircleProps]) {
            return true;
        }
        return false
    })

}

export const MemoizedChatBtnCircle = memo(ChatBtnCircle, isSameChatCircle);
