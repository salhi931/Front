import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OptimisationService {
  // @ts-ignore
  selectedFileListConsulte: any[];
  liste: any;
  t = 0;
  // **********************************************************************************************************
  commerciaux: any = [];
  prefecture: any = [];
  villes: any = [];
  clients: any = [];
  zones: any = [];
  categories: any = [];
  visites: any = [];
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
  }
  getIndiceClient(client2: any, ListPosition2: any): any{
    let i = 0;
    for (const client of ListPosition2){
      if (client === client2){
        return i;
      }
      i += 1;
    }
  }
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  codePrincipale(duree_de_visite: any = 0.5, Heure_de_debut: any = 8, Heure_de_fin: any = 18, MatriceDistance: any, listPropriete: any, ListPosition: any, Heure_de_visite: any, SolutionPosition: any, SolutionHeure: any): any{
    const MatriceDistance2 = MatriceDistance;
    const listPropriete2 = listPropriete;
    const ListPosition2 = ListPosition;
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    const Heure_de_visite2 = Heure_de_visite;

    let position = 0;
    let n = 0;
    const nbrDeClient = ListPosition.length;
    while (ListPosition.length > 0 && n < nbrDeClient - 1 && (this.t < Heure_de_fin )) {
      console.log(this.t);
      n += 1;
      const kl = this.minDistance(MatriceDistance, position);
      const k = kl[2];
      let clientAvisite  = k;
      const k1 = this.max(listPropriete, position);
      const k2 = this.min(Heure_de_visite, position);
      // @ts-ignore
      if (listPropriete[k1] > listPropriete[k]) {
        clientAvisite = k1;
        // tslint:disable-next-line:no-shadowed-variable
        if (k2 !== 0.5) {
          // @ts-ignore
          if (Heure_de_visite[k2] < Heure_de_debut + duree_de_visite + MatriceDistance[k1][k2]) {
            clientAvisite = k2;
            // @ts-ignore
            if (Heure_de_visite[k2] >= Heure_de_debut + duree_de_visite + MatriceDistance[k][k2]) {
              clientAvisite = k;
            }
          }
        }
      }
      else {
        if (k2 !== 0.5) {

          clientAvisite = k2;
          // @ts-ignore
          if (Heure_de_visite[k2] >= Heure_de_debut + duree_de_visite + MatriceDistance[k][k2]) {
            clientAvisite = k;
          }
        }
      }
      const t = Heure_de_debut + MatriceDistance[position][clientAvisite];
      // @ts-ignore
      if (Heure_de_visite[clientAvisite] !== 0){
        Heure_de_debut = Heure_de_visite[clientAvisite] + duree_de_visite;
      }
      else {
        Heure_de_debut = t + duree_de_visite;
      }
      if ((Heure_de_debut) <= Heure_de_fin){
        // @ts-ignore
        SolutionHeure.push(Heure_de_debut - duree_de_visite);
        // @ts-ignore
        SolutionPosition.push(ListPosition[clientAvisite]);
      }
      // this.T =

      // @ts-ignore
      MatriceDistance = this.supprimerdeD(MatriceDistance, position );
      // @ts-ignore
      ListPosition.splice(position, 1);
      // @ts-ignore
      Heure_de_visite.splice(position , 1);

      // @ts-ignore
      listPropriete.splice(position, 1);
      if (clientAvisite < position){
        position = clientAvisite;

      }
      else {
        position = clientAvisite - 1;

      }
      this.t = t;
      //console.log(this.t);
    }
    this.liste = this.creerListe(SolutionPosition, SolutionHeure);
    return this.liste;
    //  this.verificationDeSolution(SolutionPosition, SolutionHeure, this.MatriceDistance2, ListPosition2);
  }
  verificationDeSolution(SolutionPosition: any, SolutionHeure: any, MatriceDistance2: any, ListPosition2: any): any{
    let error = 0;
    let cl = 1;
    let Dist = 8;
    let position = 0;
    while (cl < 4 ){
      Dist += MatriceDistance2[this.getIndiceClient(SolutionPosition[position], ListPosition2)][this.getIndiceClient(SolutionPosition[cl], ListPosition2)] + 0.5;
      if (SolutionHeure[cl] < Dist - 0.5) {
        error += 1;
        console.log(SolutionHeure[cl], Dist - 0.5);
      }
      position = cl;
      cl += 1;
    }
    console.log(error, cl);
  }
  creerListe(ListPosition: any, SolutionHeure: any): any{
    const liste = [];
    let j = 0;
    for (const i of ListPosition){
      liste.push({client: ListPosition[j], temps : SolutionHeure[j]});
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
    const MatriceDistance1 = DD;
    MatriceDistance1.splice(k, 1);
    for (const i of MatriceDistance1) {
      let j = 0;
      while ( j < i.length){
        if (k === j){
          i.splice(j, 1);
          break;
        }
        j += 1;
      }
    }
    return MatriceDistance1;
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
    if (i > j){return i; }
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
  minDistance(MatriceDistance: any, k: number): any{

    let d = 1000000000000000000000000000;
    let l = 0;
    let i = k;
    let j = l;
    for (const distance of MatriceDistance[k]){
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
  getPrefecture(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'getPrefecture');
  }
  getVIlle(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'getVilles');
  }
  getCommericaux(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Commerciaux');
  }
  getZones(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'getzones');
  }
  getCategories(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'getClientsCategories');
  }
  getClientsOp(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'ClientsOptimisation');
  }
  getClients(): Observable<any>{
    return this.http.
    get(environment.HTTP + 'Clients');
  }
  getClientVillePrefectZonesListv2(Ville: any, Prefect: any, Zones: any, Categories: any): Observable<any> | null{
    if (Ville !== null && Ville !== undefined ){
                if ( Ville.length > 0 && (Prefect === null || Prefect.length === 0)){
                  return this.ClientsByVilleList(Ville, Categories);
                }
                else{
                  if (Prefect.length > 0 && Zones === null){
                   return  this.ClientsByVilleAndPrefectureList(Ville, Prefect, Categories);
                  }
                  else {
                    if ( Prefect.length > 0  && Zones.length > 0){
                      return this.ClientsByVilleAndPrefectureAndZoneList(Ville, Prefect, Zones, Categories);
                    }
                    else {
                      return null;
                    }
                  }
                }
    }
    else {return null; }
  }
  ClientsByVilleAndPrefectureAndZone(Ville: any, Prefecture: any, zones: any, Categories: any): Observable<any>{
    if (Categories !== null && Categories.length > 0){
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureAndZoneAndCategories/' + Ville + '/' + Prefecture + '/' + zones + '/' + Categories);
    }
    else{
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureAndZone/' + Ville + '/' + Prefecture + '/' + zones);
     }
    }
  ClientsByVilleAndPrefectureAndZoneList(Ville: any, Prefecture: any, zones: any, Categories: any): Observable<any>{
    if (Categories !== null && Categories.length > 0){
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureAndZoneAndCategoriesList/' + Ville + '/' + Prefecture + '/' + zones + '/' + Categories);
    }
    else{
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureAndZoneList/' + Ville + '/' + Prefecture + '/' + zones);
     }
    }
  ClientsByVille(Ville: any, Categories: any): Observable<any>{
    if (Categories !== null && Categories.length > 0){
      return this.http.get(environment.HTTP + 'ClientsByVilleAndCategories/' + Ville + '/' + Categories);
    }
    else{
      return this.http.get(environment.HTTP + 'ClientsByVille/' + Ville);
    }

  }
  ClientsByVilleList(Ville: any, Categories: any): Observable<any>{
    if (Categories !== null && Categories.length > 0){
      return this.http.get(environment.HTTP + 'ClientsByVilleAndCategoriesList/' + Ville + '/' + Categories);
    }
    else{
      return this.http.get(environment.HTTP + 'ClientsByVilleList/' + Ville);
    }

  }
  ClientsByVilleAndPrefecture(Ville: any, Prefecture: any, Categories: any): Observable<any>{
    if (Categories !== null && Categories.length > 0){
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureAndCategories/' + Ville + '/' + Prefecture + '/' + Categories);
    }
    else{
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefecture/' + Ville + '/' + Prefecture);    }

  }
  ClientsByVilleAndPrefectureList(Ville: any, Prefecture: any, Categories: any): Observable<any>{
    if (Categories !== null && Categories.length > 0){
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureAndCategoriesList/' + Ville + '/' + Prefecture + '/' + Categories);
    }
    else{
      return this.http.get(environment.HTTP + 'ClientsByVilleAndPrefectureList/' + Ville + '/' + Prefecture);    }

  }
  getClientsByZones(zones: any[] , categories: any[]): Observable<any> | null{
    if ((zones === null ) && (categories === null )){return null; }
    else {
      if (zones !== null  && categories !== null ){
        if (zones.length > 0 && categories.length  > 0 ){
          return this.http.
          get(environment.HTTP + 'ClientsByZonesCategories/' + zones + '/' + categories);
        }
        else{
          if (zones.length > 0  ){return this.http.get(environment.HTTP + 'ClientsByCategories/' + zones );
          }
          else{
            if (categories.length > 0  ) {
              alert('Merci de selectionner une zone');
              return null; }
              // return this.http.get(environment.HTTP + 'ClientsByCategories/' + categories); }
            else {return null; }
          }
        }
      }
      else {
        // @ts-ignore
        if (zones !== null ){
          if (zones.length > 0){
            return this.http.
            get(environment.HTTP + 'ClientsByZones/' + zones );
          }
          else{return null; }
        }
        else {
          if (categories.length > 0) {
            alert('Merci de selectionner une zone');
            return null; }
            //return this.http.get(environment.HTTP + 'ClientsByCategories/' + categories);}
          else {return  null; }
          }
        }
      }
    }
  getVisites(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Visitess');
  }
  getVisite(id: any): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Visite/' + id);
  }
  getNomClient(id: number): any{
    for (const client of this.clients){
      if (Number(client.idClient) === Number(id)){
        return client.nom_client;
      }
    }
    return '';
  }
  getNomCommercial(id: number): any{
    for (const commercial of this.commerciaux){
      if (Number(commercial.id_commercial) === Number(id)){
        return commercial.nom;
      }
    }
    return '';
  }
  getZone(id: number): any{
    for (const client of this.clients){
      if (Number(client.idClient) === Number(id)){
        return client.zone;
      }
    }
    return '';
  }

  enregistrerVisites(idCommercial1: any, date1: any, Clients: any[]): any{
    console.log(date1);
    const Visites = [];
    for (const client of Clients){
      if (client.statuss) {
      // tslint:disable-next-line:max-line-length
       Visites.push({idCommercial: idCommercial1, date: date1, idClient: client.idClient, orderDevisite: client.ordre, heureDeVisite : client.heure, status: 0, motif: '' });

      }
    }
    this.http
      .post(environment.HTTP + 'visitesPost', Visites)
      .subscribe(data => {
        if (data === 0) {
          alert('affectation reussite');
          location.reload();
          // this.router.navigate(['/optimisation'], {relativeTo: this.activatedRoute});
        }
        else {
          alert('il y a des visites répétés ' + data);
        }
      }, error => {alert(error.message); });
  }
  getPositionCommercial(id: number): any{
    for (const commercial of this.commerciaux){
      if (Number(commercial.id_commercial) === Number(id)){
        return {lat: commercial.latcurrent, lng: commercial.lngcurrent};
      }
    }
    return ;
  }
  // tslint:disable-next-line:variable-name
  calcule_distance(old_lat: any, old_lon: any, new_lat: any, new_lon: any): any {
    let dist = 0;
    // convertion des valeures du degree vers le radian
    const latRad = old_lat * 0.017453293;
    const lonRad = old_lon * 0.017453293;
    const tlatRad = new_lat * 0.017453293;
    const tlonRad = new_lon * 0.017453293;
    // Calcule de la distance en Km
    const latSin = Math.sin((latRad - tlatRad) / 2);
    const lonSin = Math.sin((lonRad - tlonRad) / 2);

    dist = 2 * Math.asin(Math.sqrt((latSin * latSin) + Math.cos(latRad) * Math.cos(tlatRad) * (lonSin * lonSin)));

    dist = dist * 6371; // pour la distance en Km il faut multiplier la valeure trouvée par le rayon de la terre

    return dist;

  }
  trajetMinimale(distance: any , sommets: any ): any{
    //  let distance = distance1;
    // const sommets = sommets1;
    const solution = [sommets[0]];
    // const solutionDistance = [0];
    let i = 0;
    console.log(sommets);
    while (distance.length > 1){
      sommets.splice(i, 1);
// @ts-ignore
      const listDist = distance[i];
      console.log(solution);
      listDist.splice(i, 1);
      console.log(listDist);

      const j = this.minsDistance(listDist);
      solution.push(sommets[j]);
      distance = this.eliminerMatrice(distance, i);
      // alert(distance);
      if (j >= i){ i = j; }
      else {i = j ; }
    }
    console.log(solution);
    return solution;
  }
  minsDistance(list: any): any{
    let min = list[0];
    let index = 0;
    let i = 0;
    for (const listt of list){
      if (listt < min){
        min = listt;
        index = i;
      }
      i += 1;
    }
    return index;
  }
  eliminerMatrice(list: any, i: number): any{
    list.splice(i, 1);
    for ( const elmt of list){
      elmt.splice(i, 1);
    }
    return list;
  }
  matriceDistance(List: any, vitesse: any): any{
    const MatriceDistance = [];
    for (const i of List){
      const d = [];
      for (const j of List){
        const distance = this.calcule_distance(i.lat, i.lng, j.lat, j.lng);
        d.push(distance / vitesse);
      }
      MatriceDistance.push(d);
    }
    return MatriceDistance;
  }
  getImage(id: number): Observable<any>{
    // Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get(environment.HTTP + 'imageVisites/get/' + id);
  }
  getVisitesCommercialDate(f: any): Observable<any>{
    if (f.value.date !== ''){
      return this.http
        .get(environment.HTTP + 'getVisitesCommercialDate/' + f.value.idCommercial + '/' + formatDate(f.value.date, 'yyyy-MM-dd', 'en-US') );
      //.get(environment.HTTP + 'getFacturesCommercialDate/' + f.value.idCommercial + '/' + f.value.date );
    }
    else{
      return this.http
        .get(environment.HTTP + 'getVisitesCommercial/' + f.value.idCommercial);
    }
  }
}
// tslint:disable-next-line:max-line-length
// https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615&key=YOUR_API_KEY
