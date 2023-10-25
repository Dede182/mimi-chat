import { t } from "i18next";
import { SettingTypes } from "../types";
import { IoIosArrowBack } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeTheme, changeLanguage,selectLanguage, selectTheme } from "@/app/slices/settingSlices";
import { useCallback } from "react";
interface ChatSettingProps {
  witch: (setting: SettingTypes) => void;
}

interface ConfigData  {
  name: string,
  value: string
}

const themeData  : ConfigData[] = [
  {
    name: "Light",
    value: "theme-light"
  },
  {
    name: "Dark",
    value: "theme-dark"
  }
]

const LanguageData : ConfigData[] = [
  {
    name : "English",
    value: "en"
  },
  {
    name : "Burmese",
    value: "mm"
  }
]

const ChatSetting = ({ witch }: ChatSettingProps) => {
    const dispatch = useAppDispatch();
    const defaultTheme = useAppSelector(selectTheme);
    const defaultLanguage = useAppSelector(selectLanguage);

   const themeSwitch = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    dispatch(changeTheme(newValue));
    localStorage.setItem('theme', newValue);
}, [dispatch]);

  const languageSwitch = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    console.log(newValue)
    dispatch(changeLanguage(newValue));
    localStorage.setItem('language', newValue);

    window.location.href="/aside"
  }, [dispatch]);


  const languageSwitchSelect =  LanguageData.map((item, index) => {
    return (
      <option key={index} selected={item.value == defaultLanguage} value={item.value}>
        {item.name}
      </option>
    )
  })


  const themeSwitchSelect =  themeData.map((item, index) => {
    return (
      <option key={index} selected={item.value == defaultTheme} value={item.value}>
        {item.name}
      </option>
    )
  })

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

       {/* body */}
       <div className="flex flex-col gap-9  px-10 py-8">
              <div className="flex justify-between items-center">
              <h4 className={`text-lg ${defaultLanguage}`}>{t('Theme')}</h4>

              <select onChange={themeSwitch}>
                 {themeSwitchSelect}
              </select>
              </div>

              <div className="flex justify-between items-center">
              <h4 className="text-lg">{t('Language')}</h4>

              <select onChange={languageSwitch}>
                  {languageSwitchSelect}
              </select>
              </div>
        </div>

        {/* body end */}
    </div>
  )
}

export default ChatSetting