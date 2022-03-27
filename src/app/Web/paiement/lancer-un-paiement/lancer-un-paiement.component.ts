import {Component, OnInit, ViewChild} from '@angular/core';
import {map, startWith} from "rxjs/operators";
import {FormControl, NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {GestionDePaiementService} from "../../../services/gestion-de-paiement.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogClientComponent} from "../../commandes/dialog-client/dialog-client.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigurationService} from "../../../services/configuration.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {element} from "protractor";
import {DialogPaiementComponent} from "../dialog-paiement/dialog-paiement.component";

@Component({
  selector: 'app-lancer-un-paiement',
  templateUrl: './lancer-un-paiement.component.html',
  styleUrls: ['./lancer-un-paiement.component.css']
})
export class LancerUnPaiementComponent implements OnInit {

  myControl2 = new FormControl();
  myControl3 = new FormControl();
  // @ts-ignore
  filteredOptions2: Observable<string[]>;
  // @ts-ignore
  filteredOptions3: Observable<string[]>;
  options2: string[] = [];
  options3: string[] = [];
  client_code_selected: any;
  client_selectionnee: any;
  client: any;
  factures: any = [];
  totalAPaye = 0;
  displayedColumns: string[] = ['N.o', 'num_commande', 'nom_client', 'total_ttc', 'montant_paye', 'selectionner'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.factures) ;
  filtrage: any;
  commercial_id_selected: any;

  // tslint:disable-next-line:variable-name
  constructor( public configurationService: ConfigurationService, private _snackBar: MatSnackBar, public gestionDePaiementService: GestionDePaiementService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.gestionDePaiementService.getCommerciaux()
      .subscribe(data => {
        this.gestionDePaiementService.commerciaux = data;
      }, error => {alert('error de connexion a la base de donnees'); });
    this.gestionDePaiementService.getClients();
    this.getOptions2();
    this.getOptions3();
    setTimeout(
      () => {
        this.filteredOptions2 = this.myControl2.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter2(value))
          );
      }, 100
    );
    setTimeout(
      () => {
        this.filteredOptions3 = this.myControl3.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter3(value))
          );
      }, 100
    );

  }

  openDialog(): void {
    this.dialog.open(DialogClientComponent, {data: this.client});
  }
  openDialog2(): void {
    let dialogRef = this.dialog.open(DialogPaiementComponent, {
      height: '400px',
      width: '900px',
    });
    //this.dialog.open(DialogPaiementComponent);
  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }


  private _filter2(value: string): any {
    if (value !== undefined) {
      const filterValue2 = value.toLowerCase();
      return this.options2.filter(option => option.toLowerCase().includes(filterValue2));
    }
  }

  private _filter3(value: string): any {
    if (value !== undefined) {
      const filterValue3 = value.toLowerCase();
      return this.options3.filter(option => option.toLowerCase().includes(filterValue3));
    }
  }

  getOptions2(): void {
    this.gestionDePaiementService.getClients();
    setTimeout(
      () => {
        for (const client of this.gestionDePaiementService.clients) {
          this.options2.push(client.nom_client);
        }
      }, 1000
    );
  }

  getOptions3(): void {
    this.gestionDePaiementService.getClients();
    setTimeout(
      () => {
        for (const client of this.gestionDePaiementService.clients) {
          this.options3.push(client.code.toString());
        }
      }, 1000
    );
  }

  recherchenomClient(): void {
    this.getOptions2();
    this.getOptions3();
    setTimeout(
      () => {
        this.filteredOptions2 = this.myControl2.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter2(value))
          );
      }, 100
    );
    setTimeout(
      () => {
        this.filteredOptions3 = this.myControl3.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter3(value))
          );
      }, 100
    );
