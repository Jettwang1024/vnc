import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vnctest3Component } from './vnctest3.component';

describe('Vnctest3Component', () => {
  let component: Vnctest3Component;
  let fixture: ComponentFixture<Vnctest3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vnctest3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vnctest3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
