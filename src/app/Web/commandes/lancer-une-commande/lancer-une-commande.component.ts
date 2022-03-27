import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {GestionDesCommandesService} from '../../../services/gestion-des-commandes.service';
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {MatDialog} from '@angular/material/dialog';
import {DialogClientComponent} from "../dialog-client/dialog-client.component";
import {ConfigurationService} from "../../../services/configuration.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-lancer-une-commande',
  templateUrl: './lancer-une-commande.component.html',
  styleUrls: ['./lancer-une-commande.component.css']
})
export class LancerUneCommandeComponent implements OnInit {
  client_selectionnee: any = '';
  commercial_selected: any ;
  boolean = false;
  client: any;
  magasins: any = [];
   // @ts-ignore
  // tslint:disable-next-line:variable-name
  client_code_selected: string;
   // @ts-ignore
  // tslint:disable-next-line:variable-name
  commercial_id_selected: number;
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
  remise: any = 0;
  TVA: any = 0;
  // @ts-ignore
  PRIX;
  // tslint:disable-next-line:variable-name
   article_prix: any = 0;
  // tslint:disable-next-line:variable-name
  id_magasin: any;
  // tslint:disable-next-line:variable-name
  id_article: any;
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
  options2: string[] = [] ;
  options3: string[] = [] ;
  options4: string[] = [] ;

  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControl4 = new FormControl();
  // tslint:disable-next-line:variable-name
  constructor( private _snackBar: MatSnackBar, public gestionDesCommandesService: GestionDesCommandesService,
               // tslint:disable-next-line:max-line-length
               public  gestionDesArticlesService: GestionDesArticlesService, public dialog: MatDialog, public configurationService: ConfigurationService) { }
  openDialog(): void{
    this.dialog.open(DialogClientComponent, {data: this.client});
  }

  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesCommandesService.getClients()
      .subscribe(data => {
        this.gestionDesCommandesService.clients = data;
        this.getOptions2();
        this.filteredOptions2 = this.myControl2.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter2(value))
          );
        this.getOptions3();
        this.filteredOptions3 = this.myControl3.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter3(value))
          );
      });
   /* this.magasins = [];
    for (const comm of this.commerciaux){
      this.magasins.push(comm.magasin);
    }
    return this.magasins;
  }*/
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


  private _filter(value: string): any{
    if (value !== undefined){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue)); }
  }
  private _filter2(value: string): any{
    if (value !== undefined){
      const filterValue2 = value.toLowerCase();
      return this.options2.filter(option => option.toLowerCase().includes(filterValue2)); }
  }
  private _filter3(value: string): any{
    if (value !== undefined){
      const filterValue3 = value.toLowerCase();
      return this.options3.filter(option => option.toLowerCase().includes(filterValue3)); }
  }
  private _filter4(value: string): any{
    if (value !== undefined){
      const filterValue4 = value.toLowerCase();
      return this.options4.filter(option => option.toLowerCase().includes(filterValue4)); }
  }
  calculerprix(): void{
    this.PRIX = (this.article_prix) * (1 - this.remise / 100) * this.article_quantite;
    this.hc = this.article_prix * this.article_quantite / (1 + this.TVA / 100);
    //this.hc = this.configurationService.nbr_de_chiffres_apres_virgule(this.hc);
    //this.PRIX = this.configurationService.nbr_de_chiffres_apres_virgule(this.PRIX);
  }
  getOptions(): void{
        for (const article of this.gestionDesCommandesService.articles){
          this.options.push(article.code_article);
        }

  }
  getOptions2(): void{
    for (const client of this.gestionDesCommandesService.clients){
          this.options2.push(client.nom_client);
        }
  }
  getOptions3(): void{
        for (const client of this.gestionDesCommandesService.clients){
          this.options3.push(client.code.toString());
        }
  }
  getOptions4(): void{
    this.options4 = this.gestionDesCommandesService.getMagasins();
  }
  rechercheprix(){
    this.article_prix =  this.gestionDesCommandesService.getprixarticle(this.article_selected);
    this.designation =  this.gestionDesCommandesService.getdesignationarticle(this.article_selected);
    this.id_article =  this.gestionDesCommandesService.getidarticle(this.article_selected);
    this.TVA =  this.gestionDesCommandesService.getTVAarticle(this.article_selected);
    this.remise =  this.gestionDesCommandesService.getRemise(this.id_article);
    console.log(this.TVA);

  }
  recherchenomClient(): void {
    this.getOptions4();
    this.getOptions();
    this.getOptions2();
    this.getOptions3();
    this.filteredOptions4 = this.myControl4.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter4(value))
          );
    this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
    this.filteredOptions2 = this.myControl2.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter2(value))
          );
    this.filteredOptions3 = this.myControl3.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter3(value))
          );
  }

  rechercheClient(): any{
    this.gestionDesCommandesService.articlescommandees = [];
    this.client = {};
    if (this.client_code_selected && this.client_selectionnee){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_selectionnee = this.gestionDesCommandesService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDesCommandesService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.gestionDesCommandesService.getPromotion(this.client.idClient);
            this.openDialog();
            this.boolean = true;
            this.gestionDesCommandesService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }

    if (this.client_selectionnee && !this.client_code_selected ){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_code_selected = this.gestionDesCommandesService.recherche_code(this.client_selectionnee);
      this.client = this.gestionDesCommandesService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.gestionDesCommandesService.getPromotion(this.client.idClient);
            this.openDialog();
            this.boolean = true;
            this.gestionDesCommandesService.gettableArticle(this.client.list_prix); }
          else {
            this.openSnackBar('ce client n\'existe pas', 'OK');
          }
          return 0; }, 10
      );
      return 0;
        }
    if (this.client_code_selected ){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_selectionnee = this.gestionDesCommandesService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDesCommandesService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.gestionDesCommandesService.getPromotion(this.client.idClient);
            this.boolean = true;
            this.gestionDesCommandesService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }
  }

  getMagasin(id: any): void{
    console.log(id);
    this.magasin_selected = this.gestionDesCommandesService.getMagasin(id);
  }
  calculetotal(): void{
    this.totalTTC = 0;
    this.totalhc = 0;
    for (const article of this.gestionDesCommandesService.articlescommandees){
      this.totalTTC += article.total_ligne_TTC;
      this.totalhc += article.total_ligne_HT;
    }
    this.totalTTC = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalTTC);
    this.totalhc = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalhc);
  }

  ajouterarticle(f: NgForm): any{
    this.id_magasin =  this.gestionDesCommandesService.get_idMagasin(this.magasin_selected);
    this.calculerprix();
    this.gestionDesCommandesService.ajouterarticle(this.article_selected, this.article_prix,
      this.article_quantite, this.magasin_selected, this.designation, this.remise, this.TVA,
      this.PRIX, this.hc, this.id_article, this.id_magasin);
    this.calculetotal();
    f.reset();
    f.value.remise = 0;
    this.remise = 0;
    this.article_selected = '';
  }
  supprimerarticle(i: number){
    this.gestionDesCommandesService.articlescommandees.splice(i, 1);
    this.calculetotal();
  }
  onSubmit(f: NgForm): void{
    if (confirm("Êtes-vous sûr de lancer cette commande")) {
      const commande = {num_commande: f.value.num_commande, id_client: this.client.idClient,
        // tslint:disable-next-line:max-line-length
        id_commercial: this.commercial_id_selected, total_TTC: this.totalTTC, total_HT: this.totalhc, status: f.value.status, date_de_lancement: f.value.date_commande};
      setTimeout(
        () => {
          this.gestionDesCommandesService.enregistrerCommande(commande);
        }, 200
      );
    }
  }
  onSubmitt(f: NgForm) {
  }

  }
