import { Component } from '@angular/core';
import { LibroAgregarService } from '../service/libro-agregar.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-libro-agregar',
  imports: [FormsModule, NgIf],
  templateUrl: './libro-agregar.component.html',
  styleUrls: ['./libro-agregar.component.css']
})
export class LibroAgregarComponent {
  titulo: string = '';
  autor: string = '';
  pdfFile: File | null = null;
  imagenFile: File | null = null;
  mensaje: string = ''; 

  constructor(private libroService: LibroAgregarService) {}

  onFileChange(event: any): void {
    this.pdfFile = event.target.files[0];
  }

  onImageChange(event: any): void {
    this.imagenFile = event.target.files[0];
  }

  agregarLibro(): void {
    if (!this.titulo || !this.autor || !this.pdfFile || !this.imagenFile) {
      console.error('Por favor, complete todos los campos');
      this.mensaje = 'Por favor, complete todos los campos';
      return;
    }
    const formData = new FormData();
    formData.append('titulo', this.titulo);
    formData.append('autor', this.autor);
    formData.append('archivo_pdf', this.pdfFile!, this.pdfFile!.name);
    formData.append('imagen', this.imagenFile!, this.imagenFile!.name);

    this.libroService.agregarLibro(formData).subscribe({
      next: (response) => {
        console.log('Libro subido con éxito', response);
        this.mensaje = 'Libro subido con éxito';
      },
      error: (error) => {
        console.error('Error al subir el libro', error);
        this.mensaje = 'Error al subir el libro';
      }
    });
  }
}
