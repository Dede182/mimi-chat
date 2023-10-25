import { memo } from "react";
import { SettingTypes } from "../types";
import { IoIosArrowForward } from 'react-icons/io';
import { SettingItem } from "./SettingItem";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/app/slices/slices";
import { t } from "i18next";

interface DefaultSettingProps {
    changeCurrentSetting: (setting: SettingTypes) => void;
}

export const DefaultSetting = ({ changeCurrentSetting }: DefaultSettingProps) => {
    const MemorizedIosArrowIcon = memo(IoIosArrowForward);
    const user = useAppSelector(selectUser);

    return (
        <div className="flex flex-col gap-4">

            <div className="">
                <div
                    className={`chat-line flex gap-3  py-3 px-10 cursor-pointer`}>
                    {/* avatar */}
                    <div className={`avatar w-[20%]`}>
                        <div className="w-14 mask mask-squircle">
                            <img src={user?.profile_photo} />
                        </div>
                    </div>

                    {/* chat */}
                    <div className={`chat-message w-[60%] flex flex-col gap-1`}>
                        <div className={`flex justify-between`}>
                            <div className="capitalize">{user?.name}</div>
                        </div>
                        <div className={`text-xs fade-text`}>
                            {t('user')}
                        </div>
                    </div>

                </div>
            </div>

            <SettingItem title="Account" description='update your account detail' Icon={MemorizedIosArrowIcon} setting={SettingTypes.ACCOUNT} witch={changeCurrentSetting} />
            <SettingItem title="Chat" description='customize your chat' Icon={MemorizedIosArrowIcon} setting={SettingTypes.CHAT} witch={changeCurrentSetting} />
        </div>
    )
}

