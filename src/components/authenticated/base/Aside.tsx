import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectSidebar } from "@/app/slices/sidebarSlice";
import { CurrentAside } from "./Aside/types";
import { lazy, Suspense, useMemo, } from 'react';
import {AiOutlineAppstore} from 'react-icons/ai'
const Contacts = lazy(() => import('./Aside/Contacts'));
const Favourite = lazy(() => import('./Aside/favorite/Favourite'));
const Setting = lazy(() => import('./Aside/Setting'));
const MainAside = lazy(() => import('./Aside/MainAside/MainAside'));
import { toggleSidebar } from "@/app/slices/sidebarSlice";


const renderAside = (aside: CurrentAside) => {
  switch (aside) {
    case CurrentAside.DEFAULT:
      return <MainAside />
    case CurrentAside.FAVORITES:
       return <Favourite />
    case CurrentAside.SETTINGS:
      return <Setting/>
    case CurrentAside.CONTACTS:
      return <Contacts />
    default:
      return <MainAside />;
  }
}

const Aside = () => {
  const aside = useAppSelector(selectSidebar).aside;
  
  const currentAside = useMemo(()=>renderAside(aside),[aside]);
  
  const AiOutlineAppstoreIcon = useMemo(()=>AiOutlineAppstore,[]);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  }

 

  const sidebarToggle = <button className="absolute top-4 md:top-3 right-5 md:right-2 animate__animated animate__fadeIn sidebar-item  w-8 h-8 z-[80]" onClick={()=>toggle()} >
    <span className="sidebar-icon">
    <AiOutlineAppstoreIcon />
      </span>
</button>

  const showCrossButton = aside !== CurrentAside.DEFAULT;

  const asideClass = 'w-full md:w-[30vw] aside'
  return (
    <Suspense fallback={
    <div className={`${asideClass}`}>

    </div>}>
      
      <aside  className={`${asideClass} relative `}>

      {showCrossButton ? '' : sidebarToggle}
        {currentAside}
      </aside>
    </Suspense>

  )
}

export default Aside