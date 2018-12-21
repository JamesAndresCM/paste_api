import { TestBed } from '@angular/core/testing';

import { PasteService } from './paste.service';

describe('PasteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasteService = TestBed.get(PasteService);
    expect(service).toBeTruthy();
  });
});
