import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaFormComponent } from './pelicula-form.component';

describe('PeliculaFormComponent', () => {
  let component: PeliculaFormComponent;
  let fixture: ComponentFixture<PeliculaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
