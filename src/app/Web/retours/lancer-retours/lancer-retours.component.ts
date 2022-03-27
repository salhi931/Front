import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, NgForm} from "@angular/forms";
 import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigurationService} from "../../../services/configuration.service";
import {DialogClientComponent} from "../../commandes/dialog-client/dialog-client.component";
import {DialogFactureComponent} from "../../factures/dialog-facture/dialog-facture.component";
import {map, startWith} from "rxjs/operators";
import {DialogRetourComponent} from "../dialog-retour/dialog-retour.component";
import {GestionDesRetoursService} from "../../../services/gestion-des-retours.service";

@Component({
  selector: 'app-lancer-retours',
  templateUrl: './lancer-retours.component.html',
  styleUrls: ['./lancer-retours.component.css']
})
export class LancerRetoursComponent implements OnInit {

  client_selectionnee: any = '';
  commercial_selected: any ;
  boolean = false;
  client: any;
  num_commande: any;
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
  id_article: any;
  id_magasin: any;
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
  options2: string[] = [] ;
  options3: string[] = [] ;
  options4: string[] = [] ;

  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  myControl4 = new FormControl();
  boolean2 = false;
   commerciaux: any;
  clients: any;
  articles: any;
  constructor(public gestionDesRetoursService: GestionDesRetoursService,
              // tslint:disable-next-line:variable-name max-line-length
              public  gestionDesArticlesService: GestionDesArticlesService, public dialog: MatDialog, private _snackBar: MatSnackBar, public configurationService: ConfigurationService) { }
  openDialog(): void{
    this.dialog.open(DialogClientComponent, {data: this.client});
  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  openDialog2(): void{
    const dialogref = this.dialog.open(DialogRetourComponent);
    dialogref.afterClosed().subscribe(data => {
      console.log(data);

      if (data){
        console.log(data);
        this.gestionDesRetoursService.getFactureEtDetail(data);
        setTimeout(
          () => {
            this.calculetotal();
            this.boolean2 = true;
          }, 100
        );
      }

    }, error => {
      console.log(error.message);
    });
  }
  ngOnInit(): void {
    this.gestionDesRetoursService.getMotifs();
    this.gestionDesRetoursService.getClients();
    this.gestionDesRetoursService.getClients2()
      .subscribe(data => {
        this.gestionDesRetoursService.clients = data;
        this.getOptions2();
        this.getOptions3();
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
      });
    this.gestionDesRetoursService.getMagasinsList()
      .subscribe(data => {
        this.gestionDesRetoursService.magasinsList = data;
        this.getOptions4();
        this.filteredOptions4 = this.myControl4.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter4(value))
          );
      });
    this.gestionDesRetoursService.getCommericaux2()
      .subscribe( data => {
        this.gestionDesRetoursService.commerciaux = data;
      });
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesRetoursService.articles = data;
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
    this.PRIX = this.article_prix * (1 - this.remise / 100) * this.article_quantite;
    this.hc = this.article_prix * this.article_quantite / (1 + this.TVA / 100);
    //this.hc = this.configurationService.nbr_de_chiffres_apres_virgule(this.hc);
    //this.PRIX = this.configurationService.nbr_de_chiffres_apres_virgule(this.PRIX);
  }
  getOptions(): void{
    for (const article of this.gestionDesRetoursService.articles){
          this.options.push(article.code_article);
        }
  }
  getOptions2(): void{
        for (const client of this.gestionDesRetoursService.clients){
          this.options2.push(client.nom_client);
        }
  }
  getOptions3(): void{
    for (const client of this.gestionDesRetoursService.clients){
          this.options3.push(client.code.toString());
        }
  }
  getOptions4(): void{
        this.options4 = this.gestionDesRetoursService.getMagasins();
  }
  rechercheprix(): any{

    this.article_prix =  this.gestionDesRetoursService.getprixarticle(this.article_selected );
    this.designation =  this.gestionDesRetoursService.getdesignationarticle(this.article_selected );
    this.id_article =  this.gestionDesRetoursService.getidarticle(this.article_selected );
    this.TVA =  this.gestionDesRetoursService.getTVAarticle(this.article_selected, this.articles);
    //console.log(this.TVA);

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
    this.gestionDesRetoursService.articlesderetours = [];
    this.client = {};
    if (this.client_code_selected && this.client_selectionnee){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_selectionnee = this.gestionDesRetoursService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDesRetoursService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.boolean = true;
            this.gestionDesRetoursService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }

    if (this.client_selectionnee && !this.client_code_selected ){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_code_selected = this.gestionDesRetoursService.recherche_code(this.client_selectionnee);
      this.client = this.gestionDesRetoursService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.boolean = true;
            this.gestionDesRetoursService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }
    if (this.client_code_selected ){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_selectionnee = this.gestionDesRetoursService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDesRetoursService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.boolean = true;
            this.gestionDesRetoursService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }
  }
  selectionnerFacture(): void{
    this.openDialog2();
  }

  getMagasin(id: any): void{
    //console.log(id);
    this.magasin_selected = this.gestionDesRetoursService.getMagasin(id);
  }
  calculetotal(): any{
    this.totalTTC = 0;
    this.totalhc = 0;
    for (const article of this.gestionDesRetoursService.articlesderetours){
      this.totalTTC += article.total_ligne_TTC;
      this.totalhc += article.total_ligne_HC;
    }
    // this.totalTTC = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalTTC);
    // this.totalhc = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalhc);
  }
  getclient_code(): any{
    console.log(this.gestionDesRetoursService.clients);
    for (const client of this.gestionDesRetoursService.clients){
      if (this.gestionDesRetoursService.factureSelectionnee.id_client === client.idClient){
        return client.code;
      }
    }
    return 0;
  }
  getclient_nom(): any{
    for (const client of this.gestionDesRetoursService.clients){
      if (this.gestionDesRetoursService.factureSelectionnee.id_client === client.idClient){
        return client.nom_client;
      }
    }
    return 0;
  }


  ajouterarticle(f: NgForm): void{
    this.calculerprix();
    this.id_magasin =  this.gestionDesRetoursService.get_idMagasin(this.magasin_selected);
    console.log(this.id_magasin);
    if (this.id_magasin === 0){
      this.openSnackBar('veuillez entrer une magasin', 'OK');
    }
    else {
      if (this.article_quantite > 0) {
        const remise = this.remise;
        this.gestionDesRetoursService.ajouterarticle(f, this.boolean2, this.article_selected, this.article_prix, this.article_quantite,
          this.magasin_selected, this.designation, this.remise, this.TVA, this.PRIX, this.hc, this.id_article, this.id_magasin);
        setTimeout(() => {
          this.remise = remise;
        }, 1000);

      } else {
        this.openSnackBar('veuillez entrer une quantite correte', 'OK');
        // (alert('veuillez entrer une quantite correte'));
        this.calculetotal();
      }
      //f.reset();
      setTimeout(() => {
        this.calculetotal();
      }, 1000);
    }
  }
  supprimerarticle(i: number): any{
    this.gestionDesRetoursService.articlesderetours.splice(i, 1);
    this.calculetotal();
  }
  onSubmitt(f: NgForm): any{
  }
  onSubmit(f: NgForm): void {
    if (this.gestionDesRetoursService.articlesderetours.length !== 0) {
      if (!this.configurationService.retour_sans_facture){
        if (this.gestionDesRetoursService.factureSelectionnee !== undefined){
            if (confirm('Êtes-vous sûre de lancer ce retour')) {
              console.log(f.value.nom_client);
              if (this.boolean2) {
                const retour = {
                  num_retour: f.value.num_retour,
                  idFacture: this.gestionDesRetoursService.factureSelectionnee.idFacture,
                  num_facture: this.gestionDesRetoursService.factureSelectionnee.num_facture,
                  id_client: this.gestionDesRetoursService.factureSelectionnee.id_client,
                  nom_client: this.getclient_nom(),
                  motif: f.value.motif,
                  total_TTC: this.totalTTC,
                  total_HC: this.totalhc,
                  date_de_lancement: f.value.date_retour,
                };
                setTimeout(
                  () => {
                    this.gestionDesRetoursService.enregistrerRetour(retour);
                  }, 200
                );
              } else {
                const retour = {
                  num_retour: f.value.num_retour,
                  idFacture: 0,
                  id_client: this.client.idClient,
                  nom_client: this.client_selectionnee,
                  motif: f.value.motif,
                  total_TTC: this.totalTTC,
                  total_HC: this.totalhc,
                  //status: f.value.status,
                  date_de_lancement: f.value.date_retour,
                };
                setTimeout(
                  () => {
                    this.gestionDesRetoursService.enregistrerRetour(retour);
                  }, 200
                );
              }
            }
        }
        else {alert ('vous pouvez pas lancer un retour non liee a une telle facture'); }
      }
      else {
        if (confirm('Êtes-vous sûre de lancer ce retour')) {
          console.log(f.value.nom_client);
            const retour = {
              num_retour: f.value.num_retour,
              idFacture: 0,
              id_client: this.client.idClient,
              nom_client: this.client_selectionnee,
              motif: f.value.motif,
              total_TTC: this.totalTTC,
              total_HC: this.totalhc,
              //status: f.value.status,
              date_de_lancement: f.value.date_retour,
            };
            setTimeout(
              () => {
                this.gestionDesRetoursService.enregistrerRetour(retour);
              }, 200
            );
        }
      }
    }
    else {
      this.openSnackBar('verifier que vous avez selectionner au moins un article', 'OK');
    }
  }
}

