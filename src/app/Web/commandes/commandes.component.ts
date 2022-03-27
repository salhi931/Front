import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesCommandesService} from '../../services/gestion-des-commandes.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDesCommandes2Service} from "../../services/gestion-des-commandes-2.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationService} from "../../services/configuration.service";
import {MatSort} from "@angular/material/sort";
import {Form} from "@angular/forms";
import {DialogConsultationComponent} from "../factures/dialog-consultation/dialog-consultation.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogConsultationCommandeComponent} from "./dialog-consultation-commande/dialog-consultation-commande.component";
import {GestionDesArticlesService} from "../../services/gestion-des-articles.service";

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit, AfterViewInit  {

  // tslint:disable-next-line:max-line-length
  constructor(public gestionDesArticlesService: GestionDesArticlesService, public dialog: MatDialog, public gestionDesCommandesService: GestionDesCommandesService, public gestionDesCommandes2Service: GestionDesCommandes2Service,
              private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['commercial', 'code', 'client', 'TTC', 'date_de_lancement', 'edit', 'suppression'];
  // displayedColumns: string[] = ['num_commande', 'client', 'TTC', 'date_de_lancement', 'status', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  Total: any = 0;
  commandes: any[] = [];
  clients: any[] = [];
  ngOnInit(): void {
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);

  }
  ngAfterViewInit(): any {
    this.configurationService.getConfiguration();
    this.gestionDesCommandesService.getMagasinsList()
      .subscribe(data => {
        this.gestionDesCommandesService.magasinsList = data;
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        alert(error.message);
      });
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesCommandesService.articles = data;
      });
    this.gestionDesCommandesService.getClients()
      .subscribe(data => {
        this.gestionDesCommandesService.clients = data;
        this.gestionDesCommandesService.getCommericaux()
          .subscribe(dataCom => {
            this.gestionDesCommandesService.commerciaux = dataCom;
            this.getCommandes();
          });

        // this.configurationService.getConfiguration();
        // this.gestionDesCommandesService.getClients();
        //  this.getCommandes();
      }, error => {alert('une error s\'est produite'); });  }


  getCommandes(): any{
        this.gestionDesCommandesService.getCommandes()
          .subscribe(data1 => {
            this.commandes = data1;
            this.Total = 0;
            this.commandes.forEach(current  => this.Total += current.total_TTC) ;
            for (const commande of this.commandes) {
              commande.nom = this.getClient(commande.idClient);
              commande.code = this.getCode(commande.idClient);
              commande.Commercial = this.getCommercial(commande.idCommercial);

            }
            console.log(this.commandes);
            // const commandeApprouve = this.commandes.filter(commande => commande.status);
            // const commandeNonApprouve = this.commandes.filter(commande => !commande.status);
            // const commandesprime = [];
            // for (const commande1 of commandeNonApprouve){
            //  commandesprime.push(commande1);
            //}
            //for (const commande2 of commandeApprouve){
            //   commandesprime.push(commande2);
           // }
            //this.commandes = commandesprime;
            // @ts-ignore
            this.dataSource.data = this.commandes ;

            setTimeout(
              () => {
                console.log(this.paginator);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }, 10);
          }, error => {alert('une error s\'est produite'); });
  }

  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    this.Total = 0;
    // @ts-ignore
    this.dataSource.filteredData.forEach(current  => this.Total += current.total_TTC) ;
  }

  onModifier(id: any): any{
    let commande: any;
    // tslint:disable-next-line:variable-name
    let commande_detail = [];
    this.gestionDesCommandesService.getCommandeWeb(id)
      .subscribe(data => {
        console.log(data);
        // @ts-ignore
        commande = data.commandeentete;
        // @ts-ignore
        const clientCherche = this.gestionDesCommandesService.clients.filter(client => client.idClient === commande.idClient)[0];
        commande.code = clientCherche.code;
        commande.nomClient = clientCherche.nom_client;
        // @ts-ignore
        commande.nomCommercial = this.gestionDesCommandesService.commerciaux.filter(commercial => commercial.id_commercial === commande.idCommercial)[0].nom;

        // @ts-ignore
        commande_detail = data.commandedetail;
        for (const commandedetails of commande_detail){
          commandedetails.code_article = this.gestionDesCommandesService.getCodeArticle(commandedetails.id_article);
          commandedetails.description = this.gestionDesCommandesService.getDescriptionArticle(commandedetails.id_article);
          commandedetails.magasin = this.gestionDesCommandesService.getMagasinNom(commandedetails.id_magasin);
        }
        console.log(commande_detail);

        this.dialog.open(DialogConsultationCommandeComponent, {data: {commande: commande, commande_detail: commande_detail}, height: '900px',
          width: '1500px'});
/*
      }, error => {alert('une error s\'est produite'); });
    // this.gestionDesFacturesService.getCommericaux();
    // this.gestionDesFacturesService.getClients();
    this.gestionDesFacturesService.getFactureConsultee(id);
       // this.gestionDesCommandes2Service.getcommandeanddetailcommane(id);
       this.dialog.open(DialogConsultationCommandeComponent, {data: {}, height: '900px',
      width: '1500px'*/
      });
  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDesCommandesService.supprimer(id);

  }
  getClient(id: any): any{
    for ( const client of this.gestionDesCommandesService.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }

  OnchangeStatusCommande(id: any, element: any): void{

    this.gestionDesCommandesService.changestatus(id, element.status)
      .subscribe(data => {
      console.log(data);
    }, error => {console.log(error.message); });
    //this.gestionDesCommandesService.changestatuscommande(id, element);
  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
  getCommandesCommercialDate(f: Form): any{
    // @ts-ignore
    this.gestionDesCommandesService.getCommandesCommercialDate(f)
      .subscribe(data2 => {
        this.commandes = data2;
        this.Total = 0;
        this.commandes.forEach(current  => this.Total += current.total_TTC) ;
        for (const commande of this.commandes){
           commande.nom = this.getclient(commande.idClient);
           commande.code = this.getCode(commande.idClient);
           commande.Commercial = this.getCommercial(commande.idCommercial);
          // commande.paye = 0;
        }
        // @ts-ignore
        this.dataSource.data = this.commandes;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
      }, error => {alert('une error s\'est produite');
      });
  }
  getclient(id: number): any{
    for ( const client of this.gestionDesCommandesService.clients){
      if ( client.idClient === id){
        return client.nom_client;
      }
    }
  }
  getCode(id: number): any{
    for ( const client of this.gestionDesCommandesService.clients){
      if ( client.idClient === id){
        return client.code;
      }
    }
  }
  getCommercial(id: number): any{
    for ( const commercial of this.gestionDesCommandesService.commerciaux){
      if ( commercial.id_commercial === id){
        return commercial.nom;
      }
    }
  }
}
