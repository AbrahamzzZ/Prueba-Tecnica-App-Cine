import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pelicula } from '../Interfaces/pelicula';
@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5148/api/Pelicula';

  constructor() { }

  lista() {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  obtener(id: number) {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  buscarPorNombre(nombre: string) {
    return this.http.get<Pelicula>(`${this.apiUrl}/nombre/${nombre}`);
  }

  registrar(pelicula: Pelicula) {
    return this.http.post(this.apiUrl, pelicula);
  }

  editar(pelicula: Partial<Pelicula>) {
    return this.http.put(`${this.apiUrl}/${pelicula.idPelicula}`, pelicula);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
