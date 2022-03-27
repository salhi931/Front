import {EventEmitter, Input, NgModule, Output} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {Component, OnInit} from '@angular/core';
import { LoginService} from './services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from './services/loader.service';
import {GestionClientsService} from './services/gestionClients.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'backoffice';
  login = false;
  role: any;
  open: any = false;
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor( private loginservice: LoginService,  private router: Router, private route: ActivatedRoute, public cleintsService: GestionClientsService) {
  }
  localStoragelogin: any = '';
  ngOnInit(): any{
    this.localStoragelogin = localStorage.getItem('login');
    // @ts-ignore
    if ('true' !== localStorage.getItem('login')){
      this.router.navigate(['login']);
    }
    else {
      this.open = true;
    }

    this.loginservice.login_status.subscribe(data => {
      this.login = data;
      console.log(data, localStorage.getItem('login'));
      if (this.login){
        localStorage.setItem('login', 'true');
        console.log(data, localStorage.getItem('login'));
        this.localStoragelogin = localStorage.getItem('login');
        this.open = true; }
      this.localStoragelogin = localStorage.getItem('login');
    });
    this.loginservice.login_role.subscribe(data => {
      this.role = data;
      // @ts-ignore
      localStorage.setItem('role', data);
    });
  }
  Onopen(): any{
    this.open = !this.open;
  }
  logout(): any{
    this.loginservice.login_status.emit(false) ;
    this.open = false;
    localStorage.setItem('login', 'false');
    this.localStoragelogin = localStorage.getItem('login');
    this.router.navigate(['login']);
    // tslint:disable-next-line:no-unused-expression
  }
}
