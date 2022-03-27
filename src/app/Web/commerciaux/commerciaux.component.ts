import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesCommerciaux} from '../../services/gestion-des-commerciaux';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-commerciaux',
  templateUrl: './commerciaux.component.html',
  styleUrls: ['./commerciaux.component.css']
})
export class CommerciauxComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id_client', 'nomUtilisateur', 'cin', 'date_activite_debut', 'date_activite_fin', 'objectif', 'edit', 'delete'];
  constructor(public gestionDesCommerciaux: GestionDesCommerciaux, private router: Router, private activatedRoute: ActivatedRoute) { }
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.gestionDesCommerciaux.commerciaux) ;
  filtrage: any;
  ngOnInit(): void {
    // @ts-ignore
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);

  }
  ngAfterViewInit(): void {
    this.gestionDesCommerciaux.getCommerciaux().subscribe( data => {
      this.gestionDesCommerciaux.commerciaux = data;
      this.dataSource = new MatTableDataSource(this.gestionDesCommerciaux.commerciaux) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 0
      );
    });
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  OnModifier(id: number): any{
     this.gestionDesCommerciaux.getCommercial_consultee(id)
       .subscribe(data => {
         this.gestionDesCommerciaux.commercial_consulte = data;
         this.router.navigate(['/commerciaux-edition'], {relativeTo: this.activatedRoute});
       });
  }
  Ongetobjectif(id: number): void{
    this.gestionDesCommerciaux.getObjectif(id)
      .subscribe(data => {
        this.gestionDesCommerciaux.objectif = data;
        this.router.navigate(['/commerciaux-objectif'], {relativeTo: this.activatedRoute});
      });
  }
  OnSupprimer(id: number): any{
    this.gestionDesCommerciaux.Supprimer_commercial(id);
    window.location.reload();
  }

  nouveauCommercial(): void{
    this.router.navigate(['/commerciaux-ajout'], {relativeTo: this.activatedRoute});
  }
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
}
