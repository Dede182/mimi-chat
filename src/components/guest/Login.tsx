import { t } from "i18next"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { authService, clearError, selectAuth } from "@/app/slices/auth/AuthSlices";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { loginSubmitBody, loginSubmitForm } from "./types/guestTypes";
import { useNavigate } from "react-router-dom";
import InputField, { HeroError } from "./InputField";
import PrimaryButton from "../ui/Fields/PrimaryButton";
import { loginValidationSchema } from "./validations/authValiidation";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector(selectAuth);
  const loading = auth.loading ;
  const error = auth.error;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginSubmitForm>({
    resolver: yupResolver(loginValidationSchema)
  });

  const onSubmit = async(data: loginSubmitForm) => {
    const body : loginSubmitBody = {
      url : '/login',
      body : data
     }
    await dispatch(authService(body))
    setTimeout(() => {
    dispatch(clearError())
    }, 4000);
  };

  if(loading == 'successful')
  {
    navigate('/aside')
  }

  return (
    <div className="min-w-[280px]">
      <HeroError error={error}/>

      <form onSubmit={handleSubmit(onSubmit)}>

       <InputField errors={errors.email !} register={register} register_name="email"type="text"  label="email"  placeholder="Enter your email" />

       <InputField errors={errors.password !} register={register} register_name="password" type="password"  label="password"  />


      <div className="flex w-full justify-center items-center mt-5 capitalize">
         <PrimaryButton type="submit" children={<span>{t('login')}</span>} loading={loading} />
      </div>
    </form>
    </div>
  )
}

export default Login