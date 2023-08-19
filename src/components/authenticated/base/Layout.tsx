import MemoSidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '@/index.scss'
import './style.scss';
import Aside from './Aside';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProfile, selectUser } from '@/app/slices/auth/UserSlice';
import { useEffect } from 'react';
import { PresenceEchoManager } from '../Chat/EchoManager/PresenceEchoManager';
import { addOnlineUser, removeOnlineUser, selectOnlineActiveUsers, setInitialOnlineUsers } from '@/app/slices/chat/onlineActiveUserSlice';

const Layout = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(token => token.auth.token);
  const profile = useAppSelector(selectUser);
  const channel = `online.chat.1`
  const onlineActiveUsers = useAppSelector(selectOnlineActiveUsers);


  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile({ url: '/user/profile', token: token! }))
    }
  }, [dispatch, profile, token])
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
    <div className='flex w-full max-h-[100vh]'>
      <MemoSidebar />
      <Aside />
      <Outlet />
    </div>
  )
}

export default Layout