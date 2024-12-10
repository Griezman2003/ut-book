import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Libro } from '../libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibroDetalleService {

  constructor(private http: HttpClient) {} 

  getLibros(): Observable<{ libros: Libro[] }> {
    return this.http.get<{ libros: Libro[] }>('/assets/json/libros.json');
  }
  getLibroByTitulo(titulo: string): Observable<any> { 
    return this.getLibros().pipe( 
      map(libros => Array.isArray(libros['libros']) ? libros['libros'].find(libro => libro.titulo === titulo) : null)
    ); 
  }
}
