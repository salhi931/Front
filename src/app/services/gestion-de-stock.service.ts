
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class GestionDeStockService implements OnInit{
   magasins: any[] = [];
   commerciaux: any[] = [];
   articles: any = [];
   transfertentete: any;
   transfertdetail: any;
  // tslint:disable-next-line:variable-name
   id_Transfert: any;

  // tslint:disable-next-line:variable-name
   constructor(private _snackBar: MatSnackBar, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
   // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
     // this.getarticles();
  }
  exportToPdf(tableId: string, name?: string): any {
    // tslint:disable-next-line:one-variable-per-declaration
    let printContents, popupWin;
    // @ts-ignore
    printContents = document.getElementById(tableId).innerHTML;
    console.log(printContents);
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    // @ts-ignore
    popupWin.document.open();
    // @ts-ignore
    popupWin.document.write(`
    <html>
      <head>
        <title>Transfert de stock</title>
      </head>
      <body onload="window.print();window.close()"><table class="mat-table table-bordered">${printContents}</table></body>
    </html>`
    );
    // @ts-ignore
    popupWin.document.close();
  }
  getMagasin(): Observable<any>{
    this.http.get(environment.HTTP + 'Commerciaux')
      .subscribe(data => {
        console.log(data);
        // @ts-ignore
        this.commerciaux = data;
      }, error => {alert(error.message); });
    return this.http
      .get(environment.HTTP + 'magasin');
  }
   AjouterMagasin(nouveaumagasin: NgForm): Observable<any>{
    return this.http
      .post(environment.HTTP + 'magasinPost', nouveaumagasin.value);
   }
   // tslint:disable-next-line:variable-name
   SupprimerMagasin(id_magasin: number): Observable<any>{
    return this.http
      .delete(environment.HTTP + 'magasinDelete/' + id_magasin);
   }
   getarticles(): Observable<any>{
    return this.http.get(environment.HTTP + 'Articles');

   }
   getStock(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'getStock/' + id);
   }
  getStockCommercial(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'getStockCommercial/' + id);
   }
   getArticleCorresp(id: number): any{
     for (const article of this.articles) {
       if (article.id_article === id) {
         return article.nom_article;
       }
     }
     return false;
   }
   getcodearticle(id: number): any{
     for (const article of this.articles) {
       if (article.id_article === id) {
         return article.code_article;
       }
     }
     return false;
   }
   modifierStock(quantitee: any , stock: any): Observable<any>{
     //console.log(stock);
       return this.http.patch(environment.HTTP + 'stocks/' + stock.id, {quantite: quantitee});
   }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  // tslint:disable-next-line:variable-name
   TransfertDeStock(id_magasin_depart: any, id_magasin_destinataire: any, id_article: any, quantite: any): any{
     this.http.get(environment.HTTP + 'verifierStock/' + '/' + id_article + '/' + id_magasin_depart + '/' + quantite)
       .subscribe(data => {
         if (data !== 0.198) {
           if (data < 0) {
             this.openSnackBar('la quantite est non disponible : ' + (data + quantite), 'OK');
           }
           else {
             this.http
               .get(environment.HTTP + 'transfertStock/' + id_magasin_depart + '/' +
                    id_magasin_destinataire + '/' + id_article  + '/' + quantite)
               .subscribe(data2 => {
                 if (data){
                   alert('le transfert est bien fait');
                   console.log(data2);
                 }
                 else {
                   this.openSnackBar('le stock n\'existe pas', 'OK');
                 }
               });
           }
         } else {
           this.openSnackBar('le stock n\'existe pas', 'OK');

         }
       });


   }
   // ----------------------transferts----------------------

  getCommercialNom(id: any): any{
    for ( const commerial of this.commerciaux){
      if ( commerial.id_commercial === id){
        return commerial.nom;
      }
    }
    return '--------------';
  }
  getCommericaux(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Commerciaux');
  }
  getTransferts(): Observable<any>{
     return this.http
       .get(environment.HTTP + 'Demandedetransfertgetall');
  }
   supprimerTransfert(id: any): any{

   }
  getTransfertPack(id: any): any{
    // @ts-ignore
    let stock: any = [];
    this.getarticles()
      .subscribe(data1 => {
        this.articles = data1;
        this.http.get(environment.HTTP + 'Demandedetransfertget/' + id)
          .subscribe(data => {
            // @ts-ignore
            this.transfertentete = data.transfertentete;
            // @ts-ignore
            this.transfertdetail = data.transfertdetail;
            this.transfertentete.commerical = this.getCommercialNom(this.transfertentete.idCommercial);
            console.log(this.transfertentete);
            if (this.transfertentete.chargement === true){
              this.transfertentete.type = 'Chargement';
              this.getStockCommercial(this.transfertentete.idCommercial)
                .subscribe(dataComm => {
                   stock = dataComm;
                   console.log(stock);
                  if (this.transfertentete.status) {
                    for (const detail of this.transfertdetail){
                      detail.stock = true;
                      //detail.color = '#FF3366';
                      detail.nomArticle = this.getArticleCorresp(detail.idArticle);
                      detail.Code = this.getcodearticle(detail.idArticle);
                    }
                  }
                  else{
                    for (const detail of this.transfertdetail){
                      detail.stock = true;
                      //detail.color = '#FF3366';
                      detail.quantiteValide = detail.quantite;
                      // @ts-ignore
                      detail.quantiteStock = stock.filter( stock1 => stock1.idArticle === detail.idArticle)[0].quantiteMobile;
                      detail.nomArticle = this.getArticleCorresp(detail.idArticle);
                      detail.Code = this.getcodearticle(detail.idArticle);
                    }
                  }
                });
            }
            else{
              this.transfertentete.type = 'Déchargement';
              if (this.transfertentete.status) {
                for (const detail of this.transfertdetail){
                  detail.stock = true;
                  // @ts-ignore
                   //detail.color = '#FF3366';
                  detail.nomArticle = this.getArticleCorresp(detail.idArticle);
                  detail.Code = this.getcodearticle(detail.idArticle);
                }
              }
              else{
                for (const detail of this.transfertdetail){
                  detail.stock = true;
                  //detail.color = '#FF3366';
                  detail.quantiteValide = detail.quantite;
                  detail.nomArticle = this.getArticleCorresp(detail.idArticle);
                  detail.Code = this.getcodearticle(detail.idArticle);
                }
              }
            }
            // @ts-ignore

            console.log(data);
            this.router.navigate(['/transfert-validation'], {relativeTo: this.route});

          });
      });
  }
  verifierStock(pack: any[]): Observable<any>{
    return this.http
      .post(environment.HTTP + 'VerificationStock', pack);
  }
  verifierStockMobileWeb(idMagasin: any): Observable<any>{
    return this.http
      .get(environment.HTTP + 'VerifierStockMobileWeb/' + idMagasin);
  }
  valider(pack: any): Observable<any>{
     return this.http
       .post(environment.HTTP + 'validerTransfert', pack);
  }
  verifier_validerStock(dataSource: any): any{
    const packk = [];
    for (const detail of this.transfertdetail) {
      //detail.quantite = detail.quantiteApprouvee;
      packk.push({idLigne: detail.id, idMagasin: detail.idMagasinOrigine, idArticle: detail.idArticle, qurantite: detail.quantiteValide});
    }

    // @ts-ignore
    this.verifierStock(packk)
      .subscribe(data => {
        console.log(data);
        for (const elmt of dataSource.filteredData){
          // @ts-ignore
          const verification = data.filter( t => t.idLigne === elmt.id);
          console.log(verification);
          if (verification[0].status === false) {
            // @ts-ignore
            elmt.color = '#FF3366';
          }
          else {
            // @ts-ignore
            elmt.color = '#ffffff';
          }
        }
        let i = 0;
        for (const list of data){
          if (!list.status){
            this.openSnackBar('nous vous signalons de l\'indisponibilité des articles en rouge', 'OK');
            i = 2;
            break;
          }
        }
        // @ts-ignore
        if (i === 0) {
          this.openSnackBar('Verification de stock ', 'OK');
          const packTransfert = {transfertentete: this.transfertentete, transfertdetail: dataSource.filteredData};
          this.save(packTransfert);
        }
        else {

        }
        //return this.veriferLignesTransfertStock(data);
      }, error => { alert(error.message); });
  }
  veriferLignesTransfertStock(List: any): boolean{
     for (const list of List){
       if (!list.status){ return false; }
     }
     return  true;
  }
  save(pack: any): any{
    console.log(pack);
    this.valider(pack)
      .subscribe(data => {
        console.log(pack);
        if (data === 0 ) {
          alert('une error a été détectée');
        }
        else{
          alert ('le transfert a été validé');
          this.router.navigate(['/Transfert-de-stcok'], {relativeTo: this.route});
        }
      }, error => {alert(error.message); });
   }
   UpdateMagasinStock(id: any): Observable<any>{
     return this.http
       .get(environment.HTTP + 'updateStockMagasin/' + id);
   }
}
