import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { ConectionComponent } from './conection/conection.component';
import { BlockchainService, Block, Transaction, BlockData } from 'projects/blockchain/src/public_api';
import { MessageListenerService } from 'projects/blockchain/src/lib/message-listener.service';
import { WebSocketService } from 'projects/blockchain/src/lib/web-socket.service';

const GenesisProvider = () => {
  return new Block(1, 123, `123`, 'GENESIS', '00', []);
}
const WS_PORT = '80'; // always 80 at Heroku
const WS_URL = 'ws://angular-wallet-socket-server.herokuapp.com:'; // 'ws://localhost:';

@NgModule({
  declarations: [
    AppComponent,
    SendTransactionComponent,
    ConectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: 'GENESIS', useFactory: GenesisProvider},
    {provide: 'WS_URL', useValue: WS_URL + WS_PORT },
    BlockchainService,
    MessageListenerService,
    WebSocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
