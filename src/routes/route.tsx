
import { Route } from 'react-router-dom';
// import Auth from '../auth/middleware/Auth';
// import Guard from '../auth/middleware/Guard';
import Chat from '../components/authenticated/Chat/Chat'
import Login from '../components/guest/Login';
import Register from '../components/guest/Register';
// import { ReactNode } from 'react';

// type RouteGuardParent = typeof Auth  | typeof Guard

// const middleware = (guard : RouteGuardParent,children : ReactNode) : ReactNode => {
//     return (guard({children }));
//   }

// type RouteGuard  = ReturnType<typeof middleware> 

interface Route {
  path: string;
  // element : RouteGuard | RouteGuard[] | ReactNode;
}

  
// eslint-disable-next-line react-refresh/only-export-components
export const routesCollection : Record<string,Route> = {
    mainChat : {
      path: '/chat',
    },
    chat:  {
      path: '/chat/:id',
      // element: middleware(Guard, <Chat/>)
    },
    groupChat:{
      path: '/group-chat/:id',
    },
    aside : {
      path : '/aside',
      // element : middleware(Guard,<As)
    },
    login :{
      path: '/login',
      // element : middleware(Auth, <Login/>)
    },
    register :{
      path: '/register',
      // element : middleware(Auth, <Login/>)
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



  


