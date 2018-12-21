import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPasteComponent } from './show-paste.component';

describe('ShowPasteComponent', () => {
  let component: ShowPasteComponent;
  let fixture: ComponentFixture<ShowPasteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPasteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
