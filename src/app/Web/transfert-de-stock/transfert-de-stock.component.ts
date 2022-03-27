import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigurationService} from "../../services/configuration.service";
import {GestionDeStockService} from "../../services/gestion-de-stock.service";

@Component({
  selector: 'app-transfert-de-stock',
  templateUrl: './transfert-de-stock.component.html',
  styleUrls: ['./transfert-de-stock.component.css']
})
export class TransfertDeStockComponent implements OnInit {

  constructor(public configurationService: ConfigurationService, public gestionDeStockService: GestionDeStockService) { }
  displayedColumns: string[] = ['num_transfert', 'commercial', 'type', 'date_de_lancement', 'status', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  filtrage: any;
  transferts: any[] = [];
  commerciaux: any[] = [];
  dataSource = new MatTableDataSource([]) ;
  ngOnInit(): void {
    this.gestionDeStockService.getCommericaux()
      .subscribe(data1 => {
        this.gestionDeStockService.commerciaux = data1;
        this.gestionDeStockService.getTransferts()
          .subscribe(data => {
            this.transferts = data;
            for (const trans of this.transferts) {
              trans.nom = this.gestionDeStockService.getCommercialNom(trans.idCommercial);
              if (trans.chargement) {
                trans.charge = 'Chargement';
              }
              else{
                trans.charge = 'Dechargement';

              }
            }
            // @ts-ignore
            this.dataSource = new MatTableDataSource(this.transferts);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 10);
          });
      });

  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  onModifier(id: any): any{
    this.gestionDeStockService.id_Transfert = id;
    setTimeout(
      () => {
        this.gestionDeStockService.getTransfertPack(id);
      }, 100
    );



  }
  getCommerciaux(id: any): any{
    for ( const commerial of this.commerciaux){
      if ( commerial.id_commercial === id){
        return commerial.nom;
      }
    }
    return '--------------';
  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDeStockService.supprimerTransfert(id);

  }
  OnchangeStatusTransfert(id: any, element: any): void{

    //this.gestionDesCommandesService.changestatuscommande(id, element);
  }

}
