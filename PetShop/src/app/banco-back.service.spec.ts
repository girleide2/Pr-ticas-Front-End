import { TestBed } from '@angular/core/testing';

import { BancoBackService } from './banco-back.service';

describe('BancoBackService', () => {
  let service: BancoBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancoBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
