
import { Route } from 'react-router-dom';
import Auth from '../auth/middleware/Auth';
import Guard from '../auth/middleware/Guard';
import Chat from '../components/authenticated/Chat/Chat'
import Login from '../components/guest/Login';
import Register from '../components/guest/Register';
import { ReactNode } from 'react';

type RouteGuardParent = typeof Auth  | typeof Guard

const middleware = (guard : RouteGuardParent,children : ReactNode) : ReactNode => {
    return (guard({children }));
  }

type RouteGuard  = ReturnType<typeof middleware> 

interface Route {
  path: string;
  element : RouteGuard | RouteGuard[] | ReactNode;
}

  
export const routesCollection : Record<string,Route> = {
    chat:  {
      path: '/chat',
      element: middleware(Guard, <Chat/>)
    },
    login :{
      path: '/login',
      element : middleware(Auth, <Login/>)
    },
    register :{
      path: '/register',
      element : middleware(Auth, <Login/>)
    },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RouteFc = (path : any ,element : any,index :boolean = false) => {
  if(index)
  {
  return <Route path={path} element={element} index />
  }
  return <Route path={path} element={element}  />
}

export  {Chat , Login, Register} 



  


