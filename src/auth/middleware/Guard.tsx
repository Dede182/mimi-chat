import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { GuardProps } from "./types";


const Guard = ({ children } : GuardProps) => {

  const token = Cookies.get("token");
  if (token) return children;
  else return <Navigate to="/login" />;
};

export default Guard;