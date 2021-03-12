import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/servicios/facturas.service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: any
  loading: boolean = true;

  constructor(private facturasService: FacturasService) { }

  ngOnInit(): void {
    this.facturasService.getFacturas()
                        .subscribe((resp: any) => {
                          this.facturas = resp.facturas
                          this.loading = false;
                          console.log(this.facturas)
                        }, 
                        (err: any) => {
                          console.log(err);
                        })
  }

}
