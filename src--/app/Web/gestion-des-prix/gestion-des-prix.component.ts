import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GestionDesPrixService} from '../../services/gestion-des-prix.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: 'app-gestion-des-prix',
  templateUrl: './gestion-des-prix.component.html',
  styleUrls: ['./gestion-des-prix.component.css']
})
export class GestionDesPrixComponent implements OnInit {
  Prix: any;
  Table_de_prix: any = [];
  table_prixSelectionnee: any;
  displayedColumns: string[] = [ 'article', 'code_article', 'nom_article', 'prix'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionDesPrixService.TablePrix);
  filtrage: any;

  constructor(public gestionDesPrixService: GestionDesPrixService, public configurationService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesPrixService.getPrix();
  }

  getTable_prix(): any {
    console.log(this.table_prixSelectionnee);
    if (this.table_prixSelectionnee !== undefined) {
      this.gestionDesPrixService.getTable_prix(this.table_prixSelectionnee);
      setTimeout(
        () => {
          this.dataSource = new MatTableDataSource(this.gestionDesPrixService.TablePrix);
          this.dataSource.paginator = this.paginator;
        }, 100
      );
    }
    if (this.table_prixSelectionnee === undefined) {
      setTimeout(
        () => {
          // @ts-ignore
          this.dataSource = new MatTableDataSource([]);
          this.dataSource.paginator = this.paginator;
        }, 100
      );
    }
  }

  appliquerfilter(filtervalue: string): any {
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
}
