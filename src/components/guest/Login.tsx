import { t } from "i18next"

// import Cookies from "js-cookie"
const Login = () => {
  // const token = Cookies.set('token','sdfds')
  // console.log(Cookies.get('token'))
  // console.log(token)
  return (
    <div className="min-w-[280px]">
      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text capitalize">{t('email')}</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-md input-bordered w-full" />
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text capitalize">{t('password')}</span>
        </label>
        <input type="password" className="input input-md input-bordered w-full" />
      </div>

      <div className="flex w-full justify-center items-center mt-5">
        <button className="btn btn-primary px-8">Login</button>
      </div>
    </div>
  )
}

export default Login