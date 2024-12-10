import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro.model'; 
import { JsonService } from '../service/json.service'; 
import { IndexedDBService } from '../service/indexeddb.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../header/header.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-libro',
  imports: [HeaderComponent, NgIf, NgFor],
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {
  title = 'Libro';
  libros: Libro[] = [];

  constructor(
    private jsonService: JsonService,
    private indexedDBService: IndexedDBService
  ) {}

  ngOnInit(): void {
    this.jsonService.getLibros().subscribe({
      next: (data) => {
        this.libros = data.libros;
      },
      error: (error) => {
        console.error('Error al cargar libros', error);
      }
    });
  }

  imagenDefecto(event: Event): void { 
    (event.target as HTMLImageElement).src = 'assets/images/no_encontrado.avif'; 
  }

  trackByFn(index: number, libro: any): number {
    return libro.id; 
  }

  async descargarLibro(libro: Libro) {
    try {
      const responsePdf = await fetch('http://localhost:3000' + libro.archivo_pdf);
      const blobPdf = await responsePdf.blob();
      const pdfUrl = URL.createObjectURL(blobPdf);
      
      const responseImg = await fetch('http://localhost:3000' + libro.imagen_url);
      const blobImg = await responseImg.blob();
      const imgUrl = URL.createObjectURL(blobImg);

      await this.indexedDBService.addLibro({
        id: libro.id,
        titulo: libro.titulo,
        autor: libro.autor,
        archivo_pdf: pdfUrl,
        imagen_url: imgUrl
      });

      console.log('Libro descargado y guardado en IndexedDB');
      Swal.fire({
        title: '¡Éxito!',
        text: 'Libro descargado y guardado correctamente para lectura sin conexión.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error('Error al descargar y guardar el libro:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al descargar y guardar el libro.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  async obtenerLibroPdf(libroId: number): Promise<string> {
    const libro = await this.indexedDBService.getLibro(libroId);
    if (libro) {
      return libro.archivo_pdf;
    } else {
      throw new Error('Libro no disponible sin conexión');
    }
  }

  async abrirLibro(libroId: number) {
    try {
      const pdfUrl = await this.obtenerLibroPdf(libroId);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'El libro no está disponible primero debe descargarlo.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
}
