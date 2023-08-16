import Echo from 'laravel-echo';
import { EchoContract } from './Contracts/EchoManagerContract';

const options = {
    broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
      wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
      wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
      wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
      forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
      encrypted: false,
}


export class BaseEchoManager implements EchoContract
{
    public echo!: Echo | null;
  
    public setupEcho()
    { 
        if(!this.echo)
        {
            this.echo = new Echo(options); // Initialize Echo instance here
        }
        
    }
    getEcho(): Echo | null {
        return this.echo;
    }

}