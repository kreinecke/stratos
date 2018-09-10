import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcmeSupportInfoComponent } from './acme-support-info.component';

describe('AcmeSupportInfoComponent', () => {
  let component: AcmeSupportInfoComponent;
  let fixture: ComponentFixture<AcmeSupportInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcmeSupportInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcmeSupportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
