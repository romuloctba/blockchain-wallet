import { BlockData } from './block-data';
import { Block } from './block';

describe('BlockData', () => {
  it('should create an instance', () => {
    expect(new BlockData({transactions: [], index: 1 } as Block)).toBeTruthy();
  });
});
