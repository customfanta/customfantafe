import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSingoloCampionatoComponent } from './dashboard-singolo-campionato.component';

describe('DashboardSingoloCampionatoComponent', () => {
  let component: DashboardSingoloCampionatoComponent;
  let fixture: ComponentFixture<DashboardSingoloCampionatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSingoloCampionatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSingoloCampionatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
