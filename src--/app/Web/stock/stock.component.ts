import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {GestionDeStockService} from "../../services/gestion-de-stock.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigurationService} from "../../services/configuration.service";
import {FormControl, NgForm} from "@angular/forms";
import {DialogFactureComponent} from "../factures/dialog-facture/dialog-facture.component";
import {DialogStockComponent} from "./dialog-stock/dialog-stock.component";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  magasinSelectionnee: any;
  entrepot = true;
  Transferts = false;
  nouveaumagasins = false;
  tpes = false;
  virements = false;
  montantPayeespece = 0;
  montantPayecheque = 0;
  numCheque: any;
  banquenumCheque: any;
  dateCheque: any;
  consultation_stock = false;
  // @ts-ignore
  filteredOptions: Observable<string[]>;
  options: string[] = [];
  myControl = new FormControl();
  article_selected: any;
  article_quantite: any;
  article_designation: any;

  displayedColumns: string[] = ['N.o', 'nom_magasin', 'adresse', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  displayedColumns2: string[] = ['N.o', 'article', 'quantite',  'edit'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  dataSource2 = new MatTableDataSource([]) ;
  filtrage2: any;

  // tslint:disable-next-line:max-line-length variable-name
  constructor(  private _snackBar: MatSnackBar, public dialog: MatDialog, public gestionDeStockService: GestionDeStockService, public configurationService: ConfigurationService) { }

  openDialog2(stock: any): void{
    const dialogref = this.dialog.open(DialogStockComponent);
    dialogref.afterClosed().subscribe(data => {
      if (data){
        stock.quantite = data;
        this.gestionDeStockService.modifierStock(stock);
      }
    }, error => {
      console.log(error.message);
    });
  }
  ngOnInit(): void {
    this.gestionDeStockService.getMagasin()
      .subscribe( data => {
        this.gestionDeStockService.magasins = data;
        // @ts-ignore
        this.dataSource = new MatTableDataSource( this.gestionDeStockService.magasins) ;
        setTimeout(
            () => {
              this.dataSource.paginator = this.paginator; }, 10);

        console.log(data);
      }, error => {alert(error.message); }
      );
    this.gestionDeStockService.getarticles()
      .subscribe(data => {
        this.gestionDeStockService.articles = data;
        this.getOptions();
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      });

  }
  getarticle(code: number): any{
    for ( const article of this.gestionDeStockService.articles){
      if (article.code_article === code){
        this.article_designation = article.nom_article;
      }
    }
  }
  getIdArticle(code: number): any{
    for ( const article of this.gestionDeStockService.articles){
      if (article.code_article === code){
        return article.id_article;
      }
    }
  }
  private _filter(value: string): any{
    if (value !== undefined){
      const filterValue = value.toLowerCase();
      return this.options.filter(option => option.toLowerCase().includes(filterValue)); }
  }
  getOptions(): void{
    for (const article of this.gestionDeStockService.articles){
      this.options.push(article.code_article);
    }
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  appliquerfilter2(filtervalue: string): any{
    this.dataSource2.filter = filtervalue.trim().toLocaleLowerCase();
  }
  getStockMagasin(id: any): any {

  }
  onModifier2(stock: any): void{
  this.openDialog2(stock);
  }
  onModifier(id: any): any{
    let stock = [];
    this.gestionDeStockService.getStock(id)
      .subscribe(data => {
        console.log(data);
        stock = data;
        // @ts-ignore
        for (const stocks of stock){
          stocks.nom_article = this.gestionDeStockService.getArticleCorresp(stocks.idArticle);
          stocks.code_article = this.gestionDeStockService.getcodearticle(stocks.idArticle);

        }
        this.dataSource2 = new MatTableDataSource( data) ;
        setTimeout(
          () => {
            this.dataSource2.paginator = this.paginator2;
          }, 10);
        // @ts-ignore
        this.consultation_stock = true;

      });

  }
  retour(): void{
    this.consultation_stock = false;
  }
  onSupprimer(id: any): void{
    this.gestionDeStockService.SupprimerMagasin(id)
      .subscribe(() => { window.location.reload(); }, error => {alert(error.message); });

  }

  entrepots(): any {
    this.entrepot = true;
    this.Transferts = false;
    this.nouveaumagasins = false;
    this.tpes = false;
    this.virements = false;
  }

  Transfert(): any {
    this.consultation_stock = false;
    this.entrepot = false;
    this.Transferts = true;
    this.nouveaumagasins = false;
    this.tpes = false;
    this.virements = false;
  }

  nouveaumagasin(): any {
    this.consultation_stock = false;
    this.entrepot = false;
    this.Transferts = false;
    this.nouveaumagasins = true;
    this.tpes = false;
    this.virements = false;
  }

  tpe(): any {
    this.consultation_stock = false;
    this.entrepot = false;
    this.Transferts = false;
    this.nouveaumagasins = false;
    this.tpes = true;
    this.virements = false;
  }

  virement(): any {
    this.consultation_stock = false;
    this.entrepot = false;
    this.Transferts = false;
    this.nouveaumagasins = false;
    this.tpes = false;
    this.virements = true;
  }

  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }

  AjouterMagasin(nouveaumagasin: NgForm): any{
    this.gestionDeStockService.AjouterMagasin(nouveaumagasin)
      .subscribe(data => {
        if (data){
          alert('vous avez ajouter un magasin');
        }
      });
    console.log(nouveaumagasin.value);
  }
  Ajoute(fTransferts: NgForm): any{
    if (fTransferts.value.magsin_depart === fTransferts.value.magsin_destinataire ){
      this.openSnackBar('changer le magasin destinataire', 'OK');
    }
    else {
      // tslint:disable-next-line:variable-name
      const id_article = this.getIdArticle(this.article_selected);
      if (id_article === undefined){
        this.openSnackBar('le code d\'article est non valide', 'OK');
      }
      else {
        // tslint:disable-next-line:max-line-length
        this.gestionDeStockService.TransfertDeStock(fTransferts.value.magsin_depart, fTransferts.value.magsin_destinataire, id_article, fTransferts.value.quantite);
      }
    }
  }
}
