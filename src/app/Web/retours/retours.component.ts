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
import {DialogConsultationComponent} from "../factures/dialog-consultation/dialog-consultation.component";
import {GestionDesArticlesService} from "../../services/gestion-des-articles.service";
import {Form} from "@angular/forms";
import {DialogConsultationRetourComponent} from "./dialog-consultation-retour/dialog-consultation-retour.component";

@Component({
  selector: 'app-retours',
  templateUrl: './retours.component.html',
  styleUrls: ['./retours.component.css']
})
export class RetoursComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog, public gestionDesRetoursService: GestionDesRetoursService, private router: Router,
              private route: ActivatedRoute, public configurationService: ConfigurationService, public gestionDesArticlesService: GestionDesArticlesService) { }
  displayedColumns: string[] = [ 'code', 'nom_client', 'commercial', 'total_ttc', 'date', 'edit', 'suppression'];
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
  TotalRetours: any = 0;
  // tslint:disable-next-line:variable-name
  commercial_id_selected: any;
  dateSelected: any;


  ngOnInit(): void {
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);

    //this.gestionDesRetoursService.getCommericaux();
    //this.gestionDesRetoursService.getClients();
    // this.configurationService.getConfiguration();
    //this.getretours2();
  }
  ngAfterViewInit(): any {
    this.gestionDesRetoursService.getMagasinsList()
      .subscribe(data => {
        this.gestionDesRetoursService.magasinsList = data;
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {alert(error.message); });
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesRetoursService.articles = data;
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {alert(error); } );
    this.configurationService.getConfiguration2()
      .subscribe(data => {
        this.configurationService.affecter(data);
        if (this.configurationService.validationDeRetours === true){
          this.displayedColumns = [ 'code', 'nom_client', 'commercial', 'total_ttc', 'date', 'status', 'edit', 'suppression'];
        }
        this.getRetours();

      });
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
           this.getretours2();
          setTimeout(() => {this.DateAndCommercialFilter(); }, 50 );
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
       setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
  }
  apploquerfilterCommercial(id: any): any{
     if (id !== undefined) {
      this.retoursFilter2 = [];
      // tslint:disable-next-line:forin
      for (const retour of this.retours) {
        // @ts-ignore
         // @ts-ignore
        if (Number(retour.idCommercial) === Number(id) && !retour.status) {
          // @ts-ignore
          this.retoursFilter2.push(retour);
        }
      }
      this.dataSource = new MatTableDataSource(this.retoursFilter2);
       setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100);
    }
    else {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(this.retours);
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
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              }, 100);
          }, error => {alert('une error s\'est produite'); });
      });
  }

  getRetours(): any{
    this.gestionDesRetoursService.getCommericaux2()
      .subscribe(dataC => {
        this.gestionDesRetoursService.commerciaux = dataC;
        this.gestionDesRetoursService.getClients2()
          .subscribe(data => {
            this.gestionDesRetoursService.clients = data;
            this.gestionDesRetoursService.getRetours2()
              .subscribe(data2 => {
                this.retours = data2;
                 // tslint:disable-next-line:no-unused-expression
                this.Total = 0;
                this.retours.forEach(current  => this.Total += current.total_TTC ) ;
                let filteredArray: any[];
                filteredArray = [];
                this.retours.forEach(current  =>  filteredArray.push(current.idClient)) ;
                // @ts-ignore
                const filteredArray2 = filteredArray.filter( (ele, pos) => filteredArray.indexOf(ele) === pos);
                this.TotalRetours = filteredArray2.length;
                for (const retour of this.retours){
                  retour.nom_client = this.getclient(retour.idClient);
                  retour.code = this.getCode(retour.idClient);
                  retour.commercial = this.getCommercial(retour.idCommercial);
                }
                // @ts-ignore
                this.dataSource.data = this.retours;
                setTimeout(
                  () => {
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    }, 10);
              }, error => {alert('une error s\'est produite'); });
          });

      });

  }
  getclient(id: number): any{
    for ( const client of this.gestionDesRetoursService.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  getCode(id: number): any{
    for ( const client of this.gestionDesRetoursService.clients){
      if ( client.idClient === id){
        return client.code;
      }
    }
  }
  getCommercial(id: number): any{
    for ( const commercial of this.gestionDesRetoursService.commerciaux){
      if ( commercial.id_commercial === id){
        return commercial.nom;
      }
    }
  }
  getRetoursCommercialDate(f: Form): any{
    // @ts-ignore
     // @ts-ignore
    this.gestionDesRetoursService.getRetoursCommercialDate(f)
      .subscribe(data2 => {
        this.retours = data2;
        // tslint:disable-next-line:no-unused-expression
        this.Total = 0;
        this.retours.forEach(current  => this.Total += current.total_TTC ) ;
        let filteredArray: any[];
        filteredArray = [];
        this.retours.forEach(current  =>  filteredArray.push(current.idClient)) ;
        // @ts-ignore
        const filteredArray2 = filteredArray.filter( (ele, pos) => filteredArray.indexOf(ele) === pos);
        this.TotalRetours = filteredArray2.length;
        for (const retour of this.retours){
          retour.nom_client = this.getclient(retour.idClient);
          retour.code = this.getCode(retour.idClient);
          retour.commercial = this.getCommercial(retour.idCommercial);
        }
        // @ts-ignore
        this.dataSource.data = this.retours;
         setTimeout(
          () => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            }, 10);
      }, error => {alert('une error s\'est produite');
      });
  }

  onConsulterRetour(id: any): any{
    let retourV: any;
    // tslint:disable-next-line:variable-name
    let retourV_details = [];
    this.gestionDesRetoursService.getRetourWeb(id)
      .subscribe(data => {
        // @ts-ignore
        retourV = data.retourentete;
        // @ts-ignore
        retourV_details = data.retourdetail;
        // tslint:disable-next-line:variable-name
        for (const retour_detail of retourV_details){
          retour_detail.code_article = this.gestionDesRetoursService.getCodeArticle(retour_detail.id_article);
          retour_detail.description = this.gestionDesRetoursService.getDescriptionArticle(retour_detail.id_article);
         }
        // @ts-ignore
        // tslint:disable-next-line:no-shadowed-variable
        const clientCherche = this.gestionDesRetoursService.clients.filter(client => client.idClient === retourV.idClient)[0];
        retourV.code = clientCherche.code;
        retourV.nomClient = clientCherche.nom_client;
        retourV.nomCommercial = this.gestionDesRetoursService.commerciaux
          // @ts-ignore
          .filter(commercial => commercial.id_commercial === retourV.idCommercial)[0].nom;
         this.dialog.open(DialogConsultationRetourComponent, {data: {retour: retourV, retour_details: retourV_details}, height: '1000px',
          width: '1500px'});
      }, error => {alert('une error s\'est produite'); });
  }

}

