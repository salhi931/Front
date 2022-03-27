import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-piece-jointfacture',
  templateUrl: './piece-jointfacture.component.html',
  styleUrls: ['./piece-jointfacture.component.css']
})
export class PieceJOintfactureComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
   ngOnInit(): void {

  }

}
