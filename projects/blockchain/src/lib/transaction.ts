import { v4 as uuid} from 'uuid';
export class Transaction {
    public amount: number;
    public sender: string;
    public recipient: string;
    public id: string;

    constructor(
        amount: number,
        sender: string,
        recipient: string
    ) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.id = uuid().split('-').join('');
    }
}
