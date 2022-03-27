import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class GestionDesColisService implements OnInit{
  constructor( private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
  visites_colis: any[] = [];
  ngOnInit(): void {
  }
  getColis(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'getColis');
  }
  saveVisiteColis(idVisite: any, listColis: any, listSupp: any): any{
    this.http
        .post(environment.HTTP + 'PostVisiteColis/' + idVisite, listColis)
        .subscribe(data => {
          console.log(data);
        });
    this.http
        .post(environment.HTTP + 'SupprimerVisiteColis/' + idVisite, listSupp)
        .subscribe(data => {
          console.log(data);
        });
  }
  getVisiteColis(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'getVisitesColis');
  }
  // @ts-ignore
  getStatusVisiteColis(idColi: any, idVisited: any): any{
    for (const visite of this.visites_colis){
      if (visite.idVisite === idVisited && visite.idColis === idColi ){
        return true;
      }
    }
    return false;
  }
  getPossibiliteDAffectation(idColi: any, idVisited: any): any{
    for (const visite of this.visites_colis){
      if (visite.idVisite === idVisited && visite.idColis === idColi ){
        return true;
      }
    }
    for (const visite of this.visites_colis){
      if (visite.idVisite !== idVisited && visite.idColis === idColi ){
        return false;
      }
    }
    return true;
  }
}
