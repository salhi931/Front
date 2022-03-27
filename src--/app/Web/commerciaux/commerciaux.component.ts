import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesCommerciaux} from '../../services/gestion-des-commerciaux';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-commerciaux',
  templateUrl: './commerciaux.component.html',
  styleUrls: ['./commerciaux.component.css']
})
export class CommerciauxComponent implements OnInit {
  displayedColumns: string[] = ['id_client', 'nomUtilisateur', 'cin', 'date_activite_debut', 'date_activite_fin', 'objectif', 'edit', 'delete'];
  constructor(public gestionDesCommerciaux: GestionDesCommerciaux, private router: Router, private activatedRoute: ActivatedRoute) { }
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionDesCommerciaux.commerciaux) ;
  filtrage: any;
  ngOnInit(): void {
    this.gestionDesCommerciaux.getCommerciaux().subscribe( data => {
      this.gestionDesCommerciaux.commerciaux = data;
      this.dataSource = new MatTableDataSource(this.gestionDesCommerciaux.commerciaux) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 0
      );
    });
  }

  appliquerfilter(filtervalue: string){
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  OnModifier(id: number){
     this.gestionDesCommerciaux.getCommercial_consultee(id)
       .subscribe(data => {
         this.gestionDesCommerciaux.commercial_consulte = data;
         this.router.navigate(['/commerciaux-edition'], {relativeTo: this.activatedRoute});
       });

  }
  OnSupprimer(id: number){
    this.gestionDesCommerciaux.Supprimer_commercial(id);
    window.location.reload();
  }
  Ongetobjectif(id: number): void{
    this.gestionDesCommerciaux.getObjectif(id);
  }

}
