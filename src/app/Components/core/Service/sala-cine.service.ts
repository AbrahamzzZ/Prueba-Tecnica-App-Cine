import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SalaCine } from '../Interfaces/sala-cine';
import { SalaCineEstadoDto } from '../Dto/sala-cine-estado-dto';

@Injectable({
  providedIn: 'root'
})
export class SalaCineService {

  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:5148/api/SalaCine';

  constructor() { }

  lista() {
    return this.http.get<SalaCine[]>(this.apiUrl);
  }

  obtener(id: number) {
    return this.http.get<SalaCine>(`${this.apiUrl}/${id}`);
  }

  buscarPorNombre(nombre: string) {
    return this.http.get<SalaCineEstadoDto>(`${this.apiUrl}/nombre/${nombre}`);
  }

  registrar(salaCine: SalaCine) {
    return this.http.post(this.apiUrl, salaCine);
  }

  editar(salaCine: Partial<SalaCine>) {
    return this.http.put(`${this.apiUrl}/${salaCine.idSala}`, salaCine);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
