import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectSidebar } from "@/app/slices/sidebarSlice";
import './style.scss';
import { CurrentAside } from "./Aside/types";
import { AiFillSetting, AiFillStar, HiUserGroup, FaPowerOff } from "./SidebarHelper"
import Cookies from "js-cookie";
import { useEffect } from "react";
import { fetchProfile, selectUser } from "@/app/slices/auth/UserSlice";
import { MemorizedSidebarItem } from "./SidebarItem";

const logout = () => {

    Cookies.remove("token")
    window.location.href = "/login"
}
const Sidebar = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(selectUser);
    const token = useAppSelector(token => token.auth.token);


    useEffect(() => {
        if (!profile) {
            dispatch(fetchProfile({ url: '/user/profile', token: token! }))
        }
    }, [dispatch, profile, token])

    const user = profile?.data ;
    const sidebar = useAppSelector(selectSidebar);

    const sidebarWidth = sidebar.isOpen ? 'w-[min(8rem,10rem)]' : 'w-[0%] ';
    const sidebarUl = sidebar.isOpen ? 'scale-1' : 'scale-0 ';


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
                    <MemorizedSidebarItem icon={<AiFillStar />} aside={CurrentAside.FAVORITES} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={<HiUserGroup />} akey="move" aside={CurrentAside.CONTACTS} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={<AiFillSetting />} aside={CurrentAside.SETTINGS} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={<FaPowerOff />} akey="move" clickFn={logout} />
                </li>
            </ul>
        </div>
    )
}

export default Sidebar