import React from 'react';
import { useTranslation } from 'react-i18next';
import { languagesImg } from '../../assets/images/languagesFlags/lang';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeLanguage, selectLanguage } from '../../app/slices/settingSlices';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const language = useAppSelector(selectLanguage);

  const languageImage = () => {
    if(language === 'en') {
      return languagesImg.en;
    } else if(language === 'mm') {
      return languagesImg.mm;
    }
  };

  const handleLanguageChange = (selectedLanguage : string) => {
    localStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    dispatch(changeLanguage(selectedLanguage));
    
  };

  return (
    <div className="dropdown dropdown-left z-20">
      <label tabIndex={0} className="btn m-1 bg-dropdown">
          <img src={languageImage()}  className="w-4 h-4  object-contain " />
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-dropdown-tab rounded-box w-20">
        <li>
          <button onClick={()=>handleLanguageChange('en')} value="en" className="language-btn">
            <img src={languagesImg.en} alt="English" className="language-flag-img" />
          </button>
        </li>
        <li>
        <button onClick={()=>handleLanguageChange('mm')} value="en" className="language-btn">
            <img src={languagesImg.mm} alt="Myanmar" className="language-flag-img" />
        </button>

        </li>
      </ul>
</div>
  
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sameLanguageSwitcher = ({localstorageLanguage : prevProps} :any , {localstorageLanguage :nextProps} : any) => {
  return prevProps === nextProps;
}

const MemorizedLanguageSwitcher = React.memo(LanguageSwitcher, sameLanguageSwitcher);

export default MemorizedLanguageSwitcher;
