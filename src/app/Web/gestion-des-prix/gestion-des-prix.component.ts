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
  // tslint:disable-next-line:variable-name
  table_des_prix = true;
  affectation = false;
  nouvelle_table = false;
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
    this.gestionDesPrixService.getarticles()
      .subscribe(data => {
        this.gestionDesPrixService.articles = data;
        this.configurationService.getConfiguration();
        this.gestionDesPrixService.getPrix();
      });

  }
// nom_article code_article
  getNomArtile(id: any): any{
    //console.log(this.gestionDesPrixService.articles);
    for( const article of this.gestionDesPrixService.articles){
      console.log(article.id_article, id);
      if (String(article.id_article) === String(id)){
        return article.nom_article;
      }
    }
    return '--';
  }
  // code_article
  getCodeArticle(id: any): any{
    //console.log(this.gestionDesPrixService.articles);
    for( const article of this.gestionDesPrixService.articles){
      console.log(article.id_article, id);
      if (String(article.id_article) === String(id)){
        return article.code_article;
      }
    }
    return '--';
  }
  getTable_prix(): any {
    console.log(this.table_prixSelectionnee);
    if (this.table_prixSelectionnee !== undefined) {
      this.gestionDesPrixService.getTable_prix2(this.table_prixSelectionnee)
        .subscribe(data => {
          this.gestionDesPrixService.TablePrix = data;
          for (const prix of this.gestionDesPrixService.TablePrix){
            prix.nom_article = this.getNomArtile(prix.id_article);
            prix.code_article = this.getCodeArticle(prix.id_article);
          }
          this.dataSource = new MatTableDataSource(this.gestionDesPrixService.TablePrix);
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator;
            }, 100
          );
        }, error => {alert('un erreur s\'est produite'); });

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
  table_des_prix1(): any{
    this.affectation = false;
    this.nouvelle_table = false;
    this.table_des_prix = true;
  }
  affectation1(): any{
    this.table_des_prix = false;
    this.nouvelle_table = false;
    this.affectation = true;
  }
  nouvelle_table1(): any{
    this.table_des_prix = false;
    this.affectation = false;
    this.nouvelle_table = true;
  }
}
