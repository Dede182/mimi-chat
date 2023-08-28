import MemoSidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '@/index.scss'
import './style.scss';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProfile, selectUser } from '@/app/slices/auth/UserSlice';
import { Suspense, lazy, useEffect, useState } from 'react';
import { PresenceEchoManager } from '../Chat/EchoManager/PresenceEchoManager';
import { addOnlineUser, removeOnlineUser, setInitialOnlineUsers } from '@/app/slices/chat/onlineActiveUserSlice';
import LoadingScreen from '@/routes/LoadingScreen/LoadingScreen';
const Aside = lazy(() => import('./Aside'));

const Layout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(token => token.auth.token);
  const profile = useAppSelector(selectUser);
  const channel = `online.chat.1`
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!profile) {
      console.log('profile was called')
      dispatch(fetchProfile({ url: '/user/profile', token: token! }))
    }
  }, [dispatch, token])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const channelManager = new PresenceEchoManager(channel, token!);
  
    channelManager
      .presenceSubscribe((data) => {
        dispatch(setInitialOnlineUsers(data));
        // console.log(data.length + ' users active online');
      })
      .joining((user: any) => {
        // console.log(channel + 'channel connected', user);
        dispatch(addOnlineUser(user));
      })
      .leaving((user: any) => {
        // console.log(channel + ' channel abandoned', user.name);
        dispatch(removeOnlineUser(user));
      });
  
  }, [ channel, token]);

  // console.log(onlineActiveUsers)
  return (
    <div className='flex w-full max-h-[100vh] relative'>
      <MemoSidebar />
      
      {windowWidth > 768 && <Aside/>}

      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Layout