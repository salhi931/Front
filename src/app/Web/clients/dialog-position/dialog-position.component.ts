import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GestionClientsService} from "../../../services/gestionClients.service";

@Component({
  selector: 'app-dialog-position',
  templateUrl: './dialog-position.component.html',
  styleUrls: ['./dialog-position.component.css']
})
export class DialogPositionComponent implements OnInit {
  lat: any;
  lng: any;
  lat1: any;
  lng1: any;
  constructor(public gestionClientsService: GestionClientsService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.lat1 = this.data.lat;
    this.lng1 = this.data.lng;
  }
  // @ts-ignore
  map(event): any{
    if (event !== undefined){
      this.gestionClientsService.lat = event.coords.lat;
      this.gestionClientsService.lng = event.coords.lng;
      console.log( this.gestionClientsService.lat, this.gestionClientsService.lng);

    }

  }
  returnPosition(): any{
    return {lat: this.lat, lng: this.lng};
  }
}

