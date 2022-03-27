import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {GestionDesPrixService} from '../../../services/gestion-des-prix.service';
import {GestionClientsService} from "../../../services/gestionClients.service";
import {SelectionModel} from "@angular/cdk/collections";
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-affectation-prix-clients',
  templateUrl: './affectation-prix-clients.component.html',
  styleUrls: ['./affectation-prix-clients.component.css']
})
export class AffectationPrixClientsComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  table_prixSelectionnee: any;
  zone_selectionnee: any;
  caracteristique_selectionne: any;
  choix: any;

  clients: any = [];
  displayedColumns: string[] = ['n.o', 'code_client', 'nom_client', 'zone', 'caracteristique 1', 'caracteristique 2', 'caracteristique 3', 'select'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionClientsService.clients_valides);
  filtrage: any;
  selection = new SelectionModel;
  constructor(public gestionDesPrixService: GestionDesPrixService, public gestionClientsService: GestionClientsService, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesPrixService.getPrix();
    this.getClient();
   }
  getClient(): any{
    this.gestionClientsService.getClients().
    subscribe(data => {
      this.clients = data;
      this.gestionClientsService.getClientvalidandnonvalid(this.clients);
      this.dataSource = new MatTableDataSource(this.clients) ;
      console.log(this.gestionClientsService.clients_valides);
      // @ts-ignore
      this.selection = new SelectionModel(true, this.dataSource.filteredData.filter(t => t.status));
      this.dataSource = new MatTableDataSource(this.gestionClientsService.clients_valides) ;
      this.gestionClientsService.getClientvalidandnonvalid(this.clients);
      this.dataSource.paginator = this.paginator;
    });
  }
  assigned = [];
  HeaderCheckBoxChanged(model: any) {
    // tslint:disable-next-line:no-debugger
    this.assigned = [];
    if (model.checked === true) {
      // @ts-ignore
      this.dataSource.filteredData.forEach( d => {
        // @ts-ignore
        d.status = true;
        // @ts-ignore
        this.assigned.push(d.idClient);
      });
    } else {
      // @ts-ignore
      this.dataSource.filteredData.forEach( d => {
        // @ts-ignore
        d.status = false;
      });
    }
   // console.log('OnHeaderCheckbox=', this.assigned);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  CheckBoxChanged(model: any, ID: any) {
    //debugger;
    if (model.checked === true) {
      // @ts-ignore
      this.assigned.push(ID);
    } else {
      let i = 0;
      for (const cl of this.assigned){
       if (cl === ID){
         this.assigned.splice(i);
       }
       else { i += 1; }
     }
    }
    console.log('OncheckBox=', this.assigned);
  }

  // tslint:disable-next-line:variable-name
  Assign(assigned: any, table_prixSelectionnee: any) {
    console.log(assigned, table_prixSelectionnee);
    this.gestionDesPrixService.affecter(assigned, table_prixSelectionnee );
  }
  appliquerfilter(filtervalue: string){
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    this.assigned = [];
    // @ts-ignore
    this.selection = new SelectionModel(true, this.dataSource.filteredData.filter(t => t.status));
    console.log(this.dataSource.filteredData);
  }

}
