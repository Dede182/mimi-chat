import { Route, Routes } from 'react-router-dom'
import { routeFC ,routesCollection} from './route'
import Guard from '../auth/middleware/Guard'
import Auth from '../auth/middleware/Auth'
import GuestLayout from '../components/guest/GuestLayout'
import { lazy, Suspense } from 'react';

const Chat = lazy(()=>import('../components/authenticated/Chat/Chat'))
const Login = lazy(()=>import('../components/guest/Login'))
const Register = lazy(()=>import('../components/guest/Register'))

const RoutesComponent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
    { routeFC(routesCollection.chat.path, <Guard><Chat/></Guard>)}

      <Route path="/" element={<GuestLayout/>}>
      
      { routeFC(routesCollection.login.path, <Auth><Login/></Auth>,true)}

      { routeFC(routesCollection.register.path, <Auth><Register/></Auth>)}
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