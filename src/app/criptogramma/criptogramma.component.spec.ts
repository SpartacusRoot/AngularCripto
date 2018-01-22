import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriptogrammaComponent } from './criptogramma.component';


describe('CriptogrammaComponent', () => {
  let component: CriptogrammaComponent;
  let fixture: ComponentFixture<CriptogrammaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriptogrammaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriptogrammaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
