import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import '@/index.scss'
import './style.scss';
import Aside from './Aside';

const Layout = () => {
  return (
    <div className='flex w-full'>
        <Sidebar />
        <Aside />
        <Outlet/>
    </div>
  )
}

export default Layout