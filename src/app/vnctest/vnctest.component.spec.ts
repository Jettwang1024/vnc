import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnctestComponent } from './vnctest.component';

describe('VnctestComponent', () => {
  let component: VnctestComponent;
  let fixture: ComponentFixture<VnctestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnctestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VnctestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
