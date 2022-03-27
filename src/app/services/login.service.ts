
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {GestionClientsService} from './gestionClients.service';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{
  public user: any;
  reponse: any;
  // tslint:disable-next-line:variable-name
  login_status = new EventEmitter<boolean>();
  // tslint:disable-next-line:variable-name
  login_role = new EventEmitter<boolean>();
  constructor( private http: HttpClient , public client: GestionClientsService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
  }
  authendicated(form: NgForm): void{
    //this.client.getClients();
    this.http.get(environment.HTTP + 'login/' + form.value.username + '/' + form.value.password).subscribe(data => {
      this.reponse = data;
      if (this.reponse.login_status === false){
        alert('le nom d\'utilisateur ou le password est incorrect');
      }
      if (this.reponse.login_status === true && this.reponse.login_role === true ){
        this.login_status.emit(true);
        // @ts-ignore
        localStorage.setItem('login', 'true');
        this.login_role.emit(true);
        this.router.navigate(['gestion-des-clients']);
        alert('vous etes connectes en tant qu\'AdminSuperieur');
      }
      if (this.reponse.login_status === true && this.reponse.login_role === false ){
        this.login_status.emit(true);
        // @ts-ignore
        localStorage.setItem('login', 'true');

        this.login_role.emit(false);
        this.router.navigate(['gestion-des-clients']);

      }
    }, error => {
      alert('une erreur s\'est produite veuillez réessayer ou contacter votre administration'); } );

  }
}
