import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
 import { GoogleMapsAPIWrapper } from '@agm/core';
import { google } from '@agm/core/services/google-maps-types';
import { ControlPosition } from '@agm/core/services/google-maps-types';


// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
  export class TestComponent implements OnInit {
  image = '';
  // @ts-ignore
  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.http
      .get('http://192.168.1.158:8089/downloadFile/commande/92022032316541580')
      .subscribe(data => {
        console.log(data);
        // @ts-ignore
        this.image = data;
      })
  }
}
