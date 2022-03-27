import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, NgForm} from '@angular/forms';
import {GestionDesCommandesService} from '../../../services/gestion-des-commandes.service';
import {GestionDesArticlesService} from '../../../services/gestion-des-articles.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogClientComponent} from '../../commandes/dialog-client/dialog-client.component';
import {map, startWith} from 'rxjs/operators';
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {DialogFactureComponent} from "../dialog-facture/dialog-facture.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-creation-facture',
  templateUrl: './creation-facture.component.html',
  styleUrls: ['./creation-facture.component.css']
})
export class CreationFactureComponent implements OnInit {
  client_selectionnee: any = '';
  commercial_selected: any ;
  boolean = false;
  client: any;
  commerciaux: any;
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
  articles: any[] = [];
  clients: any[] = [];

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
  constructor(public gestionDesFacturesService: GestionDesFacturesService,
              // tslint:disable-next-line:variable-name max-line-length
              public  gestionDesArticlesService: GestionDesArticlesService, public dialog: MatDialog, private _snackBar: MatSnackBar, public configurationService: ConfigurationService) { }
  openDialog(): void{
    this.dialog.open(DialogClientComponent, {data: this.client});
  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  openDialog2(): void{
    const dialogref = this.dialog.open(DialogFactureComponent);
    dialogref.afterClosed().subscribe(data => {
      if (data){
      this.gestionDesFacturesService.getcommandeanddetailcommane(data);
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
    this.configurationService.getConfiguration();
    this.gestionDesFacturesService.getClients();
    this.gestionDesFacturesService.getClients2()
      .subscribe(data => {
        this.gestionDesFacturesService.clients = data;
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

    this.gestionDesFacturesService.getMagasinsList()
      .subscribe(data => {
        this.gestionDesFacturesService.magasinsList = data;
        this.getOptions4();
        this.filteredOptions4 = this.myControl4.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter4(value))
          );
      });
    this.gestionDesFacturesService.getCommericaux2()
      .subscribe( data => {
        this.gestionDesFacturesService.commerciaux = data;
      });
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesFacturesService.articles = data;
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
    this.hc = this.configurationService.nbr_de_chiffres_apres_virgule(this.hc);
    this.PRIX = this.configurationService.nbr_de_chiffres_apres_virgule(this.PRIX);
  }
  getOptions(): void{
        for (const article of this.gestionDesFacturesService.articles){
          this.options.push(article.code_article);
        }
  }
  getOptions2(): void {
    for (const client of this.gestionDesFacturesService.clients) {
      this.options2.push(client.nom_client);
    }
  }
  getOptions3(): void{
    for (const client of this.gestionDesFacturesService.clients) {
      this.options3.push(client.code.toString());
    }
  }
  getOptions4(): void{
        this.options4 = this.gestionDesFacturesService.getMagasins();
  }
  rechercheprix(): any{

    this.article_prix =  this.gestionDesFacturesService.getprixarticle(this.article_selected);
    this.designation =  this.gestionDesFacturesService.getdesignationarticle(this.article_selected);
    this.id_article =  this.gestionDesFacturesService.getidarticle(this.article_selected);
    this.TVA =  this.gestionDesFacturesService.getTVAarticle(this.article_selected);
    //console.log(this.TVA);
  }
  recherchenomClient(): void {
    this.getOptions4();
    this.getOptions();
    this.getOptions2();
    this.getOptions3();
    setTimeout(
      () => {
        this.filteredOptions4 = this.myControl4.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter4(value))
          ); }, 100
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
    this.gestionDesFacturesService.articlesfacturees = [];
    this.client = {};
    if (this.client_code_selected && this.client_selectionnee){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_selectionnee = this.gestionDesFacturesService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDesFacturesService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.boolean = true;
            this.gestionDesFacturesService.gettableArticle(this.client.list_prix); }
          else {
            this.openSnackBar('ce client n\'existe pas', 'OK');
          }
          return 0; }, 10
      );
      return 0;
    }

    if (this.client_selectionnee && !this.client_code_selected ){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_code_selected = this.gestionDesFacturesService.recherche_code(this.client_selectionnee);
      this.client = this.gestionDesFacturesService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.boolean = true;
            this.gestionDesFacturesService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }
    if (this.client_code_selected ){
      this.options = [];
      this.options2 = [];
      this.options3 = [];
      this.recherchenomClient();
      this.client_selectionnee = this.gestionDesFacturesService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDesFacturesService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            this.openDialog();
            this.boolean = true;
            this.gestionDesFacturesService.gettableArticle(this.client.list_prix); }
          return 0; }, 10
      );
      return 0;
    }
  }
  selectionnercommande(): void{
    this.openDialog2();
  }

  getMagasin(id: any): void{
    //console.log(id);
    this.magasin_selected = this.gestionDesFacturesService.getMagasin(id);
  }
  calculetotal(): any{
    this.totalTTC = 0;
    this.totalhc = 0;
    for (const article of this.gestionDesFacturesService.articlesfacturees){
      this.totalTTC += article.total_ligne_TTC;
      this.totalhc += article.total_ligne_HT;
    }
    this.totalTTC = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalTTC);
    this.totalhc = this.configurationService.nbr_de_chiffres_apres_virgule(this.totalhc);
  }
  getclient_code(): any{
    for (const client of this.gestionDesFacturesService.clients){
      if (this.gestionDesFacturesService.commandeselectionnee.id_client === client.idClient){
        return client.code;
      }
    }
    return 0;
  }
  getclient_nom(): any{
    for (const client of this.gestionDesFacturesService.clients){
      if (this.gestionDesFacturesService.commandeselectionnee.id_client === client.idClient){
        return client.nom_client;
      }
    }
    return 0;
  }
  getCommercial_nom(): any{
    for (const commercial of this.gestionDesFacturesService.commerciaux){
      if (commercial.id_commercial === this.gestionDesFacturesService.commandeselectionnee.id_commercial){
        // console.log(commercial);
        return commercial.nomUtilisateur;
      }
    }
    return 0;
  }

  ajouterarticle(f: NgForm): void{
    this.calculerprix();
    this.id_magasin =  this.gestionDesFacturesService.get_idMagasin(this.magasin_selected);
    console.log(this.id_magasin);
    if (this.id_magasin === 0){
      this.openSnackBar('veuillez entrer une magasin', 'OK');
    }
    else {
      if (this.article_quantite > 0){
        this.gestionDesFacturesService.ajouterarticle(f, this.boolean2, this.article_selected, this.article_prix, this.article_quantite,
          this.magasin_selected, this.designation, this.remise, this.TVA, this.PRIX, this.hc, this.id_article, this.id_magasin);
      }
      else {
        this.openSnackBar('veuillez entrer une quantite correte', 'OK');
        // (alert('veuillez entrer une quantite correte'));
        this.calculetotal();
      }
      f.reset();
      setTimeout(() => {
        this.calculetotal();
      }, 1000);
    }
   }
  supprimerarticle(i: number): any{
    this.gestionDesFacturesService.articlesfacturees.splice(i, 1);
    this.calculetotal();
  }
  onSubmitt(f: NgForm): any{
  }
  onSubmit(f: NgForm): void {
    console.log(this.gestionDesFacturesService.commandeselectionnee);

    if (this.gestionDesFacturesService.articlesfacturees.length !== 0){
      if (!this.configurationService.facture_sans_commande){
        console.log(this.gestionDesFacturesService.commandeselectionnee);
        if (this.gestionDesFacturesService.commandeselectionnee !== undefined){
          if (confirm( 'Êtes-vous sûre de lancer cette facture')) {
            console.log(f.value.nom_client);
            if (this.boolean2) {
              const facture = {
                num_facture: f.value.num_facture,
                num_commande: this.gestionDesFacturesService.commandeselectionnee.num_commande,
                id_client: this.gestionDesFacturesService.commandeselectionnee.id_client,
                id_commercial: this.gestionDesFacturesService.commandeselectionnee.id_commercial,
                total_TTC: this.totalTTC,
                total_HT: this.totalhc,
                date_de_lancement: f.value.date_facture,
                nom_client: this.getclient_nom()
              };
              setTimeout(
                () => {
                  this.gestionDesFacturesService.enregistrerFacture(facture);
                }, 200
              );
            }
            else {
              const facture = {
                num_facture: f.value.num_facture, id_client: this.client.idClient,
                id_commercial: this.commercial_id_selected, total_TTC: this.totalTTC, total_HT: this.totalhc,
                status: f.value.status, date_de_lancement: f.value.date_facture, nom_client: this.client_selectionnee
              };
              setTimeout(
                () => {
                  this.gestionDesFacturesService.enregistrerFacture(facture);
                }, 200
              );
            }
          }
        }
        else {alert ('vous pouvez pas lancer une facture non liee a une telle commande'); }
      }
      else {
        if (confirm( 'Êtes-vous sûre de lancer cette facture')) {
          console.log(f.value.nom_client);
          if (this.boolean2) {
            const facture = {
              num_facture: f.value.num_facture,
              num_commande: this.gestionDesFacturesService.commandeselectionnee.num_commande,
              id_client: this.gestionDesFacturesService.commandeselectionnee.id_client,
              id_commercial: this.gestionDesFacturesService.commandeselectionnee.id_commercial,
              total_TTC: this.totalTTC,
              total_HT: this.totalhc,
              date_de_lancement: f.value.date_facture,
              nom_client: this.getclient_nom()
            };
            setTimeout(
              () => {
                this.gestionDesFacturesService.enregistrerFacture(facture);
              }, 200
            );
          }
          else {
            const facture = {
              num_facture: f.value.num_facture, id_client: this.client.idClient,
              id_commercial: this.commercial_id_selected, total_TTC: this.totalTTC, total_HT: this.totalhc,
              status: f.value.status, date_de_lancement: f.value.date_facture, nom_client: this.client_selectionnee
            };
            setTimeout(
              () => {
                this.gestionDesFacturesService.enregistrerFacture(facture);
              }, 200
            );
          }
        }
      }
    }
    else {
      this.openSnackBar('verifier que vous avez facturer au moins un article', 'OK');
    }
  }
}
