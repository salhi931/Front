import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {NgModule} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {ConfigurationService} from '../../services/configuration.service';
import './login.component.css';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users: any;
  login: any;
  hide = true;
  // ***********************************************
  // @ts-ignore
  public loginForm: FormGroup;
  // @ts-ignore
  public email;
  // @ts-ignore
  public password;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  // @ts-ignore
  public error: string;
  // tslint:disable-next-line:variable-name
  constructor(public fb: FormBuilder, public loginService: LoginService , private router: Router, private route: ActivatedRoute, public config: ConfigurationService) {
    this.loginForm = this.fb.group({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(20),
      ]),
    });
    this.email = this.loginForm.get('email');
    this.password = this.loginForm.get('password');
  }
  ngOnInit(): void {
    //  this.loginService.getusers();
    // @ts-ignore
     // @ts-ignore
    if ('true' === localStorage.getItem('login')){
      this.router.navigate(['']);
    }
    // @ts-ignore
    this.error = null;

    this.loginService.login_status.subscribe(data => {
      this.login = data;
    });
  }
  authendicated(form: NgForm){
     this.loginService.authendicated(form);

  }
  // @ts-ignore
  public onInputChange(event): any {
    event.target.required = true;
  }
}
