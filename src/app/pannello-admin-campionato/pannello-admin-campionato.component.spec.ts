import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannelloAdminCampionatoComponent } from './pannello-admin-campionato.component';

describe('PannelloAdminCampionatoComponent', () => {
  let component: PannelloAdminCampionatoComponent;
  let fixture: ComponentFixture<PannelloAdminCampionatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannelloAdminCampionatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PannelloAdminCampionatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
