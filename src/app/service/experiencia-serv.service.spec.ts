import { TestBed } from '@angular/core/testing';

import { ExperienciaServService } from './experiencia-serv.service';

describe('ExperienciaServService', () => {
  let service: ExperienciaServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienciaServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
