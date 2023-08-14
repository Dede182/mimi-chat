import { t, } from "i18next"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { authService, selectAuth } from "@/app/slices/auth/AuthSlices";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { registerSubmitBody, registerSubmitForm } from "./types/guestTypes";
import { useNavigate } from "react-router-dom";
import InputField, { HeroError } from "./InputField";
import PrimaryButton from "../ui/Fields/PrimaryButton";

const validationSchema = Yup.object().shape({
  name : Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector(selectAuth);
  const loading = auth.loading;
  const error = auth.error;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<registerSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: registerSubmitForm) => {
    const body: registerSubmitBody = {
      url: '/register',
      body: data
    }
    await dispatch(authService(body))
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
       <InputField errors={errors.name !} register={register} register_name="name"type="text"  label="Name"  placeholder="Enter your name" />

       
       <InputField errors={errors.email !} register={register} register_name="email" type="email"  label="Email"  placeholder="Enter your email" />
       
       <InputField errors={errors.password !} register={register} register_name="password" type="password"  label="Email"/>
       
       <InputField errors={errors.password_confirmation !} register={register} register_name="password_confirmation" type="password"  label="password confirmation" />

      <div className="flex w-full justify-center items-center mt-5 capitalize">
        <PrimaryButton type="submit" children={<span>{t('register')}</span>} loading={loading} />
      </div>
      </form>
    </div>
  )
}

export default Register