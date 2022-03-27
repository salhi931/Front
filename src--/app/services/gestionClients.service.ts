import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Client} from '../models/Client';
import {Form, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GestionClientsService implements OnInit{
  test: Client[] = [];
  clients_non_valides: object[] = [];
  clients_valides: object[] = [] ;
 // client_a_ajoutee: Client = new Client();
  client_consulte1: any;
  client_consulte: any;
  zones: any;
  listprix: any;
  selectedFileConsulte: any;
  src: any;
  lat: any;
  latClientConsulte: any;
  lng: any;
  lngClientConsulte: any;

  //afficher le component de validation ou le component de consultation
  validation = false;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
   }
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression

    console.log(this.test);
    //this.getClients();
    //this.getClientvalidandnonvalid();
  }

  // tslint:disable-next-line:typedef
  getClients(): Observable<any> {
    return this.http
      .get(environment.HTTP + 'Clients');
  }
  getzones(): any{
    this.http
      .get(environment.HTTP + '/getzones').subscribe(data => {this.zones = data; }, error => {alert(error.message); });
  }
  getTableprix(): any{
    this.http
      .get(environment.HTTP + '/prix').subscribe(data => {this.listprix = data; }, error => {alert(error.message); });
  }
  getClientvalidandnonvalid(clients: any): void {
     // @ts-ignore
    this.clients_valides = clients.filter( obj => obj.status === true);
     // @ts-ignore
    this.clients_non_valides = clients.filter( obj => obj.status === false);
  }

  AjoutClient(f: NgForm, selectedfile: any, lat: any, lng: any): void{
    this.http
      .post(environment.HTTP + 'nouveauClient', f.value)
      .subscribe(data => {
          const uploadImageData = new FormData();
          // @ts-ignore
          uploadImageData.append('imageFile', selectedfile, data);
          this.http
            .post(environment.HTTP + 'imageClient/upload', uploadImageData, { observe: 'response' })
            .subscribe((response) => {
              alert('vous avez ajouter un client avec succes');
              if (response.status === 200) {
                  console.log('Image uploaded successfully');
                } else {
                  console.log('Image not uploaded successfully');
                }
              }
            );
          //  this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route});
      }, error => {
        alert('un erreur s\'est produit');
      });
  }
  Supprimer_client(id: number): void{
    this.http.delete(environment.HTTP + 'clientses/' + id)
      .subscribe(() => {
        this.getClients();
        alert('Suppression réussie');
      }, error => {alert(error.message); });
  }
  getClient_consultee(id: number): void{
    // this.client_a_modifier.emit(id);
    this.http
      .get(environment.HTTP + 'Client/' + id)
      .subscribe(data => {
        this.client_consulte = data;
        console.log(this.client_consulte);
        this.getImage(id)
          .subscribe(data2 => {
            this.selectedFileConsulte = data2;
            if (this.selectedFileConsulte !== null) {
              this.src = 'data:image/jpeg;base64,' + this.selectedFileConsulte.picByte;
            }
            console.log(this.selectedFileConsulte);
          });
        this.router.navigate(['/Edition-consultation-client'], {relativeTo: this.route});

      });
  }
  retour(): any{
    this.validation = false;
  }
  getClient_a_valider(id: number): void{
    // this.client_a_modifier.emit(id);
    this.validation = true;
    this.http
      .get(environment.HTTP + 'Client/' + id)
      .subscribe(data => {
        this.client_consulte1 = data;
        this.client_consulte = this.client_consulte1;

      });
  }

  ModifierClient(form: NgForm, id: number, selectedFile: File, lat1: any, lng1: any): any{
    if (selectedFile === undefined){
      console.log('undef');
    }
    if (selectedFile === null){
      console.log('null');
    }
    const ClientModifie = form.value;
    ClientModifie.lat = (lat1 === null || lat1 === undefined) ? null : String(lat1);
    ClientModifie.lng = (lng1 === null || lng1 === undefined) ? null : String(lng1);
    console.log(ClientModifie);
    console.log(selectedFile);

    if (selectedFile !== undefined){
         this.http
        .put(environment.HTTP + 'clientses/' + id, ClientModifie, { headers: new HttpHeaders(({'Content-Type': 'application/json'}))})
        .subscribe(data => {
            console.log(data);
            if (this.selectedFileConsulte !== undefined && this.selectedFileConsulte !== null ){
              this.http
                .get(environment.HTTP + 'imageClient/suppressionImageClient/' + id)
                .subscribe(data2 => {
                  console.log(data2);
                  const uploadImageData = new FormData();
                  // @ts-ignore
                  uploadImageData.append('imageFile', selectedFile, id);
                  this.http
                    .post(environment.HTTP + 'imageClient/upload', uploadImageData, { observe: 'response' })
                    .subscribe((response) => {
                      alert('la modification est bien faite');
                      if (response.status === 200) {
                          console.log('Image uploaded successfully');
                        } else {
                          console.log('Image not uploaded successfully');
                        }
                      }
                    );
                });
            }
            else {
              const uploadImageData = new FormData();
              // @ts-ignore
              uploadImageData.append('imageFile', selectedFile, id);
              this.http
                .post(environment.HTTP + 'imageClient/upload', uploadImageData, { observe: 'response' })
                .subscribe((response) => {
                  alert('la modification est bien faite');
                  if (response.status === 200) {
                      console.log('Image uploaded successfully');
                    } else {
                      console.log('Image not uploaded successfully');
                    }
                  }
                );
            }
            alert('le client est valide');

            // this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route});
            }, error => {alert('un erreur s\'est produit'); } );
            }
    else {
      this.http
        .put(environment.HTTP + 'clientses/' + id, form.value, { headers: new HttpHeaders(({'Content-Type': 'application/json'}))})
        .subscribe(data => {
            console.log(data);
            alert('la modification est bien faite');
            alert('le client est valide');

            this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route}); },
            error => {alert('un erreur s\'est produit'); } );
            }
     }

  getImage(id: number): Observable<any>{
    // Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get('http://localhost:8080/imageClient/get/' + id);
  }
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
}























