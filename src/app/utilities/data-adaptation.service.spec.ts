import { TestBed } from '@angular/core/testing';

import { DataAdaptationService } from './data-adaptation.service';

describe('DataAdaptationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAdaptationService = TestBed.get(DataAdaptationService);
    expect(service).toBeTruthy();
  });
});
