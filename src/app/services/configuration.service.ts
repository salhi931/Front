import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService implements OnInit{
  public constructor(private http: HttpClient ) {
  }
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public email_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public tele2_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public ancien_solde_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public caract4_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public caract5_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public caract6_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public caract7_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public caract8_required: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public facture_sans_commande: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public retour_sans_facture: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public validationDeRetours: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public repture_stock: boolean;
  // @ts-ignore
  // tslint:disable-next-line:variable-name
  public paiement_sans_facture: boolean;

  // @ts-ignore
  public devise: string;
   // @ts-ignore
  // tslint:disable-next-line:variable-name
  public nbr_de_chiffre_apres_virgule: number;
  nbr_de_chiffres_apres_virgule( chiffre: number): number{
    chiffre = (Math.floor(chiffre * Math.pow(10, this.nbr_de_chiffre_apres_virgule))) / Math.pow(10, this.nbr_de_chiffre_apres_virgule);
    return chiffre;
  }
   getConfiguration2(): Observable<any>{
    return  this.http.get(environment.HTTP + 'getConfiguration');
  }
  affecter(data1: any): any{
    const data = data1[0];
    // @ts-ignore
    this.email_required = data.email_required;
    // @ts-ignore
    this.tele2_required = data.tele2_required;
    // @ts-ignore
    this.ancien_solde_required = data.ancien_solde_required;
    // @ts-ignore
    this.caract4_required = data.caract4_required;
    // @ts-ignore
    this.caract5_required = data.caract5_required;
    // @ts-ignore
    this.caract6_required = data.caract6_required;
    // @ts-ignore
    this.caract7_required = data.caract7_required;
    // @ts-ignore
    this.caract8_required = data.caract8_required;
    // @ts-ignore
    this.facture_sans_commande = data.facture_sans_commande;
    // @ts-ignore
    this.retour_sans_facture = data.retour_sans_facture;
    // @ts-ignore
    this.repture_stock = data.repture_stock;
    // @ts-ignore
    this.paiement_sans_facture = data.paiement_sans_facture;
    // @ts-ignore
    this.paiement_sans_facture = data.paiement_sans_facture;
    // @ts-ignore
    console.log(data.devise);
    // @ts-ignore
    this.devise = data.devise;
    // @ts-ignore
    this.nbr_de_chiffre_apres_virgule = data.nbr_de_chiffre_apres_virgule;
    this.validationDeRetours = data.validationDeRetours;
  }
  getConfiguration(): any{
    this.http.get(environment.HTTP + 'getConfiguration')
      .subscribe(data1 => {
        // @ts-ignore
        const data = data1[0];
        // @ts-ignore
        this.email_required = data.email_required;
        // @ts-ignore
        this.tele2_required = data.tele2_required;
        // @ts-ignore
        this.ancien_solde_required = data.ancien_solde_required;
        // @ts-ignore
        this.caract4_required = data.caract4_required;
        // @ts-ignore
        this.caract5_required = data.caract5_required;
        // @ts-ignore
        this.caract6_required = data.caract6_required;
        // @ts-ignore
        this.caract7_required = data.caract7_required;
        // @ts-ignore
        this.caract8_required = data.caract8_required;
        // @ts-ignore
        this.facture_sans_commande = data.facture_sans_commande;
        // @ts-ignore
        this.retour_sans_facture = data.retour_sans_facture;
        // @ts-ignore
        this.repture_stock = data.repture_stock;
        // @ts-ignore
        this.paiement_sans_facture = data.paiement_sans_facture;
        // @ts-ignore
        this.paiement_sans_facture = data.paiement_sans_facture;
        // @ts-ignore
        console.log(data.devise);
        // @ts-ignore
        this.devise = data.devise;
        // @ts-ignore
        this.nbr_de_chiffre_apres_virgule = data.nbr_de_chiffre_apres_virgule;
        console.log(data);
      });
  }
  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {
    this.getConfiguration();
  }
}
