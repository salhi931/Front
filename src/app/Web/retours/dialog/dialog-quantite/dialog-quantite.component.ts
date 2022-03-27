import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GestionDesRetoursService} from "../../../../services/gestion-des-retours.service";

@Component({
  selector: 'app-dialog-quantite',
  templateUrl: './dialog-quantite.component.html',
  styleUrls: ['./dialog-quantite.component.css']
})
export class DialogQuantiteComponent implements OnInit {
  quantite: any;
  motif: any;
  variable = {quantite : 0, motif: ''};
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public ges: GestionDesRetoursService) { }
  ngOnInit(): void {
  }

}
