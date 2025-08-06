import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPeliculaComponent } from './asignar-pelicula.component';

describe('AsignarPeliculaComponent', () => {
  let component: AsignarPeliculaComponent;
  let fixture: ComponentFixture<AsignarPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
