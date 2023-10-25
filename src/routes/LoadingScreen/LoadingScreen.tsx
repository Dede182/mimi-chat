import LogoSvg from "@/components/svgs/Logo/logo"
const LoadingScreen = () => {

    const title = import.meta.env.VITE_REACT_APP_TITLE;
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex items-center flex-col gap-4 mb-16 ">
            <LogoSvg /> 
            <h3 className="text-xl md:text-2xl loading-title">
                {title}
            </h3>
        </div>
    </div>
  )
}

export default LoadingScreen