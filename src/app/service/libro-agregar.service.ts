import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LibroAgregarService {
  private apiUrl = 'http://localhost:3000/subir-libro';

  constructor(private http: HttpClient) {}

  agregarLibro(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Error en la respuesta del servidor:', error);
        return throwError(error);
      })
    );
  }
}
