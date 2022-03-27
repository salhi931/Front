
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Form, NgForm} from '@angular/forms';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
//import {Web_user} from '../models/web_user';
@Injectable({
  providedIn: 'root'
})
export class GestionDePaiementService implements OnInit{
  public clients: any;
  paiementList: any = [];
  listcheques: any = [];
  listespeces: any = [];
  listeffets: any = [];
  listtpes: any = [];
  listvirements: any = [];
  totalDePaiement = 0;
  paiement_consultee: any;
  commerciaux: any;
  client: any;
  codeClient: any;
  nomClient: any;
  commercial: any;
  public constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:variable-name
  affecter(assigned: any){
    for (const assignd of assigned){
      console.log(assignd);
    }
  }
  getPaiment(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'Getpaiement');
  }
  getclientandcommercialofpaiement(idClient: number, idCommercial: number){
    for (const clientt of this.clients){
      if (clientt.idClient === idClient){
        this.nomClient = clientt.nom_client;
        this.codeClient = clientt.code;
        break;
      }
    }
    for (const commercial of this.commerciaux){
      if (commercial.id_commercial === idCommercial){
        this.commercial = commercial.nom;
        break;
      }
    }
  }
  getCommerciaux(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'Commerciaux');
  }

  getPaiementAndDetail(id: number): Observable<any>{
     return this.http
      .get(environment.HTTP + 'Getpaiement/' + id);
  }
  getFacturesClients(id: any): Observable<any>{
    return this.http
                .get(environment.HTTP + 'getFactureclient/' + id);
  }
  recherche_nom(code: string): any{
    for (const client of this.clients){

      if (client.code === code){
        return client.nom_client; }
    }
  }
  rechercherClient(code: any): any{
    for (const client of this.clients){
      if (client.code === String(code)){
        return client; }
    }
    return null;
  }

  getClients(): void {
    this.http
      .get(environment.HTTP + 'Clients')
      .subscribe(data => {
        this.clients = data;
      });
  }
  recherche_code(nom: string): any{
    for (const client of this.clients){

      if (client.nom_client === nom){
        return client.code; }
    }
  }
  supprimerpaiement(id: number): any{
    this.http
      .get(environment.HTTP + 'paiamentDelete/' + id)
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
  Ajoutercheque(f: NgForm): any{
    const variable = {idPaiement: undefined, numCheque: f.value.numCheque, dateCheque:  f.value.dateCheque,
      banque:  f.value.banque, porteurDuCheque:  f.value.porteurDuCheque , montantPaye:   f.value.montantPaye};
    this.listcheques.push(variable);
    console.log(this.listcheques);
  }
  AjouterEffet(f: NgForm): any{
    const variable = {idPaiement: undefined, numEffet: f.value.numEffet, dateCheque:  f.value.dateCheque,
      banque:  f.value.banque, porteurDuCheque:  f.value.porteurDuCheque , montantPaye:   f.value.montantPaye};
    this.listeffets.push(variable);
    console.log(this.listeffets);
  }
  AjouterEspece(f: NgForm): any{
    const variable = {idPaiement: undefined, montantPaye:   f.value.montantPaye};
    if (this.listespeces.length === 0) {
      this.listespeces.push(variable);
    }
    else {
      this.listespeces[0].montantPaye += f.value.montantPaye;
    }
    console.log(this.listespeces);
  }
  AjouterVirement(f: NgForm): any{
    const variable = {idPaiement: undefined,  numVirement: f.value.numVirement, dateDeVirement:  f.value.dateDeVirement, montantPaye:   f.value.montantPaye};
    this.listvirements.push(variable);
    console.log(this.listvirements);
  }
  AjouterTpe(f: NgForm): any{
    const variable = {idPaiement: undefined,  numCarte: f.value.numCarte, dateExpiration:  f.value.dateExpiration, montantPaye:   f.value.montantPaye};
    this.listtpes.push(variable);
    console.log(this.listtpes);
  }
  calculerTotal(): any{
    this.totalDePaiement = 0;
    for ( const espece of this.listespeces){
      this.totalDePaiement += espece.montantPaye;
    }
    for ( const cheque of this.listcheques){
      this.totalDePaiement += cheque.montantPaye;
    }
    for ( const effet of this.listeffets){
      this.totalDePaiement += effet.montantPaye;
    }
    for ( const tpe of this.listtpes){
      this.totalDePaiement += tpe.montantPaye;
    }
    for ( const virement of this.listvirements){
      this.totalDePaiement += virement.montantPaye;
    }
    console.log(this.totalDePaiement);
  }

  // tslint:disable-next-line:variable-name
  enregisterPaiement(client: any, totalPayee: any, factures: any, totalAPaye: number, id_commerciall: any, date_de_lancementt: any): any{
    let total = totalPayee;
    total = totalPayee + 0;
    this.http
      .post(environment.HTTP + 'PaiementPost', {idClient: client.idClient, totalPaye: totalPayee, id_commercial: id_commerciall, date_de_lancement: date_de_lancementt})
      .subscribe(data => {
        const idPaiementt = data;
        client.solde -= totalPayee;
        this.http
            .patch(environment.HTTP + 'clientses/' + client.idClient, client)
            .subscribe(dat => {console.log(dat); }, error => {console.log('error lors de l\'update du solde du client'); });

        for (const facture of factures){
          if (facture.status){
            if (total >= (facture.total_TTC - facture.montantPaye)){
              const diff  = (facture.total_TTC - facture.montantPaye);
              facture.montantPaye += diff;
              total = total - diff;
              this.http
                .patch(environment.HTTP + 'factures/' + facture.idFacture, facture)
                .subscribe(() => {
                  // tslint:disable-next-line:max-line-length
                  this.http.post(environment.HTTP + 'paiementFactures', {idPaiement: idPaiementt, idFacture: facture.idFacture, montant: diff })
                    .subscribe(() => {}, error => {console.log(error.message); });
                }, error => {console.log('error'); });
             }
            else {
              facture.montantPaye += total;
              const total2 = total;
              this.http
                .patch(environment.HTTP + 'factures/' + facture.idFacture, facture)
                .subscribe(() => {
                  // tslint:disable-next-line:max-line-length
                  this.http.post(environment.HTTP + 'paiementFactures', {idPaiement: idPaiementt, idFacture: facture.idFacture, montant: total2 })
                    .subscribe(() => {}, error => {console.log(error.message);});
                }, error => {console.log('error'); });
              total = 0;
              break;
            }
          }
        }
        for ( const paiementespece of this.listespeces){
          paiementespece.idPaiement = idPaiementt;
          this.http
            .post(environment.HTTP + 'paiementespeces', paiementespece)
            .subscribe(() => {}, error => {console.log('error de l\'insertion du paiement:' + paiementespece); });
        }
        for ( const paiementcheque of this.listcheques){
          paiementcheque.idPaiement = idPaiementt;
          this.http
            .post(environment.HTTP + 'paiementcheques', paiementcheque)
            .subscribe(() => {}, error => {console.log('error de l\'insertion du paiement:' + paiementcheque); });
        }
        for ( const paiementeffet of this.listeffets){
          paiementeffet.idPaiement = idPaiementt;
          this.http
            .post(environment.HTTP + 'paiementeffets', paiementeffet)
            .subscribe(() => {}, error => {console.log('error de l\'insertion du paiement:' + paiementeffet); });
        }
        for ( const paiementvirement of this.listvirements){
          paiementvirement.idPaiement = idPaiementt;
          this.http
            .post(environment.HTTP + 'paiementvirements', paiementvirement)
            .subscribe(() => {}, error => {console.log('error de l\'insertion du paiement:' + paiementvirement); });
        }
        for ( const paiementtpe of this.listtpes){
          paiementtpe.idPaiement = idPaiementt;
          console.log('haha' + paiementtpe);
          this.http
            .post(environment.HTTP + 'paiementtpes', paiementtpe)
            .subscribe(() => {}, error => {console.log('error de l\'insertion du paiement:' + paiementtpe); });
        }
      });

  }
}
