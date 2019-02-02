import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { ConectionComponent } from './conection/conection.component';
import { BlockchainService, Block, Transaction, BlockData } from 'projects/blockchain/src/public_api';

const GenesisProvider = () => {
  return new Block(1, 123, `123`, 'GENESIS', '00', []);
}

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
    {provide: 'nodeUrl', useValue: 'https://google.com'},
    BlockchainService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
