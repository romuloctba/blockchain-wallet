import { Blockchain } from './blockchain';
import { Block } from 'blockchain/lib/block';

describe('Blockchain', () => {
  it('should create an instance', () => {
    const mockGenesis = {} as any;
    expect(new Blockchain(mockGenesis, 'test')).toBeTruthy();
  });
});
