import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesCommandesService} from "../../services/gestion-des-commandes.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDesFacturesService} from "../../services/Gestion-des-factures.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationService} from "../../services/configuration.service";
import {Form} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {GestionDesArticlesService} from "../../services/gestion-des-articles.service";
import {error} from "protractor";
import {PieceJOintfactureComponent} from "./piece-jointfacture/piece-jointfacture.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogConsultationComponent} from "./dialog-consultation/dialog-consultation.component";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog, public gestionDesArticlesService: GestionDesArticlesService, public gestionDesFacturesService: GestionDesFacturesService, private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['code', 'nom_client', 'total_ttc', 'Montant', 'Date', 'DateEcheance',   'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  Total: any = 0;
  TotalFacture: any = 0;
  factures: any[] = [];
  clients: any[] = [];
  ngOnInit(): void {
    // @ts-ignore
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);

  }
  ngAfterViewInit(): void {
    this.gestionDesFacturesService.getMagasinsList()
      .subscribe(data => {
        this.gestionDesFacturesService.magasinsList = data;
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {alert(error.message); });
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesFacturesService.articles = data;
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {alert(error); } );
    this.configurationService.getConfiguration();
    this.getFactures();
  }
  getFactures(): any{
    this.gestionDesFacturesService.getCommericaux2()
      .subscribe(dataC => {
        this.gestionDesFacturesService.commerciaux = dataC;
        this.gestionDesFacturesService.getClients2()
          .subscribe(data => {
            this.gestionDesFacturesService.clients = data;
            this.gestionDesFacturesService.getFactures()
              .subscribe(data2 => {
                this.factures = data2;
                // tslint:disable-next-line:no-unused-expression
                this.Total = 0;
                this.factures.forEach(current  => this.Total += current.totalTTC ) ;
                let filteredArray: any[];
                filteredArray = [];
                this.factures.forEach(current  =>  filteredArray.push(current.idClient)) ;
                // @ts-ignore
                const filteredArray2 = filteredArray.filter( (ele, pos) => filteredArray.indexOf(ele) === pos);
                this.TotalFacture = filteredArray2.length;
                for (const facture of this.factures){
                  facture.nom_client = this.getclient(facture.idClient);
                  facture.code = this.getCode(facture.idClient);
                  facture.paye = undefined;
                  if ( facture.montantPaye >= facture.totalTTC){
                    facture.paye = 1;
                  }
                  if ( facture.montantPaye === 0 ){
                    facture.paye = 0;
                  }
                }
                // @ts-ignore
                this.dataSource.data = this.factures;
                setTimeout(
                  () => {
                    this.dataSource.paginator = this.paginator; }, 10);
              }, error => {alert('une error s\'est produite'); });
          });

      });

  }
  getFacturesCommercialDate(f: Form): any{
    // @ts-ignore
    this.gestionDesFacturesService.getFacturesCommercialDate(f)
      .subscribe(data2 => {
                this.factures = data2;
                this.Total = 0;
                this.factures.forEach(current  => this.Total += current.totalTTC) ;
                let filteredArray: any[];
                filteredArray = [];
                this.factures.forEach(current  =>  filteredArray.push(current.idClient)) ;
                // @ts-ignore
                const filteredArray2 = filteredArray.filter( (ele, pos) => filteredArray.indexOf(ele) === pos);
                this.TotalFacture = filteredArray2.length;
                for (const facture of this.factures){
                  facture.nom_client = this.getclient(facture.idClient);
                  facture.code = this.getCode(facture.idClient);
                  facture.paye = undefined;
                  if ( facture.montantPaye >= facture.totalTTC){
                    facture.paye = 1;
                  }
                  if ( facture.montantPaye === 0 ){
                    facture.paye = 0;
                  }
                 }
                // @ts-ignore
                this.dataSource.data = this.factures;
                setTimeout(
                  () => {
                    this.dataSource.paginator = this.paginator; }, 10);
              }, error => {alert('une error s\'est produite');
      });
  }
  getclient(id: number): any{
    for ( const client of this.gestionDesFacturesService.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  getCode(id: number): any{
    for ( const client of this.gestionDesFacturesService.clients){
      if ( client.idClient === id){
        return client.code;
      }
    }
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    this.Total = 0;
    // @ts-ignore
    this.dataSource.filteredData.forEach(current  => this.Total += current.totalTTC) ;
    let filteredArray: any[];
    filteredArray = [];
    // @ts-ignore
    this.dataSource.filteredData.forEach(current  =>  filteredArray.push(current.idClient)) ;
    // @ts-ignore
    const filteredArray2 = filteredArray.filter( (ele, pos) => filteredArray.indexOf(ele) === pos);
    this.TotalFacture = filteredArray2.length;
  }

  onModifier(id: any): any{
    let facture: any;
    // tslint:disable-next-line:variable-name
    let facture_detail = [];
    this.gestionDesFacturesService.getFactureWeb(id)
              .subscribe(data => {
                 // @ts-ignore
                facture = data.factureentete;
                // @ts-ignore
                facture_detail = data.facturedetail;
                for (const facturedetails of facture_detail){
                  facturedetails.code_article = this.gestionDesFacturesService.getCodeArticle(facturedetails.id_article);
                  facturedetails.description = this.gestionDesFacturesService.getDescriptionArticle(facturedetails.id_article);
                  facturedetails.magasin = this.gestionDesFacturesService.getMagasinNom(facturedetails.id_magasin);
                }
                // @ts-ignore
                // tslint:disable-next-line:no-shadowed-variable
                const clientCherche = this.gestionDesFacturesService.clients.filter(client => client.idClient === facture.idClient)[0];
                facture.code = clientCherche.code;
                facture.nomClient = clientCherche.nom_client;
                // @ts-ignore
                facture.nomCommercial = this.gestionDesFacturesService.commerciaux.filter(commercial => commercial.id_commercial === facture.idCommercial)[0].nom;
                 this.dialog.open(DialogConsultationComponent, {data: {facture: facture, facture_details: facture_detail}, height: '1000px',
                  width: '1500px'});
              }, error => {alert('une error s\'est produite'); });
  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDesFacturesService.supprimer(id);

  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
}

