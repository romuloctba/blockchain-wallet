import { Transaction } from './transaction';
import { Block } from './block';
import { BlockData } from './block-data';
import { sha256 } from 'hash.js';

export class Blockchain {
    public chain: Block[];
    public pendingTransactions: Transaction[] = [];
    public nodeUrl: string;
    public networkNodes: string[] = [];

    constructor (GENESIS_BLOCK: Block, nodeUrl: string) {
        this.chain = [];
        this.pendingTransactions = [];
        this.nodeUrl = nodeUrl;
        this.networkNodes = [];
    }

    creatNewBlock(nonce: string | number, prevBlockHash: string, hash: string) {
        const newBlock = new Block(
            this.chain.length + 1,
            Date.now(),
            nonce.toString(),
            prevBlockHash,
            hash,
            this.pendingTransactions
        );

        this.pendingTransactions = [];
        this.chain.push(newBlock);

        return newBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(amount: number, sender: string, recipient: string) {
        const transaction = new Transaction(
            amount,
            sender,
            recipient
        )

        return transaction;
    }

    addToPendingTransactions(transaction: Transaction) {
        this.pendingTransactions.push(transaction);

        return this.getLatestBlock()//.index + 1;
    }

    hashBlock(prevBlockHash: string, currentBlock: BlockData, nonce: string | number) {
        const data = prevBlockHash + JSON.stringify(currentBlock) + nonce.toString();
        const hash = sha256().update(data).digest('hex');
        return hash;
    }

    minedNonce(prevBlockHash: string, currentBlockData: BlockData) {
        let nonce = 0;
        let hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);

        while (hash.substring(0, 2) !== '00') {
            nonce++;
            hash = this.hashBlock(prevBlockHash, currentBlockData, nonce);
        };

        return nonce;
    }

    validate(blockchain: Block[]) {
        // 1 validate genesis
        // 2 foreach block
        //  2-1 validate block hash
        //  2-2 compare with previous
        console.log(`isChain valid??? )`, blockchain);
        const ourGenesis = this.chain[0];
        const theirGenesis = blockchain[0];
        if (
            theirGenesis.nonce !== ourGenesis.nonce ||
            theirGenesis.hash !== ourGenesis.hash ||
            theirGenesis.previousHash !== ourGenesis.previousHash ||
            theirGenesis.transactions.length !== ourGenesis.transactions.length
            ) {
                return false;
            }
            for (let i =1; i < blockchain.length; i++) {
                const currentBlock = blockchain[i];
                const previousBlock = blockchain[i - 1];
                const currentBlockData = new BlockData(currentBlock);
                const blockHash = this.hashBlock(previousBlock.hash, currentBlockData, currentBlock.nonce);

                if (blockHash.substring(0, 2) !== '00') {
                    return false;
                }

                if (currentBlock.previousHash !== previousBlock.hash) {
                    return false
                }
            }
            return true;
    }
}
