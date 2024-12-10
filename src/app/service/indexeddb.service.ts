import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
  libros: {
    key: number;
    value: {
      id: number;
      titulo: string;
      autor: string;
      archivo_pdf: string;
      imagen_url: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;

  constructor() {
    this.dbPromise = openDB<MyDB>('LibrosDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('libros')) {
          db.createObjectStore('libros', { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  async addLibro(libro: { id: number; titulo: string; autor: string; archivo_pdf: string; imagen_url: string }) {
    const db = await this.dbPromise;
    await db.put('libros', libro);
  }

  async getAllLibros() {
    const db = await this.dbPromise;
    return await db.getAll('libros');
  }

  async getLibro(id: number) {
    const db = await this.dbPromise;
    return await db.get('libros', id);
  }
}
