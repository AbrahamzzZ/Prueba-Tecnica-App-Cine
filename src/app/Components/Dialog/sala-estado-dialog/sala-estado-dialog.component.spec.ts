import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaEstadoDialogComponent } from './sala-estado-dialog.component';

describe('SalaEstadoDialogComponent', () => {
  let component: SalaEstadoDialogComponent;
  let fixture: ComponentFixture<SalaEstadoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaEstadoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaEstadoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
