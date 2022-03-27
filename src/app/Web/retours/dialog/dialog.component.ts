import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DialogRetourComponent} from '../dialog-retour/dialog-retour.component';
import {GestionDesRetoursService} from '../../../services/gestion-des-retours.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DialogStockComponent} from "../../stock/dialog-stock/dialog-stock.component";
import {DialogQuantiteComponent} from "./dialog-quantite/dialog-quantite.component";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, public gestionDesRetoursService: GestionDesRetoursService) { }

  displayedColumns: string[] = ['N.o', 'client', 'codeArticle', 'NomArticle', 'motif', 'quantite', 'quantiteApprouvee', 'edit'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
  displayedColumns2: string[] = ['N.o', 'codeArticle', 'NomArticle', 'motif', 'quantite']; //, 'edit'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort2: MatSort;
  dataSource2 = new MatTableDataSource([]) ;
  TableClient = true;
  Data1: any = [];
  Data10: any = [];
  openDialog(element: any): void{
    const dialogref = this.dialog.open(DialogQuantiteComponent , { height: '220px', width: '300px'});
    dialogref.afterClosed().subscribe(data => {
      console.log(this.Data1);
      for (const data1 of this.Data1) {
        // @ts-ignore
        if (data1.id === element.id){
          if (this.gestionDesRetoursService.variable.quantite > 0){
            // @ts-ignore
            data1.quantiteApprouvee = this.gestionDesRetoursService.variable.quantite;
          }
          if (this.gestionDesRetoursService.variable.motif !== ''){
            // @ts-ignore
            data1.motif = this.gestionDesRetoursService.variable.motif;
          }
        }
      }
      if (this.gestionDesRetoursService.variable.quantite > 0){
        element.quantiteApprouvee = this.gestionDesRetoursService.variable.quantite;
        console.log(this.gestionDesRetoursService.variable);
      }
      if (this.gestionDesRetoursService.variable.motif !== '') {
        element.motif = this.gestionDesRetoursService.variable.motif;
        console.log(this.gestionDesRetoursService.motif);
      }
      this.gestionDesRetoursService.variable.quantite = 0;
      this.gestionDesRetoursService.variable.motif = '';
      }, error => {
      console.log(error.message);
    });
  }
  onModifier(element: any): void{
    this.openDialog(element);
  }
  ngOnInit(): void {
    this.getRetours();
    console.log(this.data);
  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
  getRetours(): any{
    this.gestionDesRetoursService.getRetoursCommercial(this.data)
      .subscribe(data1 => {
        this.Data1 = data1;
        console.log(this.Data1);
        for (const detail of this.Data1)
        {
          // @ts-ignore
          detail.quantiteApprouvee = detail.quantite;
        }
        this.dataSource = new MatTableDataSource(this.Data1) ;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 100);
      });
  }
  ValiderRetours(): any{
    if (confirm('Êtes-vous sûr de valider ces retours')) {
      this.gestionDesRetoursService.ValiderTousLesretoursDetails(this.data, this.Data1)
        .subscribe(data => (
          console.log('Les retours selectionnees sont approuves avec succes')
        ), error => {alert(error.message); });
    }
  }
  Acrticle_motifs(): any{
    // let List: any[];
    // @ts-ignore
    const Listt: [] = [];
    this.Data10 = this.Data1;
    // @ts-ignore
    const Data2: Array<any> = this.Data1;
    console.log(this.dataSource.filteredData);
    // @ts-ignore
    //for (let i = 0; i++; i<2)
    for (const ligne of this.dataSource.filteredData){
      const ligne1 = ligne;
      // @ts-ignore
      if (this.gestionDesRetoursService.rechercheElement(Listt, ligne1) === -1 ){
          // @ts-ignore
        Listt.push(ligne1);
      }
      else{
        // @ts-ignore
        console.log(Listt[this.gestionDesRetoursService.rechercheElement(Listt, ligne1)]);
        // @ts-ignore
        const quantiteApprouvee = Listt[this.gestionDesRetoursService.rechercheElement(Listt, ligne1)].quantiteApprouvee + ligne1.quantiteApprouvee;
        // @ts-ignore
        Listt[this.gestionDesRetoursService.rechercheElement(Listt, ligne1)].quantiteApprouvee = quantiteApprouvee;
      }
    }
    // @ts-ignore
    console.log(Listt);
    //console.log(this.Data1);
    // @ts-ignore
    this.dataSource2 = new MatTableDataSource(Listt) ;
    setTimeout(
      () => {
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      }, 100);
    console.log(this.Data1)
    //this.getRetours();
    this.TableClient = false;
  }
  Precedent(): any{
    //this.Data1 = this.Data10
    this.TableClient = true;
  }
  exportTable(): void{
      this.gestionDesRetoursService.exportToPdf('ExampleTable2');
  }
}
