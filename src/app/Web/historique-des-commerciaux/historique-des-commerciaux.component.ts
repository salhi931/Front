import {Component, OnInit, ViewChild} from '@angular/core';
 import {NgForm} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogHistoriqueComponent} from './dialog-historique/dialog-historique.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { SuivieService } from 'src/app/services/Suivie.service';

@Component({
  selector: 'app-historique-des-commerciaux',
  templateUrl: './historique-des-commerciaux.component.html',
  styleUrls: ['./historique-des-commerciaux.component.css']
})
export class HistoriqueDesCommerciauxComponent implements OnInit {

  constructor(public dialog: MatDialog, public suivieService: SuivieService) { }
  displayedColumns: string[] = ['id ', 'Commercial', 'Description', 'Date', 'consulter', 'delete'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  commerciaux: any;
  histprique1: any;
  Suivie1: any;
  ngOnInit(): void {
    this.suivieService.getCommerciaux1()
      // @ts-ignore
      .subscribe(data1 => {
        this.commerciaux = data1;
        // @ts-ignore
        this.suivieService.getHistorique().subscribe(data2 => {
          this.dataSource = data2;
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator; }, 10);
        });
        // @ts-ignore
      }, error => {console.log(error.message); });

  }
   openDialog(positions: any): void{
    this.dialog.open(DialogHistoriqueComponent, {data: positions});
  }
  onSubmitt(f: NgForm): any{
    console.log(f.value);
    this.suivieService.OnEnregistrerHistorique(f);
  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
  OnConsulter(id: number): any{
    let positions: any;
    this.suivieService.getHistoriquePosition(id)
      .subscribe(data => {
        positions = data;
        console.log(positions);
        this.openDialog(positions);
      });
  }
  histprique(){
    this.Suivie1 = false;
    this.histprique1 = true;
  }
  Suivie(){
    this.histprique1 = false;
    this.Suivie1 = true;
  }
  OnSupprimer(id: number): any{

  }
}
