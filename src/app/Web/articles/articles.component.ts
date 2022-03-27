import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GestionDesArticlesService} from "../../services/gestion-des-articles.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit,AfterViewInit {

  constructor(public gestionDesArticlesService: GestionDesArticlesService, private router: Router, private route: ActivatedRoute) { }
  displayedColumns: string[] = ['id_article ', 'code_article', 'nom_article', 'groupe_article', 'edit', 'delete'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  articles: any = [];
  ngOnInit(): void {
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);
  }
  ngAfterViewInit(): void {
    this.gestionDesArticlesService.getFamilleReturn()
      .subscribe(data => {
        this.gestionDesArticlesService.famille = data;
        this.getarticles();
      }, error => {console.log(error.message); });
  }
  getarticles(): any{
        this.gestionDesArticlesService.getarticles().
        subscribe( data => {
            this.articles = data;
            for (const article of this.articles) {
              // @ts-ignore
              article.Famille = this.getFamillees(article.famille);
            }
            this.dataSource.data =  this.articles ;
            setTimeout(
            () => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              }, 100);          });
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
  getcolor(i: number): any{
    if (i % 2 === 0){
      return '#DCDCDC';
    }
    else {
      return '#F5F5F5';
    }
  }
  getFamillees(id: any): any{
    for ( const famille of this.gestionDesArticlesService.famille){
      if ( famille.id === id){
        return famille.description;
      }
    }
  }

}
