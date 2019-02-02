import { Component, OnInit, Inject } from '@angular/core';
import { BlockchainService } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-conection',
  templateUrl: './conection.component.html',
  styleUrls: ['./conection.component.scss']
})
export class ConectionComponent implements OnInit {

  constructor(
    private blockchainService: BlockchainService,
    @Inject('nodeUrl') private nodeUrl: string
    ) { }

  ngOnInit() {
  }

  connect(nodeUrl: string) {
    const result = this.blockchainService.addNode(nodeUrl);
    console.log(`Connect to ${nodeUrl} result ${result}`);
  }
}
