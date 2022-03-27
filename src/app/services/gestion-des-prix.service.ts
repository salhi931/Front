import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm, NgModel} from '@angular/forms';
import {TablePrix} from '../models/TablePrix';
import {Observable} from 'rxjs';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class GestionDesPrixService {
  id_prix: any;
  Prix: any;
  zones: any;
  clients: any;
  articles: any;
  TablePrix: any;
  // tslint:disable-next-line:variable-name
  // @ts-ignore
  TablePrix__: TablePrix = new TablePrix();
  TablePrix_: TablePrix[] = [];
  famille: any;
  SousFamille: any;
  Promotions: any;
  PromotionConsultee: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute ) {
  }
  getPrix(): any{
    this.http
      .get(environment.HTTP + 'prix')
      .subscribe(data => {
        this.Prix = data;
        console.log(this.id_prix);
      }, error => {alert('un erreur s\'est produite'); });
  }
  getTable_prix(id: number): void{
    this.http
      .get(environment.HTTP + 'Prixtable/' + id)
      .subscribe(data => {
        this.TablePrix = data;
        console.log(this.TablePrix);
      }, error => {alert('un erreur s\'est produite'); });
  }
  getTable_prix2(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'Prixtable/' + id);
  }
  addPrixtable(f: NgForm): Observable<any> {
     return this.http
                .post(environment.HTTP + 'prixxxx', f.value);
  }

  // tslint:disable-next-line:variable-name
  onAffecterPrix(id_article: number, code_article: any, nom_article: any, prix: NgModel ): any{
      this.TablePrix__.id_article = id_article;
      this.TablePrix__.code_article = code_article;
      this.TablePrix__.nom_article = nom_article;
      // @ts-ignore
      this.TablePrix__.prix = prix;
      for (const article of this.TablePrix_){
        if (article.id_article === this.TablePrix__.id_article){
          article.prix = this.TablePrix__.prix;
          article.code_article = this.TablePrix__.code_article;
          article.nom_article = this.TablePrix__.nom_article;
          // @ts-ignore
          this.TablePrix__ = new TablePrix();
          return 0;
        }
      }

      this.TablePrix_.push(this.TablePrix__);
      console.log(this.TablePrix_);
      // @ts-ignore
      this.TablePrix__ = new TablePrix();
      return 0;
  }

  Sauvgarder(descriptionn: (() => string) | string): any{
    // tslint:disable-next-line:prefer-for-of
    this.http
      .post(environment.HTTP + 'prixxxx', { description: descriptionn})
      .subscribe(data => {
        for (let i = 0; i < this.TablePrix_.length; i++) {
          this.TablePrix_[i].id_prix = Number (data);
        }
        for (let i = 0; i < this.TablePrix_.length; i++) {
          this.http
            .post(environment.HTTP + 'prixtables', this.TablePrix_[i])
            .subscribe(() => {
            }, error => {
              console.log('un erreur s\'est produit');
            });    }
        alert('vous avez ajouter un table prix avec succes');
        this.router.navigate(['/gestion-des-prix'], {relativeTo: this.route});
      }, error => {
        alert('un erreur s\'est produit');
      });
  }

  // tslint:disable-next-line:variable-name
  affecter(assigned: any, table_prixSelectionnee: any): any{
    for (const assignd of assigned){
      this.http
        .get(environment.HTTP + 'affctation/' + assignd + '/' + table_prixSelectionnee)
        .subscribe(data => {
          console.log(data);
        });
    }
  }
  getZones(): Observable<any> {
    return this.http.get(environment.HTTP + 'getzones');
  }
  getClients(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Clients');
  }
  getarticles(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'Articles');
  }
  getFamille(): any{
    this.http
      .get(environment.HTTP + 'getFamille')
      .subscribe(data => {
        this.famille = data;
      }, error => {console.log(error.message); });
  }
  getSousFamille(): any{
    this.http
      .get(environment.HTTP + 'getSousFamille')
      .subscribe(data => {
        this.SousFamille = data;
        console.log(this.SousFamille);
      }, error => {console.log(error.message); });
  }

  SauvgarderPromotion(value: any, articles: any[], clients: any[]): any{
    this.http
      .post(environment.HTTP + 'SauvegarderPromotion', value)
      .subscribe(data => {
        // tslint:disable-next-line:variable-name
        const id_promotion = data;
        for (const article of articles){
          this.http
            .post(environment.HTTP + 'promotionArticleses',
              {idPromotion: id_promotion, idArticle: article.id_article})
            .subscribe(data2 => {console.log(data2); }, error => {console.log(error.message); });
        }
        for (const client of clients){
          this.http
            .post(environment.HTTP + 'promotionCibles',
              {idPromotion: id_promotion, idClient: client.idClient})
            .subscribe(data2 => {console.log(data2); }, error => {console.log(error.message); });
        }

      });
  }
  // *---------------------------------------------------------------------------------------------------------------------
  getPromotions(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'getPromotions');
  }
  // @ts-ignore
  onConsulter(element): any{
    this.PromotionConsultee = element;
    this.router.navigate(['/consultation-promotion'], {relativeTo: this.route});
  }
  changestatusPromotion(id: any, promotion: any): Observable<any>{
    return  this.http
      .patch(environment.HTTP + 'promotions/' + id, promotion);
  }
  SauvgarderPromotionModifier(promotion: any): any{
    this.http
      .patch(environment.HTTP + 'promotions/' + promotion.id, promotion)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/promotion'], {relativeTo: this.route});
      }, error => {alert(error.message); });
  }
}
