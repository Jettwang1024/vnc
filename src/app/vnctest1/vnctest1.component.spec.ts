import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vnctest1Component } from './vnctest1.component';

describe('Vnctest1Component', () => {
  let component: Vnctest1Component;
  let fixture: ComponentFixture<Vnctest1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vnctest1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vnctest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
