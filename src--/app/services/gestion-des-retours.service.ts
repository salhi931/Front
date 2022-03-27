
import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {GestionDesArticlesService} from "./gestion-des-articles.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ConfigurationService} from "./configuration.service";
import {MatSnackBar} from "@angular/material/snack-bar";




@Injectable({
  providedIn: 'root'
})

export class GestionDesRetoursService implements OnInit{
  // tslint:disable-next-line:variable-name max-line-length
  constructor(private _snackBar: MatSnackBar, private http: HttpClient, public gestionDesArticlesService: GestionDesArticlesService, private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) {
  }
  retours: any;
  clients: any = [];
  commerciaux: any = [];
  articles: any = [];
  articlesderetours: any = [];
  TablePrix: any = [];
  magasins: any = [];
  idRetour: any;
  facturedetail: any = [];
  commandeselectionnee: any;
  factureSelectionnee: any;
  motif: any = [];
  var: any;
  magasinsList: any = [];
  retours_consultee: any;
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesArticlesService.getarticles();
    this.articles = this.gestionDesArticlesService.articles;
  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  getClients(): void {
    this.http
      .get(environment.HTTP + 'Clients')
      .subscribe(data => {
        this.clients = data;
      });
  }
  getMotifs(): void{
    this.http
      .get(environment.HTTP + '/getmotif')
      .subscribe(data => {
        this.motif = data;
      });
  }
  getClients2(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Clients');
  }

