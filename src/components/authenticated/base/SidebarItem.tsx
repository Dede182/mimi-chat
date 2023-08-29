import { useAppDispatch } from "@/app/hooks";
import { changeAside } from "@/app/slices/sidebarSlice";
import { memo } from "react";
import { CurrentAside } from "./Aside/types";

type SidebarItemProps = {
    icon: JSX.Element,
    aside?: CurrentAside,
    clickFn ?: () => void,
    akey? : string,
    toggle ?: () => void
}

const SidebarItems = ({ icon, aside ,clickFn ,akey ="spine" ,toggle}: SidebarItemProps) => {

    const dispatch = useAppDispatch();

    const switchAside = (aside: CurrentAside) => {
        if(clickFn)
        {
            clickFn();
        }
        else{
            if(toggle)
            {
                toggle();
            }
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

export const MemorizedSidebarItem  = memo(SidebarItems)
