import { t } from "i18next"
import Cookies from "js-cookie"

const logout = () => {
  Cookies.remove("token")
  window.location.href = "/login"
}
const Chat = () => {

    //remove cookie
  
  return (
    <div>
      <p>{t('welcome')}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Chat