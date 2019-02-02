import { Component, OnInit, Inject } from '@angular/core';
import { BlockchainService, Transaction } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.scss']
})
export class SendTransactionComponent implements OnInit {

  constructor(
    private blockchainService: BlockchainService, 
    @Inject('nodeUrl') private nodeUrl: string
    ) { }

  ngOnInit() {
  }

  send(amount: number, recipient: string) {
    console.log(`send ${amount} to ${recipient}`);
    const transaction = new Transaction(amount, this.nodeUrl, recipient);
    const result = this.blockchainService.addTransaction(transaction);
    if (result) {
      console.log(`Transaction added as pending to Block ${result}`);
    }

  }
}
