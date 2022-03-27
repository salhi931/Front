import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OptimisationService} from "../../../services/optimisation.service";

@Component({
  selector: 'app-dialog-map',
  templateUrl: './dialog-map.component.html',
  styleUrls: ['./dialog-map.component.css']
})
export class DialogMapComponent implements OnInit {
  lat = 33.59431712676349;
  lng = -7.563056945800781;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public optimisationService: OptimisationService) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  // @ts-ignore
  map(event): any{
    console.log(event);
  }
}
