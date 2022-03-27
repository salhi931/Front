
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Form, NgForm} from '@angular/forms';
import {environment} from "../../environments/environment";
//import {Web_user} from '../models/web_user';
@Injectable({
  providedIn: 'root'
})
export class GestionDesAdminsService implements OnInit{
  public users: any;
  public constructor(private http: HttpClient) {
  }

  getUsers(): void{
    this.http
      .get(environment.HTTP + 'users')
      .subscribe(data => {
        this.users = data;
      });
  }
  //AjouterAdmin(web_user: Web_user) {
  //}

  ngOnInit(): void {
  }
}
