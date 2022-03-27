import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDesPrixService} from "../../services/gestion-des-prix.service";

@Component({
  selector: 'app-gestion-des-promotion',
  templateUrl: './gestion-des-promotion.component.html',
  styleUrls: ['./gestion-des-promotion.component.css']
})
export class GestionDesPromotionComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'type', 'date_debut', 'date_fin', 'status', 'consulter'];
  constructor(private router: Router, private route: ActivatedRoute, public gestionDesPrixService: GestionDesPrixService) { }
// @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  ngOnInit(): void {
    this.getPomotion();
  }
  nouvellePromotion(): any{
    this.router.navigate(['/lancer-promotion'], {relativeTo: this.route});
  }
  getPomotion(): any {
    this.gestionDesPrixService.getPromotions().subscribe( data => {
      this.gestionDesPrixService.Promotions = data;
      this.dataSource = new MatTableDataSource(this.gestionDesPrixService.Promotions) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 0
      );
    });
  }

  // @ts-ignore
  OnchangeStatusCommande(idPromotion: any, element): any{
    this.gestionDesPrixService.changestatusPromotion(idPromotion, element)
      .subscribe(data => {
        this.getPomotion();
      }, error => {alert(error.message); });
  }

  onConsulter(element: any): any{
    this.gestionDesPrixService.onConsulter(element);
    console.log(element);
  }
}
