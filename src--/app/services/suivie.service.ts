import {Observable, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InterceptorService} from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class SuivieService implements OnDestroy{
  commerciaux: any;
  statuss = true;
  // @ts-ignore
  locationsSubscription: Subscription;

  constructor(private http: HttpClient, public interceptorService: InterceptorService) {
  }
  getCommerciaux(): any{

    this.interceptorService.status = false;
    const locations = new Observable((observer) => {


      setInterval(() => {
        if (this.statuss){
          this.http
            .get(environment.HTTP + 'Commerciaux')
            .subscribe(data => {this.commerciaux = data; console.log(this.commerciaux);  observer.next(this.commerciaux);

            }, error => {observer.error(error); });
        }

      }, 10000);
    });
    this.locationsSubscription = locations.subscribe({
      // tslint:disable-next-line:typedef
      next(position) {
        console.log('Current Position: ', position);
      },
      // tslint:disable-next-line:typedef
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });

  }
// tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.statuss = false;
    this.locationsSubscription.unsubscribe();
  }
}
