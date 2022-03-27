import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesFacturesService} from '../../services/Gestion-des-factures.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigurationService} from '../../services/configuration.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GestionDesRetoursService} from '../../services/gestion-des-retours.service';
import {MatSort} from '@angular/material/sort';
import {formatDate} from '@angular/common';
import {MatDialog} from "@angular/material/dialog";
import {DialogRetourComponent} from "./dialog-retour/dialog-retour.component";
import {DialogComponent} from "./dialog/dialog.component";
import {DialogPaiementComponent} from "../paiement/dialog-paiement/dialog-paiement.component";

@Component({
  selector: 'app-retours',
  templateUrl: './retours.component.html',
  styleUrls: ['./retours.component.css']
})
export class RetoursComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog, public gestionDesRetoursService: GestionDesRetoursService, private router: Router,
              private route: ActivatedRoute, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['N.o', 'num_facture', 'nom_client', 'total_ttc', 'status', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  Total: any = 0;
  Touslesretours = false;
  clients: any[] = [];
  retours: any[] = [];
  retoursFilter2: any;

  // tslint:disable-next-line:variable-name
  commercial_id_selected: any;
  dateSelected: any;

  ngAfterViewInit(): any {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.gestionDesRetoursService.getCommericaux();
    this.gestionDesRetoursService.getClients();
    // this.configurationService.getConfiguration();
    this.getretours2();
  }

  openDialog(): void{
    const list = [];
    if (this.dataSource.filteredData.length > 0){
        for (const retour of this.dataSource.filteredData){
          // @ts-ignore
          if (retour.status === false){
            // @ts-ignore
            list.push(retour.idRetour);
          }
        }
        const dialogref = this.dialog.open(DialogComponent, {data: list, height: '800px', width: '1300px'} );
        dialogref.afterClosed().subscribe(data => {
          console.log(data);
          this.getretours2();
          setTimeout(() => {this.DateAndCommercialFilter(); }, 50 );
          //console.log();
        }, error => {
          console.log(error.message);
      });
    }
  }
  ValiderLesRetoursAffiche(): void{

    const listRetour = [];
    for (const retour of this.dataSource.filteredData){
      // @ts-ignore
      listRetour.push(retour.idRetour);
    }
    /*  this.gestionDesRetoursService.ValiderTousLesretours(listRetour)
        .subscribe(data => (
          console.log('succes')
        ), error => {alert(error.message); }); */
    this.dataSource = new MatTableDataSource([]);
    this.getretours2();
    setTimeout(() => {this.DateAndCommercialFilter(); }, 50 );
    console.log(listRetour);
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    this.Total = 0;
    // @ts-ignore
    this.dataSource.filteredData.forEach(current  => this.Total += current.total_TTC) ;
  }

  DateAndCommercialFilter(): any{
      let retoursfiltered = this.retours;
      if ( this.dateSelected !== '' && this.dateSelected !== null && this.dateSelected !== undefined){
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        const date = formatDate(this.dateSelected, 'yyyy-MM-dd', 'en-US');
        retoursfiltered = retoursfiltered.filter(retour => (retour.dateDeDancement === date));
      }
      if (this.commercial_id_selected !== undefined ) {
        if (!this.Touslesretours  ) {
        // @ts-ignore
          retoursfiltered = retoursfiltered.filter(retour1 => Number(retour1.idCommercial) === Number(this.commercial_id_selected) && !retour1.status);
        }
        else {
          retoursfiltered = retoursfiltered.filter(retour1 => Number(retour1.idCommercial) === Number(this.commercial_id_selected) );

        }

      }
      // @ts-ignore
      this.dataSource = new MatTableDataSource(retoursfiltered);
      console.log(this.dataSource);
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
  }
  apploquerfilterCommercial(id: any): any{
    console.log(id);
    if (id !== undefined) {
      this.retoursFilter2 = [];
      // tslint:disable-next-line:forin
      for (const retour of this.retours) {
        // @ts-ignore
        console.log(retour, id);
        // @ts-ignore
        if (Number(retour.idCommercial) === Number(id) && !retour.status) {
          // @ts-ignore
          this.retoursFilter2.push(retour);
        }
      }
      this.dataSource = new MatTableDataSource(this.retoursFilter2);
      console.log(this.dataSource);
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
    }
    else {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(this.retours);
      console.log(this.dataSource);
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
    }
  }

  onModifier(id: any): any{
    this.gestionDesRetoursService.getCommericaux();
    this.gestionDesRetoursService.getClients();
    this.gestionDesRetoursService.modifier(id);
    this.gestionDesRetoursService.getRetourConsultee(id);
  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDesRetoursService.supprimer(id);

  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
  OnchangeStatusRetours(id: any, element: any): void{
    console.log(id);
    console.log(element);
    this.gestionDesRetoursService.changestatusretours(id, element)
      .subscribe(data => {
      }, error => {
        element.status = !element.status;
        alert(error.message);
      });
  }

  getClient(id: any): any{
    for ( const client of this.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  getretours2(): any{
    this.gestionDesRetoursService.getClients2()
      .subscribe(data => {
        this.clients = data;
        this.gestionDesRetoursService.getRetours2()
          .subscribe(data1 => {
            this.retours = data1;
            for (const retour of this.retours) {
              retour.nom_client = this.getClient(retour.idClient);
            }
            const retoursApprouve = this.retours.filter(retour => retour.status);
            const retoursNonApprouve = this.retours.filter(retour => !retour.status);
            const retoursprime = [];
            for (const retour1 of retoursNonApprouve){
              retoursprime.push(retour1);
            }
            for (const retour2 of retoursApprouve){
              retoursprime.push(retour2);
            }
            this.retours = retoursprime;
            // @ts-ignore1
            this.Total = 0;
            this.retours.forEach(current  => this.Total += current.total_TTC) ;
            // @ts-ignore
            this.dataSource.data = this.retours ;

            setTimeout(
              () => {
              console.log(this.dataSource);
              console.log(this.paginator);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              }, 100);
          }, error => {alert('une error s\'est produite'); });
      });
  }

}

