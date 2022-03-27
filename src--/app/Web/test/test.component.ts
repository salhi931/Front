import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class TestComponent implements OnInit {
  /*constructor() { }

  ngOnInit(): void {
    this.initMap();
  }*/
  // @ts-ignore
  constructor(private httpClient: HttpClient, public datepipe: DatePipe) { }
  // @ts-ignore
  onSubmitt(f: any): any{
    console.log(f);
    // tslint:disable-next-line:variable-name
    const latest_dateDebut = this.datepipe.transform(f.value.dateDebut, 'yyyy-MM-dd');
    // tslint:disable-next-line:variable-name
    const latest_dateFin = this.datepipe.transform(f.value.dateFin, 'yyyy-MM-dd');
    this.httpClient
      .get(environment.HTTP + 'reprtings/commande/' + latest_dateDebut + '/' + latest_dateFin).subscribe(data => {console.log(data); });
  }

  ngOnInit(): void {
  }
}
