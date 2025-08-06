import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaListComponent } from './pelicula-list.component';

describe('PeliculaListComponent', () => {
  let component: PeliculaListComponent;
  let fixture: ComponentFixture<PeliculaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
