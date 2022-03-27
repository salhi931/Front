import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GestionDesPrixService} from '../../../services/gestion-des-prix.service';
import {ConfigurationService} from '../../../services/configuration.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-lancer-une-promotion',
  templateUrl: './lancer-une-promotion.component.html',
  styleUrls: ['./lancer-une-promotion.component.css']
})
export class LancerUnePromotionComponent implements OnInit {
  // tslint:disable-next-line:variable-name
// tslint:disable-next-line:variable-name
  famille_selectionee: any;
  sousFamilleSelectionnee: any;
  SousFamille: any;
  zone: any;
  constructor(public gestionDesPrixService: GestionDesPrixService, public configurationService : ConfigurationService) { }
  displayedColumns: string[] = ['N.o', 'client', 'zone', 'status' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  displayedColumns2: string[] = ['id_article ', 'code_article', 'nom_article', 'famille', 'sousfamille', 'status'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  dataSource2 = new MatTableDataSource([]) ;
  ngOnInit(): void {
    this.gestionDesPrixService.getFamille();
    this.gestionDesPrixService.getarticles()
      .subscribe(data => {
        this.gestionDesPrixService.articles = data;
        for(const article of this.gestionDesPrixService.articles){article.status = true; }
        this.dataSource2 = new MatTableDataSource(this.gestionDesPrixService.articles) ;
        setTimeout(
          () => {
            this.dataSource2.paginator = this.paginator2; }, 10);
      }, error => {console.log(error.message); });
    this.gestionDesPrixService.getSousFamille();
    this.gestionDesPrixService.getZones()
      .subscribe(data => {this.gestionDesPrixService.zones = data; }, error => {alert(error.message); });
    this.gestionDesPrixService.getZones()
      .subscribe(data => {
        this.gestionDesPrixService.zones = data;
        this.gestionDesPrixService.getClients()
          .subscribe(data1 => {
            this.gestionDesPrixService.clients = data1;
            for (const client of this.gestionDesPrixService.clients){
              client.statuss = true;
              client.zone_client = this.getzone(client.zone);
            }
            this.dataSource = new MatTableDataSource(this.gestionDesPrixService.clients) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
          }, error => {console.log(error.message); });
      }, error => {console.log(error.message); });
  }
  onSubmitt(f: NgForm): any{
    console.log(f.value);
    // @ts-ignore
    const articles = this.dataSource2.filteredData.filter(article => article.status === true);
    // @ts-ignore
    const clients = this.dataSource.filteredData.filter(client => client.statuss === true);
    this.gestionDesPrixService.SauvgarderPromotion(f.value, articles, clients);

  }
  // tslint:disable-next-line:variable-name
  getArticleFamille(famille_selectionee: any): any{
    if (famille_selectionee !== undefined){
      this.SousFamille = this.gestionDesPrixService.SousFamille
        // @ts-ignore
        .filter(sousfamille => (Number(sousfamille.idFamille) === Number(famille_selectionee)));
      let articles = this.gestionDesPrixService.articles;
      // @ts-ignore
      articles = articles.filter(article => Number(article.famille) === Number(famille_selectionee));
      this.dataSource2 = new MatTableDataSource(articles) ;
      setTimeout(
        () => {
          this.dataSource2.paginator = this.paginator2; }, 10);
    }
    else {
      this.dataSource2 = new MatTableDataSource(this.gestionDesPrixService.articles) ;
      setTimeout(
        () => {
          this.dataSource2.paginator = this.paginator2; }, 10);
    }
  } // tslint:disable-next-line:variable-name
  getArticleSousFamille(sousFamilleSelectionnee: any): any{
    if (sousFamilleSelectionnee !== undefined){
      let articles = this.gestionDesPrixService.articles;
      // @ts-ignore
      articles = articles.filter(article => (Number(article.sous_famille) === Number(sousFamilleSelectionnee)
        && Number(article.famille) === Number(this.famille_selectionee)));
      this.dataSource2 = new MatTableDataSource(articles) ;
      setTimeout(
        () => {
          this.dataSource2.paginator = this.paginator2; }, 10);
    }
    else {
      this.getArticleFamille(this.famille_selectionee);
    }
  }
  getClientZone(zone1: any): any{
    if (zone1 !== undefined){
      let clients = this.gestionDesPrixService.clients;
      // @ts-ignore
      clients = clients.filter(client1 => Number(client1.zone) === Number(zone1));
      this.dataSource = new MatTableDataSource(clients) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 10);
    }
    else {
      this.dataSource = new MatTableDataSource(this.gestionDesPrixService.clients) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 10);
    }}
  getfamilleArticle(id: number): any{
    for (const famille of this.gestionDesPrixService.famille){
      if (famille.id === id){
        return famille.description;
      }
    }
    return null;
  }
  getSousfamilleArticle(id: number): any{
    for (const sousfamille of this.gestionDesPrixService.SousFamille){
      if (sousfamille.id === id){
        return sousfamille.description;
      }
    }
    return null;
  }
  getzone(idzone: number): any{
    console.log(this.gestionDesPrixService.zones);
    for (const zone of this.gestionDesPrixService.zones){
      if (Number(zone.id) === Number(idzone)){return zone.zone; }
    }
    return 'null';
  }
}
