import InputError from '../ui/Fields/InputError'
import { t } from 'i18next'
import { UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
    type : string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors:  any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register_name: any,
    label: string,
    placeholder?: string
}

const InputField = ({type,errors,register,register_name,label,placeholder} : InputFieldProps) => {
  return (
    <div className="form-control w-full ">
    <label className="label">
      <span className="label-text capitalize">{t(label)}</span>
    </label>
    <input type={type}
    {...register(register_name)}
    placeholder={t(placeholder !)} className="input input-md input-bordered w-full" />
    <InputError errors={errors} />

  </div>
  )
}

export const HeroError = ({error}  : {error : string}) => {
    return  (error && error !== "") && <div className="invalid-feedback my-2">{t(error)}</div>
}
export default InputField