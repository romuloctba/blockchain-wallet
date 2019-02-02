import { Injectable, Inject } from '@angular/core';
import { Block } from './block';
import { Blockchain } from './blockchain';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchain: Blockchain;
  constructor(@Inject(`GENESIS`) GENESIS_BLOCK: Block, @Inject(`nodeUrl`) nodeUrl: string) {
    this.blockchain = new Blockchain(GENESIS_BLOCK, nodeUrl);
  }

  list() {
    return JSON.stringify(this.blockchain);
  }

  addTransaction(transaction: Transaction) {
    this.blockchain.addToPendingTransactions(transaction);
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
    return true;
    // broadcast
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
