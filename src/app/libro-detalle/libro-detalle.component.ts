import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LibroDetalleService} from '../service/libro-detalle.service';
import {Libro} from '../libro.model';


@Component({
  selector: 'app-libro-detalle',
  imports: [],
  templateUrl: './libro-detalle.component.html',
  styleUrl: './libro-detalle.component.css'
})
export class LibroDetalleComponent {
}
