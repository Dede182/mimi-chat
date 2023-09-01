import { AuthUser } from '@/@types/users'
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next'
import {  MouseEvent, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { editFormValidations } from './validation';
import InputField from '@/components/guest/InputField';
import { modifiedAxiosResponse, updateProfile } from '@/api/auth/AuthRequest';
import { ClipLoader } from 'react-spinners';
import { useAppDispatch } from '@/app/hooks';
import { changeUserInfo } from '@/app/slices/auth/UserSlice';
import { alertToast } from '@/components/tools/Toast/AlertToast';

export interface EditForm {
    name: string,
    email: string,
    phone: string | null | undefined
}

const ProfileInfoEdit = ({ user }: { user: AuthUser }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [fails, setFails] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditForm>({
        resolver: yupResolver(editFormValidations)
    });
    const joinedDate = new Date(user!.created_at!).toLocaleDateString();

    const switchEdit = useCallback(
        (e : MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setEdit(!edit);
        },
        [edit]
    )

    useEffect(() => {
        if (user) {
            setValue('name', user.name);
            setValue('email', user.email);
            setValue('phone', user.phone);
        }
    }, [setValue, user])

    const onSubmit = async (data: EditForm) => {
        setLoading(true);
        await updateProfile(data)
            .then((res ) => {
                if (res && res.status === 200) {
                    console.log(res);
                    setEdit(false);
                    if(res.data ){
                        dispatch(changeUserInfo(res.data.data));
                    }
                }
                else{
                    alertToast({icon: 'error',title : res.response.status + ' operation failed'});
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 px-10">

            <div className="flex items-center" >
                <div className="w-1/3">
                    <label className="text-sm font-bold">{t("Name")}</label>
                </div>
                <div className="w-2/3">
                    <InputField errors={errors.name!} disabled={!edit} register={register} register_name="name" type="text" label="" />
                </div>
            </div>

            <div className="flex items-center" >
                <div className="w-1/3">
                    <label className="text-sm font-bold">{t("Phone Number")}</label>
                </div>
                <div className="w-2/3">
                    <InputField errors={errors.phone!}
                        disabled={!edit} register={register} register_name="phone" type="text" label="" />
                </div>
            </div>
            <div className="flex items-center" >
                <div className="w-1/3">
                    <label className="text-sm font-bold">{t("Email")}</label>
                </div>
                <div className="w-2/3">
                    <InputField errors={errors.email!}
                        disabled={!edit} register={register} register_name="email" type="email" label="" />
                </div>
            </div>

            <div className="flex items-center" >
                <div className="w-1/3">
                    {/* joined aat */}
                    <label className="text-sm font-bold">{t("Joined At")}</label>
                </div>
                <div className="w-2/3">
                    <span>{joinedDate}</span>
                </div>
            </div>

            <div className="flex item-center justify-between">
                <div className=""></div>
                <div className="">
                    {edit ?
                        <button type='submit' disabled={loading} className="btn btn-primary">
                            {loading ? <ClipLoader size={15} color="#fff" /> : t("Update")}
                        </button>
                        :
                        <button type="button" onClick={switchEdit} className="btn btn-soft">{t("edit mode")}</button>}
                </div>
            </div>
        </form>
    )
}

export default ProfileInfoEdit