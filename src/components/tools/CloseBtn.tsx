
import { useAppDispatch } from '@/app/hooks';
import { changeAside } from '@/app/slices/sidebarSlice';
import { useCallback, useMemo } from 'react';
import {ImCross} from 'react-icons/im'
import { CurrentAside } from '../authenticated/base/Aside/types';


const CloseBtn = () => {
  const dispatch = useAppDispatch();

 const goDefaultAside = useCallback(
    () => {
        dispatch(changeAside(CurrentAside.DEFAULT));
    },
    [dispatch]
  )
const ImCrossIcon = useMemo(()=>ImCross,[]);
  return (
    <button className="sidebar-item  animate__animated animate__fadeIn z-[80] w-8 h-8" onClick={()=>goDefaultAside()} >
        <span className="sidebar-icon text-[.7rem] font-normal"><ImCrossIcon  /></span>
      </button>
  )
}

export default CloseBtn