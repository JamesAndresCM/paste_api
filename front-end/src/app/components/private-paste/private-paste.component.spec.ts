import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePasteComponent } from './private-paste.component';

describe('PrivatePasteComponent', () => {
  let component: PrivatePasteComponent;
  let fixture: ComponentFixture<PrivatePasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
