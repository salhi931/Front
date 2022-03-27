import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {GestionDesArticlesService} from "./gestion-des-articles.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GestionDesCommandesService implements OnInit{
  commandes: any;
  clients: any = [];
  commerciaux: any = [];
  articles: any = [];
  articlescommandees: any = [];
  TablePrix: any = [];
  magasinsList: any = [];
  magasins: any = [];
  id_commande: any;
  articlesasupprimer: any = [];
  // ----------------------------
  Promotion: any;
  PromotionArticles: any;
  constructor(private http: HttpClient, public gestionDesArticlesService: GestionDesArticlesService, private router: Router, private route: ActivatedRoute) {
  }
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    this.gestionDesArticlesService.getarticles().subscribe(data => {
      this.articles = data;
    });
  }
  getClients(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Clients');
  }
  getCommericaux(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Commerciaux');
  }

  gettableArticle(id: number): void{
    this.http
      .get(environment.HTTP + 'Prixtable/' + id)
      .subscribe(data => {
        this.TablePrix = data;
        console.log(this.TablePrix);
      }, error => {alert('un erreur s\'est produite'); });
  }
  getCommandes(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'commande');
  }
  getMagasins(): any{
    this.magasins = [];
    for (const magasin of this.magasinsList){
      this.magasins.push(magasin.nom_magasin);
    }
    return this.magasins;
  }
  getMagasinsList(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'magasin');
  }
  getMagasin(id: number): any{
    for (const magasin of this.magasinsList){
      if (magasin.id_commercial === Number(id)){
        return magasin.nom_magasin;
      }
    }
    return '';
  }
  getprixarticle(code: string){
    if (this.TablePrix){
     for (const article of this.articles){
      if (article.code_article === code){
        for (const prix of this.TablePrix){
          // tslint:disable-next-line:no-conditional-assignment
          if ( prix.id_article === article.id_article){
            return prix.prix;
          }
        }
      }
    }
    }
    return Number('0');
  }
  getPromotion(idClient: number): any{
    this.Promotion = [];
    this.PromotionArticles = [];
    this.http.get(environment.HTTP + '/getPromotion/' + idClient).subscribe(data => {
      this.Promotion = data;
      console.log(data);
      for (const promotion of this.Promotion){
        this.http.get(environment.HTTP + 'getPromotionArticles/' + promotion.id).subscribe(data1 => {
          const Promotionss = data1;
          // @ts-ignore
          for (const promot of Promotionss){
            this.PromotionArticles.push(promot);
          }
          console.log(this.PromotionArticles);
        });
      }
      console.log(this.PromotionArticles);

      /*
     */
    });

  }


  getdesignationarticle(code: string){
     for (const article of this.articles){
      if (article.code_article === code){
            return article.nom_article;
      }
    }
     return ('');
  }
  getTVAarticle(code: string){
     for (const article of this.articles){
       console.log(article.TVA);
      if (article.code_article === code){
            return article.tva;
      }
    }
     return Number(0);
  }
  getRemise(id: number): any{
    let promotion = 0;
    for (const article of this.PromotionArticles){
        if (article.idArticle === id){
          for (const promot of this.Promotion){
            if (promot.valeur > promotion && promot.id === article.idPromotion){
              promotion = promot.valeur; }
          }
        }
    }
    return promotion;
  }
  supprimer(id: number): void{
    // tslint:disable-next-line:ban-types
    this.articlesasupprimer = [];
    this.http.get(environment.HTTP + 'commandedetailss/' + id)
      .subscribe(data3 => {
        this.articlesasupprimer = data3;
        console.log(this.articlesasupprimer);
        this.http
          .delete(environment.HTTP + 'commandes/' + id)
          .subscribe(data => {
            for (const article of this.articlesasupprimer){
              this.http
                .delete(environment.HTTP + 'commandedetails/' + article)
                .subscribe(() => {
                  console.log('delete' + article);
                });
            }
            alert('suppression reussite');
            window.location.reload();
          }, error => {alert('une error s\'est produite'); }); });
  }
  modifier(id: number): any{
    console.log(id);
  }
  rechercherClient(code: any): any{
    for (const client of this.clients){
      if (client.code === String(code)){
        return client; }
    }
    return null;
  }
  recherche_code(nom: string): any{
    for (const client of this.clients){

      if (client.nom_client === nom){
        return client.code; }
    }
  }
  recherche_nom(code: string): any{
    for (const client of this.clients){

      if (client.code === code){
        return client.nom_client; }
    }
  }
  get_idMagasin(magasin: string): any{
    for (const mag of this.magasinsList){
      if (mag.nom_magasin === magasin){
        return mag.id_magasin;
      }
    }
    return (0);
  }

  getidarticle(code: string): any{
    for (const article of this.articles){
      if (article.code_article === code){
        return article.id_article;
      }
    }
    return ('');
  }

  // tslint:disable-next-line:variable-name
  ajouterarticle(article_selected: any, article_prix: any, article_quantite: any, magasin_selected: any, designation: any, remise_: any, TVA_: any, total: number, hc: number,  id_articlee: number,  id_magasinn: number): any{
    for (const article of this.articlescommandees){
      if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn
        && article.remise === remise_ && article.tva === TVA_){
        article.quantite += article_quantite;
        article.total_ligne_TTC += total;
        article.total_ligne_HT += hc;
        return 0;
      }
    }

    this.articlescommandees.push({idCommande: undefined, code_article: article_selected,
      quantite: article_quantite, prix: article_prix, magasin: magasin_selected ,
      description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total, total_ligne_HT	: hc,
      openquantite: article_quantite, id_article: id_articlee, id_magasin: id_magasinn});
    console.log(this.articlescommandees);
  }
  rechercherCommercial(id: number): any{
    for (const commercial of this.commerciaux){

      if (commercial.id_commercial === Number(id)){
        return commercial.nom; }
    }
  }
  enregistrerCommande(commande: any): any{
    console.log(commande);
    this.http
      .post(environment.HTTP + 'commandepost', commande)
      .subscribe( data => {
        this.id_commande = data;
        console.log(this.id_commande);
        if (this.id_commande){
          for ( const article of this.articlescommandees){
            article.idCommande = this.id_commande;
          }
          for ( const article of this.articlescommandees){
            this.http
              .post(environment.HTTP + 'commandedetails', article)
              // tslint:disable-next-line:no-shadowed-variable
              .subscribe( data => {
                console.log(data);
                this.router.navigate(['/commandes'], {relativeTo: this.route});

              });
          }
        }
      }, error => {
        alert(error.message );
        console.log(error.message);
      });
  }
  changestatuscommande(id: any, commande: any){
    this.http
      .patch(environment.HTTP + 'commandes/' + id, commande)
      .subscribe(data => {
        console.log(data);
      }, error => {console.log(error.message); });
  }
}
