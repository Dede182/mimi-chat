import MemoSidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '@/index.scss'
import './style.scss';
import Aside from './Aside';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProfile, selectUser } from '@/app/slices/auth/UserSlice';
import { useEffect } from 'react';

const Layout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(token => token.auth.token);
  const profile = useAppSelector(selectUser);


  useEffect(() => {
      if (!profile) {
          dispatch(fetchProfile({ url: '/user/profile', token: token! }))
      }
  }, [dispatch, profile, token])


  return (
    <div className='flex w-full max-h-[100vh]'>
        <MemoSidebar />
        {/* <Aside /> */}
        <Outlet/>
    </div>
  )
}

export default Layout