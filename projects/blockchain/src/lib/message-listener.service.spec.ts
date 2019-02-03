import { TestBed } from '@angular/core/testing';

import { MessageListenerService } from './message-listener.service';

describe('MessageListenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageListenerService = TestBed.get(MessageListenerService);
    expect(service).toBeTruthy();
  });
});
