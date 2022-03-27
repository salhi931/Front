
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
@Injectable({
  providedIn: 'root'
})
export class GestionDeStockService implements OnInit{
   magasins: any[] = [];
   commerciaux: any[] = [];
   articles: any = [];

  // tslint:disable-next-line:variable-name
   constructor(private _snackBar: MatSnackBar, private http: HttpClient) {
  }
   // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
     // this.getarticles();
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

   modifierStock(stock: any): any{
        this.http.patch(environment.HTTP + 'stocks/' + stock.id, stock)
          .subscribe(data => {
            console.log(data);
          }, error => {alert(error.message); });
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
}
