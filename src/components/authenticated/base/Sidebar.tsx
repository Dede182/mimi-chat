import { useAppDispatch, useAppSelector } from "@/app/hooks"
import  { changeAside, selectSidebar } from "@/app/slices/sidebarSlice";
import './style.scss';
import { CurrentAside } from "./Aside/types";
import { AiFillSetting, AiFillStar, HiUserGroup,FaPowerOff } from "./SidebarHelper"
import Cookies from "js-cookie";
import { memo } from "react";
type SidebarItemProps = {
    icon: JSX.Element,
    aside?: CurrentAside,
    clickFn ?: () => void,
    akey? : string
}

const SidebarItems = ({ icon, aside ,clickFn ,akey ="spine" }: SidebarItemProps) => {

    const dispatch = useAppDispatch();

    const switchAside = (aside: CurrentAside) => {
        if(clickFn)
        {
            clickFn();
        }
        else{
            dispatch(changeAside(aside));

        }
    }
    akey = akey ? akey : "spin";

    return (
            <button className={`sidebar-item ${akey}`}
                onClick={() => switchAside(aside !)}>
               <span className="sidebar-icon">
                     {icon}
               </span>
            </button>
    )
}

const MemorizedSidebarItem  = memo(SidebarItems)

const logout = () => {

    Cookies.remove("token")
    window.location.href = "/login"
  }
const Sidebar = () => {

    const sidebar = useAppSelector(selectSidebar);

    const sidebarWidth = sidebar.isOpen ? 'w-[min(6rem,8rem)]' : 'w-[0%] ';
    const sidebarUl = sidebar.isOpen ? 'scale-1' : 'scale-0 ';


    return (
        <div className={`${sidebarWidth} sidebar`}>
            <ul className={`${sidebarUl} flex flex-col transition-all `}>
                <li >
                    <MemorizedSidebarItem icon={<AiFillStar />} aside={CurrentAside.FAVORITES}/>
                </li>

                <li >
                    <MemorizedSidebarItem icon={<HiUserGroup />} akey="move" aside={CurrentAside.CONTACTS}/>
                </li>

                <li >
                    <MemorizedSidebarItem icon={<AiFillSetting />} aside={CurrentAside.SETTINGS}/>
                </li> 
                
                <li >
                    <MemorizedSidebarItem icon={<FaPowerOff />} akey="move" clickFn={logout}/>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar