import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDesColisService} from "../../../services/gestion-des-colis.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dialog-colis',
  templateUrl: './dialog-colis.component.html',
  styleUrls: ['./dialog-colis.component.css']
})
export class DialogColisComponent implements OnInit {
  filtrage: any;
  listOld: any = [];
  listSupprimees: any = [];
  list: any = [];
  displayedColumns: string[] = ['N.o', 'Description', 'date', 'Selectionner' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDesColisService: GestionDesColisService) { }

  ngOnInit(): void {
    this.gestionDesColisService.getVisiteColis()
      .subscribe(dataa => {
        this.gestionDesColisService.visites_colis = dataa;
        this.gestionDesColisService.getColis()
          .subscribe(data => {
            console.log(data);
            for (const coli of data){
              coli.statuss = this.gestionDesColisService.getStatusVisiteColis(coli.id_colis, this.data);
              coli.possible = this.gestionDesColisService.getPossibiliteDAffectation(coli.id_colis, this.data);
              console.log(coli);
            }
            this.dataSource = new MatTableDataSource(data) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
          });
      });

  }
  OnModifier(id: number): void {

  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator; }, 10);
  }
  save(): any{
    this.gestionDesColisService.saveVisiteColis(this.data, this.list, this.listOld);

  }
  onSelect( element: any): any{
      console.log(element);
      if (element.statuss) {
        let i = 0;
        this.list.push(element.id_colis);
        console.log(this.list);
        // ajouter a la liste de suppression
        for (const vr of this.listOld){
          if (vr === element.id_colis){
            this.listOld.splice(i, 1);
          }
          i += 1;
        }
      }
      else {
        console.log('on est 72:' + element.statuss);
        let i = 0;
        this.listOld.push(element.id_colis);
        console.log('on est 75:' + this.listOld);
        for (const vr of this.list){
          if (vr === element.id_colis){
            this.list.splice(i, 1);
          }
          i += 1;
        }
      }

  }
}
