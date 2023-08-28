import { ExpectedErrorType } from "../authenticated/Chat/types/ChatTypes"
import { useNavigate } from "react-router-dom";


interface ErrorProps {
    errors : ExpectedErrorType
}

const ErrorPage = ({errors} : ErrorProps) => {
    const navigate = useNavigate();
    //redirect to previous page
    const goBack = () => {
        navigate(-1)
    }
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold capitalize">{errors.status} | {errors.message}</h3>
                <button onClick={goBack}>
                    <span>Go Back</span>
                </button>
        </div>
    </div>
  )
}

export default ErrorPage