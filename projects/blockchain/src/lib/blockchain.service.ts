import { Injectable, Inject } from '@angular/core';
import { Block } from './block';
import { Blockchain } from './blockchain';
import { Transaction } from './transaction';
import { BroadcastMessage } from './broadcast-message';
import { MessageListenerService } from './message-listener.service';
import { SOCKETMESSAGES } from './socket-messages.enum';
@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchain: Blockchain;
  public received: any[] = [];
  constructor(
    @Inject(`GENESIS`) GENESIS_BLOCK: Block, 
    @Inject(MessageListenerService) private messageService: MessageListenerService
    ) {
    this.blockchain = new Blockchain(GENESIS_BLOCK);
    messageService.messages
    .subscribe((msg: BroadcastMessage) => {
      this.received.push(msg);
      if (!this.blockchain.networkNodes.includes(msg.author)) {
        console.error('Received msg will not be accepted for its author is not known. ', msg);
        return;
      }
      console.log("Accepted MSG:", msg);
      // perform action like remoteActions[msg.action](msg.data) 
    });
  }

  list() {
    return JSON.stringify(this.blockchain);
  }

  addTransaction(transaction: Transaction) {
    return this.blockchain.addToPendingTransactions(transaction);
  }

  addNode(nodeUrl: string) {
    console.log('trying to add nodeUrl ', nodeUrl);
    if (
      this.blockchain.networkNodes.includes(nodeUrl) || 
      this.blockchain.nodeUrl === nodeUrl
    ) {
      return false;
    }
    
    this.blockchain.networkNodes.push(nodeUrl);
    this.sendMessage(SOCKETMESSAGES.ADD_NODE, this.blockchain.nodeUrl);
    return true;
    // broadcast
  }  
  
  sendMessage(action: string, message: any) {
    const msg = { action, author: this.blockchain.nodeUrl, message };
    console.log(`Sending new msg `, msg);
    this.messageService.messages.next(msg);
  }

  mine() {
    const latestBlock = this.blockchain.getLatestBlock();
    const previousHash = latestBlock.hash;
    const currentBlockData = {
      transactions: this.blockchain.pendingTransactions,
      index: latestBlock.index + 1
    }
    const nonce = this.blockchain.minedNonce(previousHash, currentBlockData);
    const hash = this.blockchain.hashBlock(previousHash, currentBlockData, nonce);

    const block = this.blockchain.creatNewBlock(nonce, previousHash, hash);

    if (
      latestBlock.hash === block.previousHash &&
      block.index === latestBlock.index + 1
      ) {
        return true;
      } else {
        return false;
      }
  }

}
