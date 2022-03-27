import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesColisService} from "../../services/gestion-des-colis.service";
import {MatDialog} from "@angular/material/dialog";
import {OptimisationService} from "../../services/optimisation.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-gestion-des-colis',
  templateUrl: './gestion-des-colis.component.html',
  styleUrls: ['./gestion-des-colis.component.css']
})
export class GestionDesColisComponent implements OnInit {
  filtrage: any;
  displayedColumns: string[] = ['N.o', 'Description', 'date', 'consulter' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  constructor(public gestionDesColisService: GestionDesColisService) { }

  ngOnInit(): void {
    this.gestionDesColisService.getColis()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data) ;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
      });
  }
  OnModifier(id: number): void {

  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator; }, 10);
  }

}
