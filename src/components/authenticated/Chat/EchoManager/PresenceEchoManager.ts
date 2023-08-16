import { BaseEchoManager } from './BaseEchoManager';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequest } from '@/api/ApiRequest';


export class PresenceEchoManager extends BaseEchoManager{
  private channelName: string;
  private subscribedCallback: (() => void) | null = null;

  constructor(channelName: string, token: string) {
    console.log(token);
    super(token);
    this.channelName = channelName;
    this.setupEcho();

  }

  presenceSubscribe(subscribedCallback?: () => void) {
    this.subscribedCallback = subscribedCallback || null;
        
    this.echo!.join(this.channelName)
      .here((user : any) => {
        console.log('hesre');
        if (this.subscribedCallback) {
          this.subscribedCallback();
        }
        console.log(user)
      })
      .joining((user : any) => {
        console.log('joining');
      })
      
      
      return this.echo!.channel(this.channelName)
  }

  async sendMessage(message: string,user_id: number)  {

        return await ApiRequest({
          method: 'post',
          url: '/chat-message',
          params : {
            message : message,
            user_id : user_id
          }
        }).then(()=>{
          
        }).catch((err: any)=>{
          console.log(err)
        })
    
       }
  
  }



