import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '@/index.scss'
import './style.scss';
import Aside from './Aside';

const Layout = () => {
  console.log('layout')
  return (
    <div className='flex w-full max-h-[100vh]'>
        <Sidebar />
        <Aside />
        <Outlet/>
    </div>
  )
}

export default Layout