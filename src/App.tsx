import { useAppSelector } from "./app/hooks";
import { selectTheme } from "./app/slices/settingSlices";
import RoutesComponent from "./routes/Routes";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const App = () => {
  const theme = useAppSelector(selectTheme)
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
      wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
      wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
      wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
      forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      encrypted: false,
  })


  return (
    <div className={`${theme} theme w-full max-h-[100vh] transition-all`}>
      <RoutesComponent />
    </div>
  );
};



export default App