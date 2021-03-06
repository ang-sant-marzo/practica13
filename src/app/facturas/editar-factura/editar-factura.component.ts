import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from 'src/app/servicios/facturas.service';
import { ValidateCif } from 'src/app/validators/cif.validator';

@Component({
  selector: 'app-editar-factura',
  templateUrl: './editar-factura.component.html',
  styleUrls: ['./editar-factura.component.css']
})
export class EditarFacturaComponent implements OnInit {

  formFra: FormGroup;
  importeIVA: number = 0;
  totalFra: number = 0;
  _id: any;

  constructor(private facturasService: FacturasService,
              private router: Router,
              private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.formFra = new FormGroup({
      cliente: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cif: new FormControl('', [ValidateCif]),
      fecha: new FormControl((new Date()).toISOString().substring(0,10)),
      baseImponible: new FormControl(0),
      tipoIVA: new FormControl(0.21),
      // importeIVA: new FormControl(0),
      // totalFra: new FormControl(0)
    })
    this.actualizarFra();
    this._id = this.ruta.snapshot.params._id;
    this.facturasService.getFactura(this._id)
                        .subscribe((resp: any) => {
                          this.formFra.patchValue(resp.factura);
                          // this.formFra.get(<campo>).pathValue(<resp.campoAPI>) Uno por cada input
                        },
                        (err: any) => {
                          console.log(err);
                        })
  }

  actualizarFra() {
    this.formFra.valueChanges.subscribe(objetoForm => {
      // this.formFra.get('importeIVA').patchValue(objetoForm.baseImponible * objetoForm.tipoIVA, {emitEvent: false} );
      // this.formFra.get('totalFra').patchValue(objetoForm.baseImponible + objetoForm.baseImponible * objetoForm.tipoIVA, {emitEvent: false} );
      this.importeIVA = objetoForm.baseImponible * objetoForm.tipoIVA;
      this.totalFra = objetoForm.baseImponible + objetoForm.baseImponible * objetoForm.tipoIVA;
    })
    // Si solo necesitas un campo this.formFra.get(<campo>).valueChanges.subscribe(//...)
  }

  editarFactura() {
    this.facturasService.putFactura(this._id, this.formFra.value)
                        .subscribe((resp: any) => {
                          this.router.navigate(['/']);
                        }, 
                        (err: any) => {
                          console.log(err);
                        })
  }

}
