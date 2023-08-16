import { BaseEchoManager } from './BaseEchoManager';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequest } from '@/api/ApiRequest';


export class PublicEchoManager extends BaseEchoManager{
  private channelName: string;
  private subscribedCallback: (() => void) | null = null;

  constructor(channelName: string) {
    super();
    this.channelName = channelName;
    this.setupEcho();
  }

  publicSubscribe(subscribedCallback?: () => void) {
    this.subscribedCallback = subscribedCallback || null;
        
    this.echo!.channel(this.channelName)
      .subscribed(() => {
        if (this.subscribedCallback) {
          this.subscribedCallback();
        }
      })
      
      
      return this.echo!.channel(this.channelName)
  }

  async sendMessage(message: string)  {
        console.log(message);
        return await ApiRequest({
          method: 'post',
          url: '/chat-message',
          params : {
            message : message
          }
        }).then((res: any)=>{
          console.log(res)
        }).catch((err: any)=>{
          console.log(err)
        })
    
        console.log('sent')
       }
  
  }



