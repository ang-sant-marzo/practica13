import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './facturas/crear-factura/crear-factura.component';
import { EditarFacturaComponent } from './facturas/editar-factura/editar-factura.component';
import { ListadoFacturasComponent } from './facturas/listado-facturas/listado-facturas.component';

const routes: Routes = [
  {path: '', component: ListadoFacturasComponent},
  {path: 'crear-factura', component: CrearFacturaComponent},
  {path: 'editar-factura/:_id', component: EditarFacturaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
