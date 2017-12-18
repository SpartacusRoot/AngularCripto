import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDecriptComponent } from './dialog-decript.component';

describe('DialogDecriptComponent', () => {
  let component: DialogDecriptComponent;
  let fixture: ComponentFixture<DialogDecriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDecriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDecriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
