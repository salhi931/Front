import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-historique',
  templateUrl: './dialog-historique.component.html',
  styleUrls: ['./dialog-historique.component.css']
})
export class DialogHistoriqueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  lat = 0 //Number(this.data[0].lat);
  lng = 0 //Number(this.data[0].lng);
  ngOnInit(): void {
    console.log(this.data);
    this.lat = Number(this.data[0].lat);
    this.lng = Number(this.data[0].lng);
  }
  // @ts-ignore
  map(event): any{
    console.log(event.coords.lat);
    console.log(event.coords.lng);
  }
  string(i: number): any{
    return String(i);
  }

}
