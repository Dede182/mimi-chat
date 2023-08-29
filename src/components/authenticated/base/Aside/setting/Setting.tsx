import CloseBtn from "@/components/tools/CloseBtn"
import { t } from "i18next"
import { SettingTypes } from "./types";
import { Suspense, lazy, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { DefaultSetting } from "./DefaultSetting/DefaultSetting";
const AccountSetting = lazy(() => import('./Account/AccountSetting'));
const ChatSetting = lazy(() => import('./Chat/ChatSetting'));

const renderAside = (aside: SettingTypes, chg: (setting: SettingTypes) => void) => {
  switch (aside) {
    case SettingTypes.DEFAULT:
      return <DefaultSetting changeCurrentSetting={chg} />
    case SettingTypes.ACCOUNT:
      return <AccountSetting witch={chg} />
    case SettingTypes.CHAT:
      return <ChatSetting witch={chg} />
    default:
      return <DefaultSetting changeCurrentSetting={chg} />;
  }
}

const Setting = () => {
  const [currentSetting, setCurrentSetting] = useState<SettingTypes>(SettingTypes.DEFAULT);

  const changeCurrentSetting = (setting: SettingTypes) => {
    setCurrentSetting(setting);
  }
  return (
    <div className="animate__animated animate__fadeIn z-50 relative md:max-w-[30vw] h-[100vh]  ">
      <div className="flex flex-col pt-6  gap-4 h-full">

        <div className="flex justify-between items-center px-10">
          <div className="recent-header flex flex-col gap-1 ">
            <h3 className="text-3xl font-bold capitalize">{t('Settings')}</h3>
            <p className="text-gray-500 capitalize">{t('change your app setting')}</p>
          </div>

          <div className="flex gap-4">
            <CloseBtn />
          </div>
        </div>

        <Suspense fallback={
          <div className="flex px-10 gap-8">
            <Skeleton height="10vh" baseColor='#96969613' className='w-[80vw] md:w-[18vw]' highlightColor='#6f6e6e13' count={7} />
          </div>}>
          {
            renderAside(currentSetting, changeCurrentSetting)
          }
        </Suspense>

      </div>
    </div>
  )
}

export default Setting