


import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {GestionDesCommandesService} from '../../../services/gestion-des-commandes.service';
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {MatDialog} from '@angular/material/dialog';
import {DialogClientComponent} from "../dialog-client/dialog-client.component";
import {GestionDesCommandes2Service} from "../../../services/gestion-des-commandes-2.service";
import {ConfigurationService} from "../../../services/configuration.service";
@Component({
  selector: 'app-edition-consultation-commande',
  templateUrl: './edition-consultation-commande.component.html',
  styleUrls: ['./edition-consultation-commande.component.css']
})

export class EditionConsultationCommandeComponent implements OnInit {
  boolean = true;
  client: any;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  client_code_selected: any = 2 ;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  commercial_id_selected: any;
  // tslint:disable-next-line:variable-name
  article_selected: any;
  totalTTC = 0;
  hc = 0;
  totalhc = 0;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  magasin_selected: any;
  // tslint:disable-next-line:variable-name
  article_quantite: any;
  designation: any;
  id_article: any;
  remise: any = 0;
  TVA: any = 0;
  // @ts-ignore
  PRIX;
  // tslint:disable-next-line:variable-name
  article_prix: any = 0;
  // @ts-ignore
  filteredOptions: Observable<string[]>;
  // @ts-ignore
  filteredOptions2: Observable<string[]>;
  // @ts-ignore
  filteredOptions3: Observable<string[]>;
  // @ts-ignore
  filteredOptions4: Observable<string[]>;
  // @ts-ignore
  filteredOptions5: Observable<string[]>;
  options: string[] = [] ;
  options4: string[] = [] ;
  myControl = new FormControl();
  myControl4 = new FormControl();
  constructor(public gestionDesCommandesService: GestionDesCommandes2Service, public  gestionDesArticlesService: GestionDesArticlesService,
              public dialog: MatDialog, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesCommandesService.getcommandeanddetailcommane(this.gestionDesCommandesService.id_commande);
    this.gestionDesCommandesService.commercial_id_selected = String(this.gestionDesCommandesService.commande.id_commercial);
    this.gestionDesCommandesService.getClients()
      .subscribe(data => {
        this.gestionDesCommandesService.clients = data;
      });
    this.gestionDesCommandesService.getMagasinsList()
      .subscribe(data => {
        this.gestionDesCommandesService.magasinsList = data;
        this.getOptions4();
        this.filteredOptions4 = this.myControl4.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter4(value))
          );
      });
    this.gestionDesCommandesService.getCommericaux()
      .subscribe( data => {
        this.gestionDesCommandesService.commerciaux = data;
        this.gestionDesCommandesService.getMagasins();
        this.getOptions4();
        this.filteredOptions4 = this.myControl4.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter4(value))
          );
      });
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesCommandesService.articles = data;
        this.getOptions();
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      });

  }
              getclient_code(): any{
    for (const client of this.gestionDesCommandesService.clients){
      if (this.gestionDesCommandesService.commande.id_client === client.idClient){
        return client.code;
      }
    }
    return 0;
  }
  getclient_nom(): any{
    for (const client of this.gestionDesCommandesService.clients){
      if (this.gestionDesCommandesService.commande.id_client === client.idClient){
        return client.nom_client;
      }
    }
    return 0;
  }
  getCommercial_nom(id: any): any{
    for (const commercial of this.gestionDesCommandesService.commerciaux){
      if (commercial.id_commercial === Number(id)){
        return commercial.nomUtilisateur;
      }
    }
    return 0;
  }

  private _filter(value: string): any{
    if (value !== undefined){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue)); }
  }
  private _filter4(value: string): any{
    if (value !== undefined){
      const filterValue4 = value.toLowerCase();
      return this.options4.filter(option => option.toLowerCase().includes(filterValue4)); }
  }
  calculerprix(): void{
    this.PRIX = (this.article_prix) * (1 - this.remise / 100) * this.article_quantite;
    this.hc = this.article_prix * this.article_quantite;
    this.hc = this.configurationService.nbr_de_chiffres_apres_virgule(this.hc);
    this.PRIX = this.configurationService.nbr_de_chiffres_apres_virgule(this.PRIX);


  }
  getOptions(): void{
     for (const article of this.gestionDesCommandesService.articles){
          this.options.push(article.code_article);
        }
  }

  getOptions4(): void{
    this.options4 = this.gestionDesCommandesService.getMagasins();
  }
  rechercheprix(): void{
    this.article_prix =  this.gestionDesCommandesService.getprixarticle(this.article_selected);
    this.designation =  this.gestionDesCommandesService.getdesignationarticle(this.article_selected);
    this.id_article =  this.gestionDesCommandesService.getidarticle(this.article_selected);
    this.TVA =  this.gestionDesCommandesService.getTVAarticle(this.article_selected);
    this.remise =  this.gestionDesCommandesService.getRemise(this.id_article);
    console.log(this.TVA);

  }
  getMagasin(id: any): void{
    //console.log(id);
    this.magasin_selected = this.gestionDesCommandesService.getMagasin(id);
  }
  calculetotal(): void{
    this.gestionDesCommandesService.commande.total_TTC = 0;
    this.gestionDesCommandesService.commande.total_HT = 0;
    for (const article of this.gestionDesCommandesService.articlescommandees){
      this.gestionDesCommandesService.commande.total_TTC += article.total_ligne_TTC;
      this.gestionDesCommandesService.commande.total_HT += article.total_ligne_HT;
    }
    this.totalTTC = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalTTC);
    this.totalhc = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalhc);
  }
  ajouterarticle(): void{
    this.calculerprix();
    this.gestionDesCommandesService.ajouterarticle(this.article_selected, this.article_prix, this.article_quantite, this.id_article,
      this.magasin_selected, this.designation, this.remise, this.TVA, this.PRIX, this.hc);
    this.calculetotal();
    //f.reset();
  }
  supprimerarticle(i: number){
    this.gestionDesCommandesService.articlescommandees.splice(i, 1);
    this.calculetotal();
  }
  onSubmitt(f: NgForm) {
  }
  getarticles(){
    this.client = this.gestionDesCommandesService.rechercherClient(this.gestionDesCommandesService.commande.id_client);
    this.gestionDesCommandesService.gettableArticle(this.client.list_prix);
    console.log( this.client);
  }


  onSubmit(f: NgForm): void{
    /* const commande = {num_commande: 54548, id_client: this.client.id_client,
       id_commercial: this.commercial_id_selected, total_TTC: this.totalTTC,
       total_HT: this.totalhc, status: f.value.status, date_de_lancement: f.value.date_commande};
   setTimeout(
     () => {*/
    this.gestionDesCommandesService.enregistrerCommande(this.gestionDesCommandesService.commande);
    /* }, 200
   );*/
    console.log(this.gestionDesCommandesService.commande);
  }
}



