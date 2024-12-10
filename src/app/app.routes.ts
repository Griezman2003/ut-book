import { Routes } from '@angular/router';
import {LibroComponent} from './libro/libro.component';
import {LibroDetalleComponent} from './libro-detalle/libro-detalle.component'
import { LibroAgregarComponent } from "./libro-agregar/libro-agregar.component";

export const routes: Routes = [
    { path: '',component: LibroComponent},
    {path: 'acercade', component: LibroDetalleComponent},
    {path: 'libro-agregar', component: LibroAgregarComponent},
    { path: '**', redirectTo: '' },
];

