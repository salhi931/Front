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

export class GestionDesFacturesService implements OnInit{
  // tslint:disable-next-line:variable-name max-line-length
  constructor(private _snackBar: MatSnackBar, private http: HttpClient, public gestionDesArticlesService: GestionDesArticlesService, private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) {
  }
  factures: any;
  clients: any = [];
  articles: any[] = [];
  commerciaux: any = [];
  articlesfacturees: any = [];
  TablePrix: any = [];
  magasins: any = [];
  idFacture: any;
  facturedetail: any = [];
  commandeselectionnee: any;
  magasinsList: any = [];

  var: any;
  facture_consultee: any;
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.articles = data;
      });

  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  getClients(): void {
    this.http
      .get(environment.HTTP + 'Clients')
      .subscribe(data => {
        console.log(data);
        this.clients = data;
      }, error => {alert(error.message);});
  }
  getClients2(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Clients');
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
  nom_client_facture: any = '';
  code_client_facture: any = 0;
  facture_details : any;
  getFactureConsultee(id: number): any{
    this.http
      .get(environment.HTTP + 'getFacture/' + id)
      .subscribe(data => {
        this.facture_consultee = data;
        this.http
          .get(environment.HTTP + 'facturedetail/' + id)
          .subscribe(data1 => {
            // @ts-ignore
            this.facture_details = data1;
            console.log(this.facture_details);
            for (const client of this.clients){

              if (client.idClient === this.facture_consultee.id_client){
                this.code_client_facture =  client.code;
                this.nom_client_facture =  client.nom_client; }
            }
            for (const commercial of this.commerciaux){
              if (commercial.id_commercial === this.facture_consultee.id_commercial){
                console.log(commercial.nomUtilisateur);
                this.nom_commercial_facture = commercial.nomUtilisateur;
                this.router.navigate(['/consultation-facture', {relativeTo: this.route}]);
              }
            }
          });



      }, error => {alert('une error s\'est produite'); });
  }

  gettableArticle(id: number): void{
    this.http
      .get(environment.HTTP + 'Prixtable/' + id)
      .subscribe(data => {
        this.TablePrix = data;
        console.log(this.TablePrix);
      }, error => {alert('un erreur s\'est produite'); });
  }
  getFactures(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'facture');
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
    console.log(this.clients);
    for ( const client of this.clients){
      if (client.idClient === id){
        return client.list_prix;
      }
    }
  }
  getNomCommercial(): any{

        for (const commercial of this.commerciaux){
          if (commercial.id_commercial === this.facture_consultee.id_commercial){
            console.log(commercial.nomUtilisateur);

            return commercial.nomUtilisateur;
          }
        }
        return '';

  }
  // @ts-ignore
  getcommandeanddetailcommane(id: any): Observable<any>{
    this.articlesfacturees = [];
    this.http
      .get(environment.HTTP + 'commande1/' + id)
      .subscribe(data => {
        this.commandeselectionnee = data;
        console.log(data);
        // console.log(this.commandeselectionnee);
        // @ts-ignore
        this.gettableArticle(this.getTablearticle(data.id_client));
        console.log(this.TablePrix);
        this.http
          .get(environment.HTTP + 'commandedetail/' + id)
          .subscribe(data1 => {
            // @ts-ignore
            for (const article of data1){
              if (article.openquantite > 0){
                article.quantite = article.openquantite;
                this.articlesfacturees.push(article);
              }
            }
            console.log(this.articlesfacturees);
            return 1;
          });
      }, error => {alert('une error s\'est produite'); });

  }

  getdesignationarticle(code: string){
    for (const article of this.articles){
      if (article.code_article === code){
        return article.nom_article;
      }
    }
    return ('');
  }
  getidarticle(code: string){
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
  getTVAarticle(code: string){
    for (const article of this.articles){
      console.log(article.TVA);
      if (article.code_article === code){
        return article.tva;
      }
    }
    return Number(0);
  }
  supprimer(id: number): void{
    // tslint:disable-next-line:ban-types
    this.facturedetail = [];
    this.http.get(environment.HTTP + 'facturedetailss/' + id)
      .subscribe(data3 => {
        this.facturedetail = data3;
        console.log(this.facturedetail);
        this.http
          .delete(environment.HTTP + 'factures/' + id)
          .subscribe(data => {
            for (const detail of this.facturedetail){
              this.http
                .delete(environment.HTTP + 'facturedetails/' + detail)
                .subscribe(() => {
                  console.log('delete' + detail);
                });
            }
            alert('suppression reussite');
            window.location.reload();
          }, error => {alert('une error s\'est produite'); }); });
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
    if (this.configurationService.repture_stock){
      // tslint:disable-next-line:max-line-length
      this.articlesfacturees.push({idFacture: undefined, code_article: article_selected, quantite: article_quantite, prix: article_prix, magasin: magasin_selected , description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total, total_ligne_HT	: hc, id_article: id_articlee, id_magasin: id_magasinn});
      //console.log(this.articlesfacturees);
      f.reset();
      }
    else {
      let quantite3 = article_quantite;
      for ( const article of this.articlesfacturees){
        // tslint:disable-next-line:max-line-length
        if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
          quantite3 += article.quantite;
          //console.log('' + quantite3);
        }
      }
      this.http
        .get(environment.HTTP + 'verifierStock/' + id_articlee + '/' + id_magasinn + '/' + quantite3)
        .subscribe(data => {
          if (data !== 0.198){
            if (data >= 0){
              if (boolean){
              this.http
                // tslint:disable-next-line:max-line-length
                .get(environment.HTTP + 'verifierarticle/' + this.commandeselectionnee.id_commande + '/' + id_articlee + '/' + id_magasinn + '/' + remise_ + '/' + article_prix + '/' + quantite3)
                .subscribe(dataz => {
                  if (dataz === 3){
                    let i = 0;
                    for (const article of this.articlesfacturees){
                      // tslint:disable-next-line:max-line-length
                      if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
                        article.quantite += article_quantite;
                        article.total_ligne_TTC += total;
                        article.total_ligne_HT += hc;
                        i += 1;
                       }
                    }
                    if (i === 0) {
                      this.articlesfacturees.push({idFacture: undefined, code_article: article_selected,
                        quantite: article_quantite, prix: article_prix, magasin: magasin_selected ,
                        description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total,
                        total_ligne_HT	: hc, id_article: id_articlee, id_magasin: id_magasinn});
                      this.openSnackBar('quantite disponible', '');
                      f.reset();
                      console.log(this.articlesfacturees);
                    }
                  }
                  if (dataz === 2){
                    alert('vous voulez facturer plus que l\'open quantite');
                  }
                  if (dataz === null){
                    alert('error');
                  }
                  if (dataz === 1){
                        let i = 0;
                        for (const article of this.articlesfacturees){
                          // tslint:disable-next-line:max-line-length
                          if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
                            article.quantite += article_quantite;
                            article.total_ligne_TTC += total;
                            article.total_ligne_HT += hc;
                            i += 1;
                          }
                        }

                        if (i === 0){
                          // tslint:disable-next-line:max-line-length
                          this.articlesfacturees.push({idFacture: undefined, code_article: article_selected, quantite: article_quantite, prix: article_prix, magasin: magasin_selected , description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total, total_ligne_HT	: hc, id_article: id_articlee, id_magasin: id_magasinn});
                          this.openSnackBar('quantite disponible', '');
                          f.reset();
                          //console.log(this.articlesfacturees);
                          }
                  }
                }, error => {
                  alert(error.message);
                });
            }
              else {
                let k = 0;
                for (const article of this.articlesfacturees){
                  // tslint:disable-next-line:max-line-length
                  if (article.id_article === id_articlee && article.prix === article_prix && article.id_magasin === id_magasinn && article.remise === remise_ && article.tva === TVA_){
                    article.quantite += article_quantite;
                    article.total_ligne_TTC += total;
                    article.total_ligne_HT += hc;
                    k += 1;
                  }
                }
                if (k === 0) {
                  this.articlesfacturees.push({idFacture: undefined, code_article: article_selected,
                    quantite: article_quantite, prix: article_prix, magasin: magasin_selected ,
                    description: designation, remise: remise_, tva: TVA_, total_ligne_TTC: total,
                    total_ligne_HT	: hc, id_article: id_articlee, id_magasin: id_magasinn});
                  this.openSnackBar('quantite disponible', '');
                  f.reset();
                  console.log(this.articlesfacturees);
                }
              }
            }
            else { alert('la quantité en stock  : ' + (data + quantite3) + 'unité'); }
          }
          else {
            this.openSnackBar('ce stock n\'existe pas', 'OK');
             }
      });
    }
  }
  rechercherCommercial(id: number): any{
    for (const commercial of this.commerciaux){

      if (commercial.id_commercial === Number(id)){
        return commercial.nom; }
    }
  }
  // @ts-ignore
    avantEnregistrer(): any{
    //this.getClients();
    // @ts-ignore
    let b = 0;
    this.var = 0;
    for (const article of this.articlesfacturees){
      let quantite = 0;
      for (const article2 of this.articlesfacturees){
        if (article.id_article === article2.id_article){
          quantite += article2.quantite;
        }
      }
      if (this.commandeselectionnee){
        // tslint:disable-next-line:max-line-length
        this.verification_open_quantite(this.commandeselectionnee.id_commande, article.id_article, article.id_magasin, article.remise, article.prix, article.quantite).then((dataz => {
          if (dataz === 2){
            b = 1;
            this.var = 1;
          }
        }));
      }
      this.verificationstock(article.id_article, article.id_magasin, quantite ).then((data => {
        if (data !== 0.198) {
          if (data < 0) {
            console.log(data);
            b = 1;
            this.var = 1;
          }
        } else {
          console.log('test 2', b);
          this.var = 1;
          b = 1;
          this.openSnackBar('ce stock n\'existe pas', 'OK');
        }
      }));
    }
     setTimeout(
      () => {
        return b; }, 10 );
  }
  // tslint:disable-next-line:variable-name
  public verificationstock( id_articlee: any, id_magasine: any, quantitee: any): Promise<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get(environment.HTTP + 'verifierStock/'  + id_articlee + '/' + id_magasine + '/' + quantitee).toPromise();
  }
  // tslint:disable-next-line:variable-name
  public verification_open_quantite(id_commande: any, id_articlee: any, id_magasine: any, remise: any, prix: any, quantitee: any): Promise<any>{
    // tslint:disable-next-line:max-line-length
    return this.http.get(environment.HTTP + 'verifierarticle/' + id_commande + '/' + id_articlee + '/' + id_magasine + '/' + remise + '/' + prix + '/' + quantitee).toPromise();
  }

  getMagasinsList(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'magasin');
  }
  enregistrerFacture(facture: any): void{
    this.getClients();
    const a = this.avantEnregistrer();
    console.log(a);
    console.log(this.var);
    setTimeout(
      () => {
        // @ts-ignore
        console.log(facture.id_client);
        console.log(this.clients);
        let clients1: any;
        for (const client of this.clients){
          if (Number(client.idClient)  === Number(facture.id_client)){
            clients1 =  client;
            console.log(clients1); }
        }
        console.log(this.var);
        if (0 === this.var){
          if (clients1.plafond > (clients1.solde + facture.total_TTC)){
          this.http
            .post(environment.HTTP + 'facturepost', facture)
            .subscribe( dataa => {
              this.idFacture = dataa;
              console.log(this.idFacture);
              if (this.idFacture){
                for ( const articlee of this.articlesfacturees){
                  articlee.idFacture = this.idFacture;
                }
                for ( const articlee of this.articlesfacturees){
                  if ( this.commandeselectionnee){
                    this.http
                      .post(environment.HTTP + 'facturedetailspost/' + this.commandeselectionnee.id_commande , articlee)
                      // tslint:disable-next-line:no-shadowed-variable
                      .subscribe( data21 => {
                        console.log(data21);
                      });
                  }
                  else {
                    this.http
                      .post(environment.HTTP + 'facturedetailspost/' + 0 , articlee)
                      // tslint:disable-next-line:no-shadowed-variable
                      .subscribe( data21 => {
                        console.log(data21);
                      });
                  }
                }
                alert('vous avez  lancer une facture avec succes');
                window.location.reload();

                //this.router.navigate(['/factures'], {relativeTo: this.route});
              }
            }, error => {
              alert(error.message );
              console.log(error.message);
            });
        }
          else {alert('ce client atteint le plafond:' + clients1.plafond); }
        }
        else { alert('erreur dans le stock'); }
      }, 1000
    );
  }
}
