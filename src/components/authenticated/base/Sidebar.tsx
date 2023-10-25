import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectSidebar, toggleSidebar } from "@/app/slices/sidebarSlice";
import './style.scss';
import { CurrentAside } from "./Aside/types";
import { AiFillSetting, AiFillStar, HiUserGroup, FaPowerOff, HiLightBulb } from "@/utils/helpers/SidebarHelper"
import Cookies from "js-cookie";
import { selectUser } from "@/app/slices/auth/UserSlice";
import { MemorizedSidebarItem } from "./SidebarItem";
import { memo, useCallback, useMemo } from "react";
import { ImCross } from 'react-icons/im'
import LogoSvg from "@/components/svgs/Logo/logo";
import { useNavigate } from 'react-router-dom';
const logout = () => {

    Cookies.remove("token")
    window.location.href = "/login"
}
const Sidebar = () => {

    const dispatch = useAppDispatch();
    const AiImCrossIcon = useMemo(() => ImCross, []);
    const navigate = useNavigate();

    const user = useAppSelector(selectUser);

    const sidebar = useAppSelector(selectSidebar);

    const toggle = useCallback(() => {
            dispatch(toggleSidebar());
    }, [dispatch])

    const redirectToPath = () => {
        toggle();
        navigate('/chat');
      };

    const sidebarWidth = sidebar.isOpen ? 'w-[min(8rem,10rem)]' : 'w-[0%] ';
    const sidebarUl = sidebar.isOpen ? 'scale-1' : 'scale-0 ';

    //memorize the icon
    const icons = useMemo(() => {
        return {
            star: <AiFillStar />,
            contacts: <HiUserGroup />,
            setting: <AiFillSetting />,
            powerOff: <FaPowerOff />,
            light: <HiLightBulb />,
            logo : <LogoSvg /> 
        }
    }, [])
    return (
        <div className={`${sidebarWidth} sidebar gap-12 absolute z-[9999]  md:relative`}>

            <button onClick={redirectToPath} className="sidebar-logo ">
                {icons.logo}
            </button>

            <ul className={`${sidebarUl} flex flex-col transition-transform `}>
                <li>
                    <div className="avatar items-center justify-center">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.profile_photo} />
                        </div>
                    </div> 
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.star} akey="spin" toggle={toggle} aside={CurrentAside.FAVORITES} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.contacts} akey="move" toggle={toggle} aside={CurrentAside.GROUP} />
                </li>

                <li >
                    <MemorizedSidebarItem icon={icons.setting} akey="spin" toggle={toggle} aside={CurrentAside.SETTINGS} />
                </li>

                {/* <li >
                    <MemorizedSidebarItem icon={icons.light} clickFn={themeSwitch} />
                </li> */}

                <li >
                    <MemorizedSidebarItem icon={icons.powerOff} akey="move" clickFn={logout} />
                </li>

                <li className="md:hidden">
                    <button className="animate__animated animate__fadeIn sidebar-item  w-8 h-8 z-[80] " onClick={() => toggle()} >
                        <span className="sidebar-icon !text-[.8rem]">
                            <AiImCrossIcon />
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

const MemoSidebar = memo(Sidebar)

export default MemoSidebar