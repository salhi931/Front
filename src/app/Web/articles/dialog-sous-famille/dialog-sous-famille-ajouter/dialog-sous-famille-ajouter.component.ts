import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-sous-famille-ajouter',
  templateUrl: './dialog-sous-famille-ajouter.component.html',
  styleUrls: ['./dialog-sous-famille-ajouter.component.css']
})
export class DialogSousFamilleAjouterComponent implements OnInit {
  description =  this.data.description;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
