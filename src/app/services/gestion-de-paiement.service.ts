
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Form, NgForm} from '@angular/forms';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {formatDate} from "@angular/common";
import {DialogConsultationComponent} from "../Web/factures/dialog-consultation/dialog-consultation.component";
import {DialogConsultationPaiementComponent} from "../Web/paiement/dialog-consultation-paiement/dialog-consultation-paiement.component";
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
  Paiementcheque_consultee: any;
  Paiementespese_consultee: any;
  Paiementeffet_consultee: any;
  Paiementtpe_consultee: any;
  Paiementvirement_consultee: any;
  commerciaux: any;
  client: any;
  codeClient: any;
  nomClient: any;
  commercial: any;
  public constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
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
  getPaiementespece(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'paiementespece/' + id);
  } getPaiementcheque(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'paiementcheque/' + id);
  } getPaiementeffet(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'paiementeffet/' + id);
  } getPaiementtpe(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'paiementtpe/' + id);
  } getPaiementvirement(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'paiementvirement/' + id);
  }
  getFacturesClients(id: any): Observable<any>{
    return this.http
                .get(environment.HTTP + 'getFactureclient/' + id);
  }
  consulterPaiementWeb(idPaiement: any): Observable<any>{
    return this.http
      .get(environment.HTTP + 'consulterPaiementWeb/' + idPaiement);
  }
  consulterPaiement(idPaiement: any): any{
    this.getPaiementAndDetail(idPaiement)
      .subscribe(data => {
        this.paiement_consultee = data;
        this.getPaiementcheque(data.idPaiement)
          .subscribe(data3 => {
              this.Paiementcheque_consultee = data3;
              console.log(data3);
              this.getPaiementespece(data.idPaiement)
                .subscribe(data4 => {
                  this.Paiementespese_consultee = data4;
                  console.log(data4);

                  this.getPaiementeffet(data.idPaiement)
                    .subscribe(data5 => {
                      this.Paiementeffet_consultee = data5;
                      console.log(data5);
                      this.getPaiementtpe(data.idPaiement)
                        .subscribe(data6 => {
                          this.Paiementtpe_consultee = data6;
                          console.log(data6);
                          this.getPaiementvirement(data.idPaiement)
                            .subscribe(data7 => {
                              this.Paiementvirement_consultee = data7;
                             // this.dialog.open(DialogConsultationPaiementComponent, {data: {facture: facture, facture_details: facture_detail}, height: '900px',
                              //  width: '1700px'});
                            });
                        });
                    });
                });
          });


        // tslint:disable-next-line:max-line-length
      });
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

  getClientsOp(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Clients');
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
  rechercheClientPaiement(id: string): any{
    for (const client of this.clients){

      if (client.idClient === id){
        return client; }
    }
    return null;
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
  getPaiementCommercialDate(f: any): Observable<any>{
    if (f.value.date !== ''){
      return this.http
        .get(environment.HTTP + 'getPaiementsCommercialDate/' + f.value.idCommercial + '/' + formatDate(f.value.date, 'yyyy-MM-dd', 'en-US') );
      //.get(environment.HTTP + 'getFacturesCommercialDate/' + f.value.idCommercial + '/' + f.value.date );
    }
    else{
      return this.http
        .get(environment.HTTP + 'getPaiementsCommercial/' + f.value.idCommercial);
    }
  }
  getImage(id: number): Observable<any>{
    // Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get(environment.HTTP + 'imagePaiement/get/' + id);
  }
  getFacturesLies(numfacture: any): Observable<any> {
    return this.http
      .get(environment.HTTP + 'getFacturesLies/' + numfacture);
  }
}
