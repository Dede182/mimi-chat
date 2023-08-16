import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { changeAside, selectSidebar } from "@/app/slices/sidebarSlice";
import { CurrentAside } from "./Aside/types";
import { lazy, Suspense, useCallback } from 'react';
import {ImCross} from 'react-icons/im'
import {AiOutlineAppstore} from 'react-icons/ai'
const Contacts = lazy(() => import('./Aside/Contacts'));
const Favourite = lazy(() => import('./Aside/Favourite'));
const Setting = lazy(() => import('./Aside/Setting'));
const MainAside = lazy(() => import('./Aside/MainAside'));
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
  console.log('aside')
  const aside = useAppSelector(selectSidebar).aside;
  
  const currentAside = renderAside(aside);

  const dispatch = useAppDispatch();

  const toggle = () => {
    console.log('here');
    dispatch(toggleSidebar());
  }

  const goDefaultAside = useCallback(
    () => {
        dispatch(changeAside(CurrentAside.DEFAULT));
    },
    [dispatch]
  )

  const sidebarToggle = <button className="absolute top-3 right-2 animate__animated animate__fadeIn sidebar-item  w-8 h-8 z-20" onClick={()=>toggle()} >
    <span className="sidebar-icon">
    <AiOutlineAppstore />
      </span>
</button>

  const showCrossButton = aside !== CurrentAside.DEFAULT;

  const asideClass = 'w-[24rem] aside'
  return (
    <Suspense fallback={<div>Loading...</div>}>
      
      <aside  className={`${asideClass} relative `}>

      {showCrossButton ? <button className="absolute top-3 right-2 w-6 h-6 animate__animated animate__fadeIn z-20" onClick={()=>goDefaultAside()} >
        <ImCross />
      </button> : sidebarToggle}
        {currentAside}
      </aside>
    </Suspense>

  )
}

export default Aside