import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesFacturesService} from "../../services/Gestion-des-factures.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationService} from "../../services/configuration.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDesRetoursService} from "../../services/gestion-des-retours.service";

@Component({
  selector: 'app-retours',
  templateUrl: './retours.component.html',
  styleUrls: ['./retours.component.css']
})
export class RetoursComponent implements OnInit {
  constructor(public gestionDesRetoursService: GestionDesRetoursService, private router: Router, private route: ActivatedRoute, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['N.o', 'num_facture', 'nom_client', 'total_ttc', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionDesRetoursService.retours) ;
  filtrage: any;

  ngOnInit(): void {
    this.gestionDesRetoursService.getDistance();
    this.gestionDesRetoursService.getRetours();
    setTimeout(
      () => {
        this.dataSource = new MatTableDataSource(this.gestionDesRetoursService.retours) ;
        this.dataSource.paginator = this.paginator; }, 100
    );
  }

  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onModifier(id: any): any{
    this.gestionDesRetoursService.getCommericaux();
    this.gestionDesRetoursService.getClients();
    this.gestionDesRetoursService.modifier(id);
    this.gestionDesRetoursService.getRetourConsultee(id);
  }

  // tslint:disable-next-line:variable-name
  onSupprimer(id: number): any{
    this.gestionDesRetoursService.supprimer(id);

  }
}

