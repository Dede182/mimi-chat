import { t } from 'i18next'

const Register = () => {
  return (
    <div className="min-w-[280px]">
      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text capitalize">{t('name')}</span>
        </label>
        <input type="text" placeholder="Type here" className="input input-md input-bordered w-full" />
      </div>
<div className="form-control w-full ">
        <label className="label">
          <span className="label-text capitalize">{t('email')}</span>
        </label>
        <input type="email" placeholder="Type here" className="input input-md input-bordered w-full" />
      </div>

      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text capitalize">{t('password')}</span>
        </label>
        <input type="password" className="input input-md input-bordered w-full" />
      </div>
      
      <div className="form-control w-full ">
        <label className="label">
          <span className="label-text capitalize">{t('password confirmation')}</span>
        </label>
        <input type="password" className="input input-md input-bordered w-full" />
      </div>

      <div className="flex w-full justify-center items-center mt-5">
        <button className="btn btn-primary px-8">Register</button>
      </div>
    </div>
  )
}

export default Register