9

  }

  // tslint:disable-next-line:no-shadowed-variable
  OnchangeStatusCommande(id: number, element: any): any {
    console.log(element);
    this.calculerTotalfacture(this.dataSource.filteredData);
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
     // @ts-ignore
    //this.selection = new SelectionModel(true, this.dataSource.filteredData.filter(t => t.status));
    console.log(this.dataSource.filteredData);
    this.calculerTotalfacture(this.dataSource.filteredData);
  }

  getFactures(id: any): any{
    this.gestionDePaiementService.getFacturesClients(id)
      .subscribe( data => {
        this.factures = data;
        // @ts-ignore
        this.factures = this.factures.filter( facture => facture.total_TTC > facture.montantPaye);

        for (const fact of this.factures) {
          fact.status = true;
        }
        this.calculerTotalfacture(this.factures);
        this.dataSource = new MatTableDataSource(this.factures) ;
      });
  }


  rechercheClient(): any {
    this.client = {};
    this.factures = [];
    this.options2 = [];
    this.options3 = [];
    this.recherchenomClient();
    if (this.client_code_selected && this.client_selectionnee) {
      this.client_selectionnee = this.gestionDePaiementService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDePaiementService.rechercherClient(this.client_code_selected);
      //this.openSnackBar('ce client n\'existe pas', 'OK');
      setTimeout(
        () => {
          if (this.client !== null) {
            if (!this.configurationService.paiement_sans_facture){
              this.getFactures(this.client.idClient);
            }

            this.openDialog();
          }
          else {
            this.openSnackBar('ce client n\'existe pas', 'OK');
          }
          return 0;
        }, 10
      );
      return 0;
    }
    if (this.client_selectionnee && !this.client_code_selected ){
      this.client_code_selected = this.gestionDePaiementService.recherche_code(this.client_selectionnee);
      this.client = this.gestionDePaiementService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            if (!this.configurationService.paiement_sans_facture){
              this.getFactures(this.client.idClient);
            }
            this.openDialog();
              }
          else {
            this.openSnackBar('ce client n\'existe pas', 'OK');
          }
          return 0; }, 10
      );
      return 0;
    }
    if (this.client_code_selected ){
      this.client_selectionnee = this.gestionDePaiementService.recherche_nom(this.client_code_selected);
      this.client = this.gestionDePaiementService.rechercherClient(this.client_code_selected);
      setTimeout(
        () => {
          if (this.client !== null){
            if (!this.configurationService.paiement_sans_facture){
              this.getFactures(this.client.idClient);
            }
            this.openDialog();
              }
          else {
            this.openSnackBar('ce client n\'existe pas', 'OK');
          }
          return 0; }, 10
      );
      return 0;
    }
  }


  getFactures2(){
    if (this.client !== null && this.client !== undefined ) {
        this.getFactures(this.client.idClient);
      }
    else {
      this.openSnackBar('choisissez un client', 'OK');
    }
  }
  deleteFactures2(){
    this.factures = [];
    // @ts-ignore
    this.calculerTotalfacture(this.factures);
  }
  supprimerespece(i: number): any{
    this.gestionDePaiementService.listespeces.splice(i, 1);
    this.calculerTotal();
  }
  supprimercheque(i: number): any{
    this.gestionDePaiementService.listcheques.splice(i, 1);
    this.calculerTotal();
  }
  supprimereffet(i: number): any{
    this.gestionDePaiementService.listeffets.splice(i, 1);
    this.calculerTotal();
  }
  supprimervirment(i: number): any{
    this.gestionDePaiementService.listvirements.splice(i, 1);
    this.calculerTotal();
  }
  supprimertpe(i: number): any{
    this.gestionDePaiementService.listtpes.splice(i, 1);
    this.calculerTotal();
  }
  calculerTotal(): any{
    this.gestionDePaiementService.calculerTotal();
  }
  calculerTotalfacture(factures: any): any{
    this.totalAPaye = 0;
    console.log(this.totalAPaye);
    for (const fact of factures){
      console.log(fact.total_TTC);
      if (fact.status){
        this.totalAPaye += Number(fact.total_TTC - fact.montantPaye);
      }

    }
    console.log(this.totalAPaye);
  }
  enregistrer(f: NgForm): any{
    console.log(this.client);
    // tslint:disable-next-line:max-line-length
    if (this.client !== undefined && (this.client.code === this.client_code_selected) && (this.client.nom_client === this.client_selectionnee)){
      if (confirm( 'Êtes-vous sûre de lancer ce paiement')) {
        console.log(f.value.totalPaye);
        // tslint:disable-next-line:max-line-length
        this.gestionDePaiementService.enregisterPaiement(this.client, this.gestionDePaiementService.totalDePaiement, this.factures, this.totalAPaye, this.commercial_id_selected, f.value.date_de_lancement);
      }
    }
    else {
      this.openSnackBar('client invalid', 'OK');

    }
  }

}
