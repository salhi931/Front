import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GestionClientsService} from './gestionClients.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService implements OnInit {
  reponse: any;
  zones: any;
  commerciaux: any;
  familles: any;
  reportingCommande: any;
  reportingFacture: any = [];
  reportingRetours: any = [];

  // tslint:disable-next-line:variable-name
  constructor(private http: HttpClient, public client: GestionClientsService) {
  }
  getzones(): any{
     this.http
      .get(environment.HTTP + '/getzones').subscribe(data => {this.zones = data; }, error => {alert(error.message); });
  }
  getCommerciaux(): any{
     this.http
      .get(environment.HTTP + '/Commerciaux').subscribe(data => {this.commerciaux = data; }, error => {alert(error.message); });
  }
  getFamille(): any{
     this.http
      .get(environment.HTTP + '/getFamille').subscribe(data => {this.familles = data; }, error => {alert(error.message); });
  }
  getreportingCommande(): any{
     this.http
       // tslint:disable-next-line:max-line-length
      .get(environment.HTTP + '/reporting/commande').subscribe(data => {this.reportingCommande = data; }, error => {alert(error.message); });
  }
  getreportingFacture(dateDebut: any, dateFin: any): Observable<any>{
     return this.http
      .get(environment.HTTP + 'reporting/factures/' + dateDebut + '/' + dateFin);
  }
  getreportingRetours(dateDebut: any, dateFin: any): Observable<any>{
     return this.http
      .get(environment.HTTP  + 'reporting/retours/' + dateDebut + '/' + dateFin);
  }
  tri(list1: any, list2: any, nbr: number): any{
    // console.log(nbr);
    const List = [];
    const List1 = list1;
    const List2 = list2;
     // return max;
    let AutreQuantite = 0;
    const Autredescription = 'Autres';
    while ( List1.length > nbr && List2.length > nbr){
      let min = List1[0];
      //  console.log(min);
      let j = 0;
      let k = 0;
      for (const article of List1){
        if (Number(article) < Number(min)){
          j = k;
          min = article;
          // console.log(min);

        }
        k += 1;
      }
      // console.log(j);
      AutreQuantite += List1[j];
      List1.splice(j, 1);
      List2.splice(j, 1);
      // console.log(List1);
     }
    if (List1.length > 0 && AutreQuantite > 0){
       List1.push(AutreQuantite);
       List2.push(Autredescription);
    }
    List.push(List1);
    List.push(List2);
    return List;
  }
  nettoyerListZone(listtime: any, listchiffre: any): any{
    let count1 = 0;
    while (count1 < listtime.length){
      let count2 = count1 + 1;
      while (count2 < listtime.length){
        if (listtime[count1] === listtime[count2]  ){
          // const j = listtime.indexOf(time2);
          listchiffre[count1] += listchiffre[count2];
          listchiffre.splice(count2, 1);
          listtime.splice(count2, 1);

          count2 -= 1;
        }
        count2 += 1;
      }
      count1 += 1;
    }
    console.log(listtime);
  }
  triListZone(listtime: any, listchiffre: any): any{
    let changed;
    do{
      changed = false;
      for (let i = 0; i < listtime.length - 1; i++) {
        if (listtime[i] > listtime[i + 1]) {
          const tmp = listtime[i];
          listtime[i] = listtime[i + 1];
          listtime[i + 1] = tmp;
          const tmp2 = listchiffre[i];
          listchiffre[i] = listchiffre[i + 1];
          listchiffre[i + 1] = tmp2;
          changed = true;
        }
      }
    } while (changed);
  }
  triListCommerciaux(datas: any, labels: any): any{
    let changed;
    const data = datas;
    const label = labels;
    if (data.length > 2){
        do{
          changed = false;
          for (let i = 0; i < data.length - 1; i++) {
            if (data[i] <= data[i + 1]) {
              const tmp = data[i];
              data[i] = data[i + 1];
              data[i + 1] = tmp;
              const tmp2 = label[i];
              label[i] = label[i + 1];
              label[i + 1] = tmp2;
              changed = true;
            }
          }
        } while (changed);
    }
    return [data, labels];
  }
  fusion(L1: any, L2: any, L12: any, L22: any): any{
    const n1 = L1.length;
    const n2 = L2.length;
    // tslint:disable-next-line:prefer-const
    const L = [];
    let LFacture = [];
    let LRetour = [];
    let i1 = 0;
    let i2 = 0;
    let i = 0;
    while ( i1 < n1 && i2 < n2){
      if (L1[i1] < L2[i2]){
        L.push(L1[i1]);
        LFacture.push(L12[i1]);
        LRetour.push(null);
        i1 += 1;
      }
      else{
        if (L1[i1] > L2[i2]){
          L.push(L2[i2]);
          LRetour.push(L22[i2]);
          LFacture.push(null);
          i2 += 1; }
        else {
          L.push(L2[i2]);
          LRetour.push(L22[i2]);
          LFacture.push(L12[i1]);
          i2 += 1;
          i1 += 1;
        }
      }
     }
    while (i1 < n1){
      L.push(L1[i1]);
      LFacture.push(L12[i1]);
      LRetour.push(null);
      i1 += 1;
      i += 1;
    }
    while (i2 < n2){
        L.push(L2[i2]);
        LRetour.push(L22[i2]);
        LFacture.push(null);
        i2 += 1;
        i += 1;
    }
    console.log(L);
    console.log(LFacture);
    LFacture = this.remplacerNull(LFacture);
    // LFacture = this.prediction((LFacture));
    console.log(LFacture);
    console.log(LRetour);
    LRetour = this.remplacerNull(LRetour);
    // LRetour = this.prediction((LRetour));
    console.log(LRetour);
    return [L, LFacture, LRetour];
  }
  profit(list1: any, list2: any): any{
    const list3 = [];
    const n = list1.length;
    for (let i = 0; i < n; i++){
      list3.push(list1[i] - list2[i]);
    }
    return list3;
  }
  remplacerNull(L: any): any{
    const n = L.length;
    for (let i = 0; i < n; i++){
      if (L[i] === null || L[i] === undefined){ L[i] = 0; }
    }
    return L;
  }
  prediction(L: any): any{
    const n = L.length;
    let i = 0;
    while (i < n){
      if (L[i] === null && i > 0 && i < n){
        if (L[i - 1] !== null){
          let j = i + 1;
          let k = 1;
          while (j < n && L[j] === null){
            k += 1;
            j += 1;
          }
          if (L[j] !== null && j < n){
            const m = (-L[i - 1] + L[j]) / (k + 1);
            for (let ij = i ; ij < j; ij++){
              L[ij] = L[ij - 1] + m;
             }
          }
        }
      }
      i += 1;

    }
    return L;
  }
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
  }
}
