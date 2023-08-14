import './style.scss'
import MemorizedLanguageSwitcher from './LanguageSwitcer'
import MemorizedThemeSwitcer from './ThemeSwitcer'
import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../app/slices/settingSlices'


const FloatSetting = () => {

  const theme  = useAppSelector(selectTheme)

  return (
    <div className={`${theme} theme float-setting`}>
        <div className="float-setting-item">
            <MemorizedLanguageSwitcher />
        </div>
        <div className="float-setting-item">
            <MemorizedThemeSwitcer />
        </div>
    </div>
  )
}

export default FloatSetting