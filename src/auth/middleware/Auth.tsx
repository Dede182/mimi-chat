import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { AuthProps } from "./types";


const Auth = ({ children } : AuthProps) => {
  const token = Cookies.get("token");
  if (token) {
    return <Navigate to="/chat" />;
  }
  return children;
};

export default Auth;