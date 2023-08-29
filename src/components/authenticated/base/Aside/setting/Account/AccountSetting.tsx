import { t } from "i18next";
import { SettingTypes } from "../types";
import { IoIosArrowBack } from 'react-icons/io';
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/app/slices/slices";
import ProfilePhotoEdit from "./ProfilePhotoEdit";

interface AccountSettingProps {
  witch: (setting: SettingTypes) => void;
}
const AccountSetting = ({ witch }: AccountSettingProps) => {

  const user = useAppSelector(selectUser);
  return (
    <div className="flex flex-col md:w-[27vw]">
      <div className="flex justify-between items-center px-10 py-5">
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold capitalize">{t("Account")}</h3>
        </div>

        <div className="flex items-center">
          <button className="sidebar-item" onClick={() => witch(SettingTypes.DEFAULT)}>
            <span className="sidebar-icon"><IoIosArrowBack /></span>
          </button>
        </div>

      </div>

      <div className="flex flex-col">
            <ProfilePhotoEdit user={user !} />
        </div>
    </div>
  )
}

export default AccountSetting