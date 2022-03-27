import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {GestionDesPrixService} from '../../../services/gestion-des-prix.service';
import {GestionDesArticlesService} from '../../../services/gestion-des-articles.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ConfigurationService} from "../../../services/configuration.service";

@Component({
  selector: 'app-ajouter-un-table-de-prix',
  templateUrl: './ajouter-un-table-de-prix.component.html',
  styleUrls: ['./ajouter-un-table-de-prix.component.css']
})
export class AjouterUnTableDePrixComponent implements OnInit {
  Boolean = true;
  // @ts-ignore
  iid: number;
  filtrage: any;
  displayedColumns: string[] = ['code_article', 'nom_article', 'edit'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(this.gestionDesArticlesService.articles) ;
  constructor( public gestionDesArticlesService: GestionDesArticlesService, public gestionDesPrixService: GestionDesPrixService, public configurationService: ConfigurationService) { }
  ngOnInit(): void {
    this.configurationService.getConfiguration();
    this.gestionDesArticlesService.getarticles()
      .subscribe(data => {
        this.gestionDesArticlesService.articles = data;
        this.dataSource = new MatTableDataSource(this.gestionDesArticlesService.articles) ;
        this.dataSource.paginator = this.paginator;
      });
  }
  onSubmit(f: NgForm): any{
    const cont = f.value;
    console.log(cont);
    this.gestionDesPrixService.addPrixtable(f)
      .subscribe( data => {
        // @ts-ignore
        this.iid = data;
        console.log(this.iid);
        this.Boolean = false;
      }, error => {alert('un erreur s\'est produite'); });
  }

  // tslint:disable-next-line:variable-name
  onAffecterPrix(prix: NgModel, id_article: any, code_article: any, nom_article: any  ): any{
    console.log(prix, id_article);
    this.gestionDesPrixService.onAffecterPrix(id_article, code_article, nom_article, prix);
}

  onSauvgarder(description: (() => string) | string): any{
    this.gestionDesPrixService.Sauvgarder(description);
  }
}
