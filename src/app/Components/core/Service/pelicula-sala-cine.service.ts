import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PeliculaSalaCine } from '../Interfaces/pelicula-sala-cine';

@Injectable({
  providedIn: 'root'
})
export class PeliculaSalaCineService {

  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5148/api/PeliculaSalaCine';

  constructor() { }

  lista() {
    return this.http.get<PeliculaSalaCine[]>(this.apiUrl);
  }

  buscarPorFechaPublicacion(fechaPublicacion: string) {
    return this.http.get<PeliculaSalaCine>(`${this.apiUrl}/fecha-publicacion/${fechaPublicacion}`);
  }

  registrar(peliculaSalaCine: PeliculaSalaCine) {
    return this.http.post(this.apiUrl, peliculaSalaCine);
  }
}
