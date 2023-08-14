import { t } from "i18next"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { authService, clearError, selectAuth } from "@/app/slices/auth/AuthSlices";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { loginSubmitBody, loginSubmitForm } from "./types/guestTypes";
import { useNavigate } from "react-router-dom";
import InputField, { HeroError } from "./InputField";
import PrimaryButton from "../ui/Fields/PrimaryButton";


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
});

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
    resolver: yupResolver(validationSchema)
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
    console.log(loading)
    // reset();
  };

    if(loading == 'successful')
    {
      navigate('/chat')
    }

  return (
    <div className="min-w-[280px]">
      <HeroError error={error}/>

      <form onSubmit={handleSubmit(onSubmit)}>

       <InputField errors={errors.email !} register={register} register_name="email"type="text"  label="email"  placeholder="Enter your email" />

       <InputField errors={errors.password !} register={register} register_name="password"type="text"  label="password"  />


      <div className="flex w-full justify-center items-center mt-5 capitalize">
         <PrimaryButton type="submit" children={<span>{t('login')}</span>} loading={loading} />
      </div>
    </form>
    </div>
  )
}

export default Login