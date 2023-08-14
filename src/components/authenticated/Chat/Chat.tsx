import Cookies from "js-cookie"
const Chat = () => {

    //remove cookie
 Cookies.remove('token')
  return (
    <div>Chat</div>
  )
}

export default Chat