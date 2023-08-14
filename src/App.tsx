import { useAppSelector } from "./app/hooks";
import { selectLanguage, selectTheme } from "./app/slices/settingSlices";
import RoutesComponent from "./routes/Routes";


const App = () => {
  const theme  = useAppSelector(selectTheme)
  const language = useAppSelector(selectLanguage)

  console.log(language)
  // i18n.changeLanguage('mm');
  return (
    <div className={`${theme} theme w-full h-[100vh]`}>
      <RoutesComponent />
    </div>
  );
};



export default App