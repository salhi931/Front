import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDeStockService} from "../../../services/gestion-de-stock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {PieceJOintfactureComponent} from "../../factures/piece-jointfacture/piece-jointfacture.component";
import {Form, FormControl, NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-validation-transfert-stock',
  templateUrl: './validation-transfert-stock.component.html',
  styleUrls: ['./validation-transfert-stock.component.css']
})
export class ValidationTransfertStockComponent implements OnInit {
  displayedColumns: string[] = ['N.o', 'codeArticle', 'NomArticle', 'quantite', 'quantiteApprouvee', 'magasin'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
   VerificationStock = true;
  magasins: any = [];
  magasinSelected: any;
  magasin_selectedpartiale: any;
  article_selected: any;
  article_selectedID: any;
  designation: any;
  article_quantite: any = 1;
  options: string[] = [] ;
  myControl = new FormControl();
  // @ts-ignore
  filteredOptions: Observable<string[]>;
  // @ts-ignore
  myControl = new FormControl();
  // tslint:disable-next-line:variable-name
  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar, public gestionDeStockService: GestionDeStockService, private router: Router, private route : ActivatedRoute ) { }

  ngOnInit(): void {
    if (this.gestionDeStockService.id_Transfert !== undefined){
      if (this.gestionDeStockService.transfertentete.chargement){
        this.displayedColumns = ['N.o', 'codeArticle', 'NomArticle', 'quantiteStock', 'quantite',  'quantiteApprouvee', 'magasin'];
      }
      this.getOptions();
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      this.gestionDeStockService.getMagasin()
        .subscribe(data => {
          console.log(data);
          this.magasins = data;
          this.dataSource.data =  this.gestionDeStockService.transfertdetail;
          setTimeout( () => {
            this.dataSource.paginator = this.paginator;
            // this.magasinSelected = String(this.magasinSelected)
            this.dataSource.sort = this.sort;
          }, 10);
        });


    }
    else{
      this.router.navigate(['/transfert'], {relativeTo: this.route});
    }
  }
  ajouterarticle(f2: NgForm): any{
    // @ts-ignore
    const article = this.gestionDeStockService.articles.filter(art => art.code_article === this.article_selected);
    if ( article.length > 0){
      const idArticle1 = article[0].id_article;
      let element;
      if (this.gestionDeStockService.transfertentete.chargement){
        // @ts-ignore
        element = this.dataSource.data.filter(dat => dat.idArticle === idArticle1 && dat.idMagasinOrigine === f2.value.magasin);
      }
      else{
        // @ts-ignore
        element = this.dataSource.data.filter(dat => dat.idArticle === idArticle1 && dat.idMagasinDestinataire === f2.value.magasin);
      }
      // @ts-ignore
      if (element.length > 0){
        alert('article existe deja');
        f2.reset();
      }
      else{
        let lien;
        if (this.gestionDeStockService.transfertentete.chargement){
          lien = {Code: this.article_selected, id : null, idArticle: idArticle1, idMagasinDestinataire: 'COM10', idMagasinOrigine: f2.value.magasin, idTransfert: 20068,
            nomArticle: this.designation, quantite: this.article_quantite, quantiteStock: 19, quantiteValide: this.article_quantite, stock: true};
         }
        else{
          lien = {Code: this.article_selected, id : null, idArticle: idArticle1, idMagasinDestinataire: f2.value.magasin, idMagasinOrigine: f2.value.magasin, idTransfert: 20068,
            nomArticle: this.designation, quantite: this.article_quantite, quantiteStock: 19, quantiteValide: this.article_quantite, stock: true};         }

        // @ts-ignore
        this.dataSource.data.push(lien);
        this.dataSource.data = this.dataSource.data;
        console.log(this.dataSource.data);
      }
      /*
        Code: "100-003"
        id: 20428
        idArticle: 1751
        idMagasinDestinataire: "COM10"
        idMagasinOrigine: "1"
        idTransfert: 20068
        nomArticle: "Elegance Extra Strong Hair Gel - 100 Ml"
        quantite: 2
        quantiteStock: 19
        quantiteValide: 2
        stock: true*/
    }
    else {
      alert('Article non trouvé');

    }
    const ligne  = 0;
  }
  getDesignation(f: NgForm): any{
    // @ts-ignore
    const article = this.gestionDeStockService.articles.filter(art => art.code_article === this.article_selected);
    if ( article.length > 0){
      this.designation = article[0].nom_article;
    }
    else {
      this.designation = '';

    }
    // @ts-ignore
    console.log( article)
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


  valider(): any{
    // @ts-ignore
     if (true){
      this.gestionDeStockService.verifierStockMobileWeb(this.gestionDeStockService.transfertentete.idCommercial)
        .subscribe(data => {
          if (data === 1){
            alert('le stock Mobile-Web est incompatible');
          }
          if (data === 2){
            this.gestionDeStockService.verifier_validerStock(this.dataSource);
          }
        }, error => { alert(error.message); });
      // this.gestionDeStockService.verifier_validerStock(this.dataSource);

    }
    else{
      const packTransfert = {transfertentete: this.gestionDeStockService.transfertentete, transfertdetail: this.dataSource.filteredData};
      this.gestionDeStockService.save(packTransfert);
    }
  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  exportTable(): void{
    this.gestionDeStockService.exportToPdf('ExampleTable1');
  }
  onchangeMagasin(): any{
    // chargement
    if (this.gestionDeStockService.transfertentete.chargement){
      // @ts-ignore
      this.dataSource.data.forEach( data => data.idMagasinOrigine = this.magasinSelected);

    }
    // dechargement
    if (!this.gestionDeStockService.transfertentete.chargement){
      // @ts-ignore
      this.dataSource.data.forEach( data => data.idMagasinDestinataire = this.magasinSelected);
    }
  }
  getPieceJointes(num: any): any{
       this.gestionDeStockService.getImage(num)
        .subscribe(
          res => {
            // this.gestionDesFacturesService.selectedFileListConsulte = res;
            this.dialog.open(PieceJOintfactureComponent, {data: res, height: '700px',
              width: '700px'});

            /*const base64Data = retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
          }
        );
  }
}
