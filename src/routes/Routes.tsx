import { Route, Routes } from 'react-router-dom'
import { RouteFc ,routesCollection} from './route'
import Guard from '../auth/middleware/Guard'
import Auth from '../auth/middleware/Auth'
import GuestLayout from '../components/guest/GuestLayout'
import { lazy, Suspense, useEffect, useState } from 'react';
import Layout from '@/components/authenticated/base/Layout'

const Chat = lazy(()=>import('../components/authenticated/Chat/Chat'))
const Login = lazy(()=>import('../components/guest/Login'))
const Register = lazy(()=>import('../components/guest/Register'))
const Aside = lazy(()=>import('@/components/authenticated/base/Aside'))
const RoutesComponent = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>

      <Route path="/" element={<GuestLayout/>}>
      
      { RouteFc(routesCollection.login.path, <Auth><Login/></Auth>,true)}

      { RouteFc(routesCollection.register.path, <Auth><Register/></Auth>)}
      </Route>

      <Route element={<Layout />}>

        { RouteFc(routesCollection.chat.path, <Guard><Chat/></Guard>)}

        {windowWidth < 768 && RouteFc(routesCollection.aside.path,<Guard><Aside /></Guard>)}
      </Route>
     
      <Route path="*" element={<h1>
        route not found
        Pls go to Login page
        <a className='text-blue-500 underline mx-3' href="/">Login</a>
      </h1>} />
    </Routes>
    </Suspense>
  )
}

export default RoutesComponent