/*this.client_a_ajoutee.nom_client = f.value.nom_client;
   this.client_a_ajoutee.contact_client = f.value.contact_client;
   this.client_a_ajoutee.adresse_client = f.value.adresse_client;
   this.client_a_ajoutee.tele1 = f.value.tele1;
   this.client_a_ajoutee.tele2 = f.value.tele2;
   this.client_a_ajoutee.solde = f.value.solde;
   this.client_a_ajoutee.ancien_solde = f.value.ancien_solde;
   this.client_a_ajoutee.solde_cheque = f.value.solde_cheque;
   this.client_a_ajoutee.categorie_client = f.value.categorie_client;
   this.client_a_ajoutee.loclaisation = f.value.localisation;
   this.client_a_ajoutee.zone_client = f.value.zone_client;
   this.client_a_ajoutee.plafond_cheque = f.value.plafond_cheque;
   this.client_a_ajoutee.plafond_effet = f.value.plafond_effet;
   this.client_a_ajoutee.plafond = f.value.plafond;
   this.client_a_ajoutee.credit = f.value.credit;
   this.client_a_ajoutee.delai_paiement = f.value.delai_paiement;
   this.client_a_ajoutee.taux_de_retours = f.value.taux_de_retours;
   this.client_a_ajoutee.caracteristique1 = f.value.caracteristique1;
   this.client_a_ajoutee.caracteristique2 = f.value.caracteristique2;
   this.client_a_ajoutee.caracteristique3 = f.value.caracteristique3;
   this.client_a_ajoutee.caracteristique4 = f.value.caracteristique4;
   this.client_a_ajoutee.caracteristique5 = f.value.caracteristique5;
   this.client_a_ajoutee.caracteristique6 = f.value.caracteristique6;
   this.client_a_ajoutee.caracteristique7 = f.value.caracteristique7;
   this.client_a_ajoutee.caracteristique8 = f.value.caracteristique8;
   this.client_a_ajoutee.list_prix = f.value.list_prix;
   this.client_a_ajoutee.status = false;
   console.log(this.client_a_ajoutee);
 }*/