  getMagasinsList(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'magasin');
  }
  getCommericaux(): void{
    this.http.
    get(environment.HTTP + 'Commerciaux')
      .subscribe( data => {
        this.commerciaux = data;
      });
  }
  getCommericaux2(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Commerciaux')
  }
  // tslint:disable-next-line:variable-name
  nom_commercial_facture: any = '';
  code_client_retour: any = 0;
  retours_details : any;
  getRetourConsultee(id: number): any{
    this.http
      .get(environment.HTTP + 'getRetour/' + id)
      .subscribe(data => {
        this.retours_consultee = data;
        this.http
          .get(environment.HTTP + 'retourDetail/' + id)
          .subscribe(data1 => {
            // @ts-ignore
            this.retours_details = data1;
            console.log(this.retours_details);
            for (const client of this.clients){
              if (client.idClient === this.retours_consultee.id_client){
                this.code_client_retour =  client.code;
                this.router.navigate(['/consultation-retours', {relativeTo: this.route}]); }
            }
          });



      }, error => {alert('une error s\'est produite'); });
  }

  gettableArticle(id: number): void{
    this.http
      .get(environment.HTTP + 'Prixtable/' + id)
      .subscribe(data => {
        this.TablePrix = data;
        //console.log(this.TablePrix);
      }, error => {alert('un erreur s\'est produite'); });
  }
  getRetours(): any{
    this.http
      .get(environment.HTTP + 'retours')
      .subscribe(data => {
        this.retours = data;
      }, error => {alert('une error s\'est produite'); });
  }
  getMagasins(): any{
    this.magasins = [];
    for (const magasin of this.magasinsList){
      this.magasins.push(magasin.nom_magasin);
    }
    return this.magasins;
  }
  getMagasin(id: number): any{
    for (const magasin of this.magasinsList){
      if (magasin.id_commercial === Number(id)){
        return magasin.nom_magasin;
      }
    }
    return '';
  }
  getprixarticle(code: string ): any{
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
  getTablearticle(id: any): any{
    for ( const client of this.clients){
      if (client.idClient === id){
        return client.list_prix;
      }
    }
  }
  getNomCommercial(): any{

    for (const commercial of this.commerciaux){
      if (commercial.id_commercial === this.retours_consultee.id_commercial){
        console.log(commercial.nomUtilisateur);

        return commercial.nomUtilisateur;
      }
    }
    return '';

  }
  // @ts-ignore
  getFactureEtDetail(id: any): any{
    this.articlesderetours = [];
    this.http
      .get(environment.HTTP + 'getFacture/' + id)
      .subscribe(data => {
        this.factureSelectionnee = data;
        console.log(this.factureSelectionnee);
        // @ts-ignore
        this.gettableArticle(this.getTablearticle(data.id_client));
        console.log(this.TablePrix);
        this.http
          .get(environment.HTTP + 'facturedetail/' + id)
          .subscribe(data1 => {
            this.articlesderetours = data1;
            console.log(this.articlesderetours);
            return 1;
          });
      }, error => {alert('une error s\'est produite'); });

  }

  getdesignationarticle(code: string ){
    for (const article of this.articles){
      if (article.code_article === code){
        return article.nom_article;
      }
    }
    return ('');
  }
  getidarticle(code: string ): any{
    for (const article of this.articles){
      if (article.code_article === code){
        return article.id_article;
      }
    }
    return ('');
  }
  get_idMagasin(magasin: string): any{
    for (const mag of this.magasinsList){
      if (mag.nom_magasin === magasin){
        return mag.id_magasin;
      }
    }
    return (0);
  }
  getTVAarticle(code: string, articles: any): any{
    for (const article of articles){
      console.log(article.TVA);
      if (article.code_article === code){
        return article.tva;
      }
    }
    return Number(0);
  }
  supprimer(id: number): void{
    // tslint:disable-next-line:ban-types
    this.http
      .get(environment.HTTP + 'retourDelete/' + id)
      .subscribe(data => {
        if (data){
          alert('suppression reussite');
          window.location.reload();
        }
      }, error => {
        alert(error.message);
        window.location.reload();
      });
  }
  modifier(id: number): void{
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

  // tslint:disable-next-line:variable-name
  ajouterarticle(f: NgForm, boolean: boolean, article_selected: any, article_prix: any, article_quantite: any, magasin_selected: any,
                 // tslint:disable-next-line:variable-name
                 designation: any, remise_: any, TVA_: any, total: number, hc: number, id_articlee: number, id_magasinn: number): void{
      let quantite3 = article_quantite;
      for ( const article of this.articlesderetours){
        // tslint:disable-next-line:max-line-length
        if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
          quantite3 += article.quantite;
          //console.log('' + quantite3);
        }
      }
      if (boolean){
          this.http
            // tslint:disable-next-line:max-line-length
            .get(environment.HTTP + 'factureverifierarticle/' + this.factureSelectionnee.idFacture + '/' + id_articlee + '/' + id_magasinn + '/' + remise_ + '/' + article_prix + '/' + quantite3)
            .subscribe(dataz => {
              if (dataz === 3){
                let i = 0;
                for (const article of this.articlesderetours){
                  // tslint:disable-next-line:max-line-length
                  if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
                    article.quantite += article_quantite;
                    article.total_ligne_TTC += total;
                    article.total_ligne_HC += hc;
                    i += 1;
                  }
                }
                if (i === 0) {
                  this.articlesderetours.push({idRetour: undefined, code_article: article_selected,
                    quantite: article_quantite, prix: article_prix, magasin: magasin_selected ,
                    description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total,
                    total_ligne_HC	: hc, id_article: id_articlee, id_magasin: id_magasinn});
                  f.reset();
                  console.log(this.articlesderetours);
                }
                this.openSnackBar('quantite disponible', '');
              }
              if (dataz === 2){
                alert('vous voulez retourner plus que la quantite facturee');
              }
              if (dataz === null){
                alert('error');
              }
              if (dataz === 1){
                alert('cet article n\'existe pas dans la facture choisie' );
              }
            }, error => {
              alert(error.message);
            });
        }
        else {
          let k = 0;
          for (const article of this.articlesderetours){
            // tslint:disable-next-line:max-line-length
            if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
              article.quantite += article_quantite;
              article.total_ligne_TTC += total;
              article.total_ligne_HC += hc;
              k += 1;
            }
          }
          if (k === 0) {
            this.articlesderetours.push({idRetour: undefined, code_article: article_selected,
              quantite: article_quantite, prix: article_prix, magasin: magasin_selected ,
              description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total,
              total_ligne_HC	: hc, id_article: id_articlee, id_magasin: id_magasinn});
            this.openSnackBar('quantite disponible', '');
            f.reset();
            console.log(this.articlesderetours);
          }
        }
  }
  // tslint:disable-next-line:variable-name
  public verificationstock( id_articlee: any, id_magasine: any, quantitee: any): Promise<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get(environment.HTTP + 'verifierStock/'  + id_articlee + '/' + id_magasine + '/' + quantitee).toPromise();
  }

  // tslint:disable-next-line:variable-name max-line-length
  public verification_open_quantite(idFacture: any, id_articlee: any, id_magasine: any, remise: any, prix: any, quantitee: any): Promise<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get(environment.HTTP + 'factureverifierarticle/' + idFacture + '/' + id_articlee + '/' + id_magasine + '/' + remise + '/' + prix + '/' + quantitee).toPromise();
  }
  avantEnregistrer(): any{
    //this.getClients();
    // @ts-ignore
    let b = 0;
    this.var = 0;
    for (const article of this.articlesderetours){
      let quantite = 0;
      for (const article2 of this.articlesderetours){
        if (article.id_article === article2.id_article){
          quantite += article2.quantite;
        }
      }
      if (this.factureSelectionnee){
        // tslint:disable-next-line:max-line-length
        this.verification_open_quantite(this.factureSelectionnee.idFacture, article.id_article, article.id_magasin, article.remise, article.prix, article.quantite).then((dataz => {
          if (dataz === 2 || dataz === 1){
            b = 1;
            this.var = 1;
          }
        }));
      }
    }
    setTimeout(
      () => {
        return b; }, 10 );
  }
  enregistrerRetour(retour: any): void{
    this.getClients();
    const a = this.avantEnregistrer();
    console.log(a);
    console.log(this.var);
    setTimeout(
      () => {
        console.log(this.var);
        if (0 === this.var){
          this.http
            .post(environment.HTTP + 'retoursPost', retour)
            .subscribe( dataa => {
              this.idRetour = dataa;
              console.log(this.idRetour);
              if (this.idRetour){
                for ( const articlee of this.articlesderetours){
                  articlee.idRetour = this.idRetour;
                }
                for ( const articlee of this.articlesderetours){
                  if ( this.factureSelectionnee){
                    this.http
                      .post(environment.HTTP + 'retourdetailspost/' + this.factureSelectionnee.idFacture , articlee)
                      // tslint:disable-next-line:no-shadowed-variable
                      .subscribe( data21 => {
                        console.log(data21);
                      });
                  }
                  else {
                    this.http
                      .post(environment.HTTP + 'retourdetailspost/' + 0 , articlee)
                      // tslint:disable-next-line:no-shadowed-variable
                      .subscribe( data21 => {
                        console.log(data21);
                      });
                  }
                }
                alert('vous avez  lancer un retour avec succes');
                window.location.reload();

                //this.router.navigate(['/factures'], {relativeTo: this.route});
              }
            }, error => {
              alert(error.message );
              console.log(error.message);
            });
        }
        else { alert('erreur dans le stock'); }
      }, 1000
    );
  }
  getDistance(){
    this.http
      .get('http://maps.google.com/maps/api/directions/xml?language=fr&origin=10&destination=22&sensor=false')
      .subscribe(data => {
        // @ts-ignore
        console(data.route.leg.distance.value);
      }, error => {console.log(error.message); });
  }
}

