import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRutinaSemanalComponent } from './ver-rutina-semanal.component';

describe('VerRutinaSemanalComponent', () => {
  let component: VerRutinaSemanalComponent;
  let fixture: ComponentFixture<VerRutinaSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerRutinaSemanalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerRutinaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
