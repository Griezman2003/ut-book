import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from "../libro.model";

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private apiUrl = 'http://localhost:3000/libros';

  constructor(private http: HttpClient) { }

  getLibros(): Observable<{ libros: Libro[] }> {
    return this.http.get<{ libros: Libro[] }>(this.apiUrl);
  }
}
