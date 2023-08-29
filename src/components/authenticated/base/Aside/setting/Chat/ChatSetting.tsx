import { t } from "i18next";
import { SettingTypes } from "../types";
import { IoIosArrowBack } from 'react-icons/io';
interface ChatSettingProps {
  witch: (setting: SettingTypes) => void;
}
const ChatSetting = ({ witch }: ChatSettingProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-10 py-5">
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold capitalize">{t("Chat Configuration")}</h3>
        </div>

        <div className="flex items-center">
          <button className="sidebar-item" onClick={() => witch(SettingTypes.DEFAULT)}>
            <span className="sidebar-icon"><IoIosArrowBack /></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSetting