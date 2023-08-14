import React from 'react';
import moon from '../../assets/svgs/moon.svg';
import sun from '../../assets/svgs/sun.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeTheme, selectTheme } from '../../app/slices/settingSlices';

const ThemeSwitcer = () => {

  const dispatch = useAppDispatch();
 const theme = useAppSelector(selectTheme);

  const themeImage = () => {
    if(theme === 'theme-light') {
      return sun;
    } else if(theme === 'theme-dark') {
      return moon;
    }
    return sun;
  };

  const handleThemeChange = (t : string) => {
    dispatch(changeTheme(t))
    localStorage.setItem('theme', t);
  };

  return (
    <div className="dropdown dropdown-left z-20">
      <label tabIndex={0} className="btn m-1 bg-dropdown ">
          <img src={themeImage()}  className="w-4 h-4 object-contain " />
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 bg-dropdown-tab rounded-box w-20">
        <li >
          <button onClick={()=>handleThemeChange('theme-light')} value="en" className="btn btn-ghost btn-sm rounded-btn">
            <img src={sun} alt="English" className="w-6 h-4 object-contain" />
          </button>
        </li>
        <li>
        <button onClick={()=>handleThemeChange('theme-dark')} value="en" className="btn btn-ghost btn-sm rounded-btn">
            <img src={moon} alt="Myanmar" className="w-6 h-4 object-contain" />
        </button>

        </li>
      </ul>
</div>
  
  );
};

const MemorizedThemeSwitcer = React.memo(ThemeSwitcer);

export default MemorizedThemeSwitcer;
