import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OptimisationService {
  n = 3; // nombre des clients à visiter par un tel commercial
  DL = 0.5; // durée de visite des clients
  L = ['commercial', 'client 1 ', 'client 3', 'client 5']; // : liste des clients à visites
  L2 = ['commercial', 'client 1 ', 'client 3', 'client 5'];
  M = ['commercial']; // solution du problème qui contient l’ordre des clients à visiter
  TV = [8];
  D = [ [0, 1.5, 2, 4],
    [1.5, 0, 3, 4],
    [2.0, 3, 0, 5],
    [4, 4, 5, 0],
  ]; // matrice des distances entre les clients + commercial
  D2 = [ [0, 1.5, 2, 4],
    [1.5, 0, 3, 4],
    [2.0, 3, 0, 5],
    [4, 4, 5, 0],
  ];
  P = [0, 1, 3, 2]; // liste des priorités des clients
  P2 = this.P;
  T = [0, 10, 13, 0]; // représente la liste de temps de chaque visite des clients
  T2 = this.T;
  t0: any = 8; // début de travail des commerciaux
  tf: any = 19; // heure de fin de travail des commerciaux
  liste: any;
  t = 0;
  // **********************************************************************************************************
  commerciaux: any = [];
  clients: any = [];
  zones: any = [];
  visites: any = [];
  constructor(private http: HttpClient) {
  }
  getIndiceClient(client2: any): any{
    let i = 0;
    for (const client of this.L2){
      if (client === client2){
        return i;
      }
      i += 1;
    }
  }
  codePrincipale(): any{
    let position = 0;
    let n = 0;
    const nbrDeClient = this.L.length;
    while (this.L.length > 0 && n < nbrDeClient - 1 && (this.t < this.tf )) {
      console.log(this.t);
      n += 1;
      const kl = this.minDistance(this.D, position);
      const k = kl[2];
      let clientAvisite  = k;
      const k1 = this.max(this.P, position);
      const k2 = this.min(this.T, position);
      // @ts-ignore
      if (this.P[k1] > this.P[k]) {
        clientAvisite = k1;
        // tslint:disable-next-line:no-shadowed-variable
        if (k2 !== 0.5) {
        // @ts-ignore
          if (this.T[k2] < this.t0 + this.DL + this.D[k1][k2]) {
            clientAvisite = k2;
            // @ts-ignore
            if (this.T[k2] >= this.t0 + this.DL + this.D[k][k2]) {
              clientAvisite = k;
            }
          }
      }
      }
      else {
        if (k2 !== 0.5) {

          clientAvisite = k2;
          // @ts-ignore
          if (this.T[k2] >= this.t0 + this.DL + this.D[k][k2]) {
            clientAvisite = k;
          }
        }
      }
      const t = this.t0 + this.D[position][clientAvisite];
      // @ts-ignore
      if (this.T[clientAvisite] !== 0){
        this.t0 = this.T[clientAvisite] + this.DL;
      }
      else {
        this.t0 = t + this.DL;
      }
      if ((this.t0) <= this.tf){
        // @ts-ignore
        this.TV.push(this.t0 - this.DL);
        // @ts-ignore
        this.M.push(this.L[clientAvisite]);
      }
      // this.T =

      // @ts-ignore
      this.D = this.supprimerdeD(this.D, position );
      // @ts-ignore
      this.L.splice(position, 1);
      // @ts-ignore
      this.T.splice(position , 1);

      // @ts-ignore
      this.P.splice(position, 1);
      if (clientAvisite < position){
        position = clientAvisite;

      }
      else {
        position = clientAvisite - 1;

      }
      this.t = t;
      //console.log(this.t);
    }
    this.liste = this.creerListe(this.M, this.TV);
    this.verificationDeSolution(this.M, this.TV);
  }
  verificationDeSolution(M: any, TV: any): any{
    let error = 0;
    let cl = 1;
    let Dist = 8;
    let position = 0;
    while (cl < 4 ){
      Dist += this.D2[this.getIndiceClient(M[position])][this.getIndiceClient(M[cl])] + 0.5;
      if (TV[cl] < Dist - 0.5) {
        error += 1;
        console.log(TV[cl], Dist - 0.5);
      }
      position = cl;
      cl += 1;
    }
    console.log(error, cl);
  }
  creerListe(L: any, TV: any): any{
    const liste = [];
    let j = 0;
    for (const i of L){
      liste.push({client: L[j], temps : TV[j]});
      j += 1;
    }
    return liste;
  }
  // tslint:disable-next-line:typedef
  positive(number1: number): any{
    if (number1 < 0) {
      return 0; }
    else {return number1; }
  }
  supprimerdeD(DD: any, k: number): any{
    const D1 = DD;
    D1.splice(k, 1);
    for (const i of D1) {
      let j = 0;
      while ( j < i.length){
        if (k === j){
          i.splice(j, 1);
          break;
        }
        j += 1;
      }
    }
    return D1;
  }
  min(liste: any[], position: number): number{
    let min = 100000000000000000000000000000000;
    let i = 0;
    for (const list of liste) {
      if (list <= min && list !== 0 && position !== i){
        min = i;
      }
      i += 1;
    }
    if ( min === 100000000000000000000000000000000){
      return 0.5;
    }
    return min;
  }
  max1(i: number, j: number): number {
    if (i > j){return i;}
    return j;
  }
  max(liste: any[], position: number): number{
    let max = 0;
    let i = 0;
    for (const list of liste) {
      if (list > max && i !== position){
        max = i;
      }
      i += 1;
    }
    return max;
  }
  minDistance(D: any, k: number): any{

    let d = 1000000000000000000000000000;
    let l = 0;
    let i = k;
    let j = l;
    for (const distance of D[k]){
      if (l !== k && distance <= d){
        d = distance;
        i = k;
        j = l;
      }
      l += 1;
    }
    return [d, i, j];
  }
  // -----------------------------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------------------------
  getCommericaux(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Commerciaux');
  }
  getZones(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'getzones');
  }
  getClients(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Clients');
  }
  getVisites(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Visites');
  }
  getNomClient(id: number): any{
    for (const client of this.clients){
      if (Number(client.idClient) === Number(id)){
        return client.nom_client;
      }
    }
    return ' haha';
  }

  enregistrerVisites(idCommercial1: any, date1: any, Clients: any[]): any{
    console.log(date1);
    for (const client of Clients){
      this.http
        .post(environment.HTTP + 'visiteses', {idCommercial: idCommercial1, date: date1, idClient: client.idClient})
        .subscribe(() => {
          alert('affectation reussite');
        }, error => {alert(error.message); });
    }
  }
}
