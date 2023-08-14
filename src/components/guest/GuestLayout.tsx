import { NavLink, Outlet, useLocation } from 'react-router-dom'
import './style.scss'
import { t } from 'i18next'

const navPath ={
  login: '/login',
  register: '/register'
}

function activeCurrentPath(url :string,path:string){
  return url == path ? 'btn-soft' : 'btn-primary'
}

const title = import.meta.env.VITE_REACT_APP_TITLE;
const GuestLayout = () => {
 
  const location = useLocation().pathname;
  return (
    <div className='bg px-4'>
        <nav className='nav-head gap-3'>
          <NavLink className={`${activeCurrentPath(location,navPath.login)} px-3 py-2 rounded-lg capitalize`} to={ navPath.login }>{t('login')}</NavLink>

          <NavLink className={`${activeCurrentPath(location,navPath.register)} px-3 py-2 rounded-lg capitalize`} to={navPath.register}>{t('register')}</NavLink>
         
        </nav>
        <main className='main-body mt-6'>
            <div className="flex flex-col gap-3 max-w-xs text-center">
              <p>Logo</p>
              <p className='font-bold text-lg'>{t("Hello Every One & We are ")}{title} </p>
              <p className='text-lg'>{t("Welcome from our app please & continue to your account.")} </p>
            </div>
            <div className="max-w-2xl outlet">
              <Outlet />
            </div>
           

        </main>
    </div>
  )
}

export default GuestLayout