import LogoSvg from "@/components/svgs/Logo/logo"
import { BarLoader } from "react-spinners";
const LoadingScreen = () => {

    const title = import.meta.env.VITE_REACT_APP_TITLE;
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex items-center flex-col gap-4 mb-16 ">
            <LogoSvg /> 
            <h3 className="text-xl md:text-2xl">
                {title}
            </h3>
            <BarLoader height={7} width={220} color="#fae820"/>
        </div>
    </div>
  )
}

export default LoadingScreen