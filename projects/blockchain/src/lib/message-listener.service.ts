import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { WebSocketService } from './web-socket.service';
import { BroadcastMessage } from 'projects/blockchain/src/lib/broadcast-message';

export interface Message {
  author: string,
  message?: string,
  action: string
}

@Injectable({
  providedIn: 'root'
})
export class MessageListenerService {
  public messages: Subject<BroadcastMessage>;
  
  constructor(wsService: WebSocketService, @Inject('WS_URL') private WS_URL: string) {
    this.messages = <Subject<BroadcastMessage>>wsService
      .connect(this.WS_URL)
      .pipe(
        filter((response: MessageEvent) => {
          try {
            const data = JSON.parse(response.data);
            return data.author;
          } catch (e) {
            return false;
          }
        }),
        map((response: MessageEvent): BroadcastMessage => {
          const data = JSON.parse(response.data);
            return {
              author: data.author,
              data: data.message,
              action: data.action
            }
        })
      )
  }
}
