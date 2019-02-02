import { Component } from '@angular/core';
import { BlockchainService, Blockchain } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blockchain-wallet';
  blockchain: Blockchain;

  constructor(private blockchainService: BlockchainService) {
    // blockchain svc
    this.blockchain = blockchainService.blockchain;
  }
}
