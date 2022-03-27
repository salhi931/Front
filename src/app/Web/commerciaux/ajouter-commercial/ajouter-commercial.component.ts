import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {GestionDesCommerciaux} from "../../../services/gestion-des-commerciaux";

@Component({
  selector: 'app-ajouter-commercial',
  templateUrl: './ajouter-commercial.component.html',
  styleUrls: ['./ajouter-commercial.component.css']
})
export class AjouterCommercialComponent implements OnInit {
  lat: any;
  lng: any;
  hide = true;
  // tslint:disable-next-line:variable-name
  status_com = true;
  accesCommande = true;
  accesFacutre = true;
  accesRetour = true;
  accesPaiement = true;
  constructor(public gestionDesCommerciaux: GestionDesCommerciaux) { }
  ngOnInit(): void {
  }
  // @ts-ignore
  map(event): any{
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  onSubmit(f: NgForm): void{
    const commercial =  f.value;
    commercial.lat = this.lat;
    commercial.lng = this.lng;
    console.log(f.value);
    this.gestionDesCommerciaux.AjoutCommercial(f);
  }
  EffacerCoordonnees(): any{
    this.lat = undefined;
    this.lng = undefined;

  }
}
