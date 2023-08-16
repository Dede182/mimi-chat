import {  useAppSelector } from "@/app/hooks"
import { selectSidebar } from "@/app/slices/sidebarSlice";
import './style.scss';
import { CurrentAside } from "./Aside/types";
import { AiFillSetting, AiFillStar, HiUserGroup, FaPowerOff } from "./SidebarHelper"
import Cookies from "js-cookie";
import {  selectUser } from "@/app/slices/auth/UserSlice";
import { MemorizedSidebarItem } from "./SidebarItem";
import { memo, useMemo } from "react";

const logout = () => {

    Cookies.remove("token")
    window.location.href = "/login"
}
const Sidebar = () => {
    
    const user = useAppSelector(selectUser);
   
    const sidebar = useAppSelector(selectSidebar);

    const sidebarWidth = sidebar.isOpen ? 'w-[min(8rem,10rem)]' : 'w-[0%] ';
    const sidebarUl = sidebar.isOpen ? 'scale-1' : 'scale-0 ';

    //memorize the icon
    const icons = useMemo(() => {
        return {
            star : <AiFillStar />,
           contacts: <HiUserGroup />,
          setting: <AiFillSetting />,
          powerOff : <FaPowerOff />,
        }
    },[])

    return (
        <div className={`${sidebarWidth} sidebar gap-12`}>

            <div className=" sidebar-logo">
                hi
                </div> 

            <ul className={`${sidebarUl} flex flex-col transition-all `}>
                <li>
                    <div className="avatar">
                        <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.profile_photo} />
                        </div>
                    </div>
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.star} aside={CurrentAside.FAVORITES} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.contacts} akey="move" aside={CurrentAside.CONTACTS} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.setting} aside={CurrentAside.SETTINGS} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.powerOff} akey="move" clickFn={logout} />
                </li>
            </ul>
        </div>
    )
}

const MemoSidebar = memo(Sidebar)

export default MemoSidebar