import { memo } from "react";
import { ClipLoader } from "react-spinners"


type CircleProps = {
    icon: JSX.Element,
    clickFn?: () => void,
    akey?: string,
    type?: "button" | "submit" | "reset" | undefined,
    loading? : boolean
    form?: string
}
const ChatBtnCircle = ({ icon, clickFn, akey = "spine", type ,loading ,form }: CircleProps) => {

    akey = akey ? akey : "spin";
    type = type ? type : "button";
    loading = loading ? loading : false;

    const click  = () => {
        if(clickFn){
            clickFn();
        }
    }
    return (
        <button type={type} className={`sidebar-item ${akey}`} form={form} disabled={loading ? true : false}
            onClick={click}>
            <span className="sidebar-icon">
                {loading ? <ClipLoader color='#fff' size={20} /> : icon}
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
