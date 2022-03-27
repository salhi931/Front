import {Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesArticlesService} from "../../services/gestion-des-articles.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(public gestionDesArticlesService: GestionDesArticlesService, private router: Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['id_article ', 'code_article', 'nom_article', 'groupe_article', 'edit', 'delete'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  articles = [];
  ngOnInit(): void {
    this.getarticles();
    this.gestionDesArticlesService.getFamille();
    this.gestionDesArticlesService.getSousFamille();
  }
  getarticles(): any{
        this.gestionDesArticlesService.getarticles().
        subscribe( data => {
            this.articles = data;
            this.dataSource = new MatTableDataSource(this.articles) ;
            setTimeout(
            () => {
              this.dataSource.paginator = this.paginator; }, 10);          });
  }

  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }

  OnModifier(id: any): any{
       this.gestionDesArticlesService.ConsulterModifier(id)
        .subscribe(data => {
          this.gestionDesArticlesService.article_consulter = data;
          this.gestionDesArticlesService.getImage(data.id_article)
            .subscribe(
              res => {
                this.gestionDesArticlesService.selectedFileListConsulte = res;
                console.log(this.gestionDesArticlesService.selectedFileListConsulte);
                this.router.navigate(['/articles-edit'], {relativeTo: this.route});

                /*const base64Data = retrieveResonse.picByte;
                this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
              }
            );

        });

  }

  OnSupprimer(id: any): any{
    this.gestionDesArticlesService.SupprimerArticle(id);
  }


}
