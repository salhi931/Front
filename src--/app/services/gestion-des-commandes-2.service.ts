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

export class GestionDesCommandes2Service implements OnInit{
  //  commandes: any;
  clients: any = [];
  commerciaux: any = [];
  articles: any = [];
  articlescommandees: any = [];
  articlescommandeescopie: any = [];
  TablePrix: any = [];
  magasins: any = [];
  id_commande: any = 36;
  commande: any = [];
  magasinsList: any = [];
  Promotion: any;
  PromotionArticles: any;
  commercial_id_selected: any = 1;
  constructor(private http: HttpClient, public gestionDesArticlesService: GestionDesArticlesService, private router: Router, private route: ActivatedRoute) {
  }
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {


  }

  getidarticle(code: string): any{
    for (const article of this.articles){
      if (article.code_article === code){
        return article.id_article;
      }
    }
    return ('');
  }
  getcommandeanddetailcommane(id: any): void{
    this.gestionDesArticlesService.getarticles().subscribe(data12 => {
      this.articles = data12;
      this.getClients().subscribe(data2 => {
        this.clients = data2;
        this.http
          .get(environment.HTTP + 'commande1/' + id)
          .subscribe(data => {
            this.commande = data;
            console.log(this.commande);
            this.gettableArticle(this.commande.id_client);
            this.getPromotion(this.commande.id_client);
            this.http
              .get(environment.HTTP + 'commandedetail/' + this.id_commande)
              .subscribe(data1 => {
                this.articlescommandees = data1;
                this.http.get(environment.HTTP + 'commandedetailss/' + id)
                  .subscribe(data3 => {
                    this.articlescommandeescopie = data3;
                    console.log(this.articlescommandeescopie);
                    this.router.navigate(['/edition-consultation-commande'], {relativeTo: this.route});
                  }, error => { alert('error lors du chargement des articles commandees'); } );
              });
          }, error => {alert('une error s\'est produite'); });
      });
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
    const client = this.rechercherClient(id);
    this.http
      .get(environment.HTTP + 'Prixtable/' + client.list_prix)
      .subscribe(data => {
        this.TablePrix = data;
        console.log(this.TablePrix);
      }, error => {alert('un erreur s\'est produite'); });
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
  getprixarticle(code: string): any{
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


  getdesignationarticle(code: string): any{
    for (const article of this.articles){
      if (article.code_article === code){
        return article.nom_article;
      }
    }
    return ('');
  }
  getTVAarticle(code: string): any{
    for (const article of this.articles){
       if (article.code_article === code){
        return article.tva;
      }
    }
    return Number(0);
  }
  supprimer(id: number): void{
    this.http
      .delete('http://localhost:8080/commandes/' + id)
      .subscribe(data => {
        alert('suppression reussite');
      }, error => {alert('une error s\'est produite'); });
  }
  modifier(id: number): any{
    console.log(id);
  }
  rechercherClient(id: any): any{
    for (const client of this.clients){
      if (client.idClient === id){
        return client;
        console.log('haha');}
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

  // tslint:disable-next-line:variable-name typedef max-line-length
  ajouterarticle(article_selected: any, article_prix: any, article_quantite: any, id_articlee: any, magasin_selected: any, designation: any, remise_: any, TVA_: any, total: number, hc: number){
    this.articlescommandees.push({id: undefined, idCommande: this.id_commande, code_article: article_selected,
      quantite: article_quantite, prix: article_prix, magasin: magasin_selected , id_article: id_articlee,
      description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total, total_ligne_HT: hc, openquantite: article_quantite});
    console.log(this.articlescommandees);
  }
  rechercherCommercial(id: number): any{
    for (const commercial of this.commerciaux){

      if (commercial.id_commercial === Number(id)){
        return commercial.nom; }
    }
  }
  updatelistarticles(): void{
    for (const articlecopie of this.articlescommandeescopie){
     // console.log(articlecopie);
      // console.log(this.articlescommandeescopie);
      let ii = 0;
      for (const article of this.articlescommandees){
        article.idCommande = this.id_commande;
        console.log(article);

        //articlecopie.id_commande = this.id_commande;
        // console.log(article);
        // console.log(articlecopie);
        if (article.id ){
          console.log(article); }
        if (article.id === Number(articlecopie)){
          ii = ii + 1;

          }
        console.log(ii);
      }
      if (ii === 0) {
        this.http
          .delete(environment.HTTP + 'commandedetails/' + articlecopie)
          .subscribe(data => {
             console.log('delete' + articlecopie);
          });
      }

    }
    for (const article of this.articlescommandees){
      if (article.id === undefined){
        this.http
          .post(environment.HTTP + 'commandedetails', article)
          .subscribe(data => {
            console.log('ajout reussie');
          }); }
    }
  }
  enregistrerCommande(commande: any): void{
    console.log(commande);
    this.http
      .patch('http://localhost:8080/commandes/' + this.id_commande, commande)
      .subscribe( data => {
        console.log(data);
        this.updatelistarticles();
      }, error => {
        alert(error);
        console.log(error);
      });
  }
}
