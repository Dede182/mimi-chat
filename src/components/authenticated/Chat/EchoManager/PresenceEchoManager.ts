import { BaseEchoManager } from './BaseEchoManager';
/* eslint-disable @typescript-eslint/no-explicit-any */
export class PresenceEchoManager extends BaseEchoManager{
  private channelName: string;
  private subscribedCallback: ((props : any) => void) | null = null;

  constructor(channelName: string, token: string) {
    super(token);
    this.channelName = channelName;
    this.setupEcho();
     this.presenceSubscribe();
  }

  presenceSubscribe(subscribedCallback?: (props:any) => void)  {
    this.subscribedCallback = subscribedCallback || null;
        
    this.echo!.join(this.channelName)
      .here((data : any) => {
        // console.log('channel in ' + this.channelName , data);
        if (this.subscribedCallback) {
          this.subscribedCallback(data);
        }
      })
      
      return this.echo!.join(this.channelName)
  }

  presenceUnsubscribe() {
    this.echo!.leave(this.channelName);
  }

  }



