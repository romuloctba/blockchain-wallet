import { Transaction } from './transaction';

export class Block {
    public index: number;
    public timestamp: number;
    public transactions: Transaction[] = [];
    public nonce: string;
    public hash: string;
    public previousHash: string;

    constructor (
        index: number, 
        timestamp: number, 
        nonce: string, 
        previousHash: string, 
        hash: string, 
        transactions: Transaction[] = []
        ) {

        this.index = index;
        this.timestamp = timestamp;
        this.nonce = nonce;
        this.previousHash = previousHash;
        this.hash = hash;
        this.transactions = transactions;
    }

}
