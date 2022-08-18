import { TestBed } from '@angular/core/testing';

import { EduServService } from './edu-serv.service';

describe('EduServService', () => {
  let service: EduServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EduServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
