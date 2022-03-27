import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GestionDesCommerciaux implements OnInit{
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
  commerciaux: any;
  commercial_consulte: any;
  objectif: any;
  id_commercial: any;
  ngOnInit(): void {
    this.getCommerciaux();
  }

  getCommerciaux(): Observable<any>{
      return this.http.
        get(environment.HTTP + 'Commerciaux');
  }
  AjoutCommercial( f: NgForm): void{
    this.http
      .post(environment.HTTP + 'commerciauxes', f.value)
      .subscribe(data => {
        alert('vous avez ajouter un commercial avec succes');
        this.router.navigate(['/commerciaux'], {relativeTo: this.route});
      }, error => {
        alert('un erreur s\'est produit');
      });
  }
  Supprimer_commercial(id: number): void{
    this.http.delete(environment.HTTP + 'commerciauxes/' + id)
      .subscribe(() => {
        this.getCommerciaux().subscribe( data => {
          this.commerciaux = data;
        });
        alert('Suppression réussie');
      }, error => {
        if (error.error.message){alert(error.error.message);}
        else {alert('un erreur s\'est produit'); }
          });
  }
  getCommercial_consultee(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'Commercial/' + id);
  }
  ModifierCommercial(form: NgForm, id: number): void{
    this.http
      .put(environment.HTTP + 'commerciauxes/' + id, form.value, { headers: new HttpHeaders(({'Content-Type': 'application/json'}))})
      .subscribe(data => {
           alert('la modification est bien faite');
           this.router.navigate(['/commerciaux'], {relativeTo: this.route}); },
        error => {alert('un erreur s\'est produit'); } );
  }
  getObjectif(id: number): Observable<any>{
    this.id_commercial = id;
    return this.http
      .get(environment.HTTP + 'Objectif/' + id);
  }
  OnAjoutObjectif(f: NgForm): any{
    this.http
      .post(environment.HTTP + 'commerciauxobjectifs', f.value)
      .subscribe(data => {
        alert('vous avez ajouter un objectif avec succes');
        this.router.navigate(['/commerciaux'], {relativeTo: this.route});
      }, error => {
        alert('un erreur s\'est produit');
      });
  }
  ModifierObjectif(f: NgForm, id: number){
    this.http
      .put(environment.HTTP + 'commerciauxobjectifs/' + id, f.value, { headers: new HttpHeaders(({'Content-Type': 'application/json'}))})
      .subscribe(data => {
          alert('la modification est bien faite');
          this.router.navigate(['/commerciaux'], {relativeTo: this.route}); },
        error => {alert('un erreur s\'est produit'); } );
  }
}
