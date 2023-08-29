import { MemoExoticComponent } from "react";
import { IconType } from "react-icons";
import { SettingTypes } from "../types";
import { t } from "i18next";


interface SettingItemProps {
    title: string;
    description: string;
    Icon: MemoExoticComponent<IconType>;
    setting: SettingTypes;
    witch: (setting: SettingTypes) => void;
  }
export const SettingItem = ({ title, description, Icon, setting, witch }: SettingItemProps) => {
    return (
      <div className="flex justify-between items-center px-10 py-5 md:w-[27vw]">
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold capitalize">{t(title)}</h3>
          <p className="fade-text capitalize">{t(description)}</p>
        </div>
  
        <div className="flex items-center">
          <button className="sidebar-item" onClick={() => witch(setting)}>
            <span className="sidebar-icon"><Icon /></span>
          </button>
        </div>
      </div>
    )
  }
  