import {Component, OnDestroy, OnInit} from '@angular/core';
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {NgForm} from "@angular/forms";
import {DialogArticleComponent} from "../dialog-ajouter-article/dialog-article.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogArticleConsulteComponent} from "../dialog-article-consulte/dialog-article-consulte.component";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit, OnDestroy {
  famille_selectione = '';
  SousFamille: any;

  getfamille(idFamilleSelectionnee: any): any{
    console.log(idFamilleSelectionnee);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.SousFamille = this.gestionDesArticlesService.SousFamille.filter(sousfamille => (Number(sousfamille.idFamille) === Number(idFamilleSelectionnee)));
  }
  // @ts-ignore
  selectedFile: File;
  retrievedImage: any;
  test = 1;
  constructor(public dialog: MatDialog, public gestionDesArticlesService: GestionDesArticlesService) { }

  ngOnInit(): void {
    this.test = 1;

    this.gestionDesArticlesService.getFamille();
    this.gestionDesArticlesService.getSousFamille();
    this.test = this.gestionDesArticlesService.article_consulter.famille;
  }
  ajouterimages(): any{
    this.openDialog();
  }
  openDialog(): void{
    this.dialog.open(DialogArticleConsulteComponent, {data: this.gestionDesArticlesService.selectedFileListConsulte, height: '700px',
      width: '700px'});

  }

  // @ts-ignore
  onFileChanged(event): any{
    this.selectedFile = event.target.files[0];
    this.retrievedImage = event.target.files[0].picByte;

  }

  onSubmit(f: NgForm): any{
    // tslint:disable-next-line:max-line-length
    this.gestionDesArticlesService.modifier( f, this.gestionDesArticlesService.nouveauSelectedfile, this.gestionDesArticlesService.imagesSupprimer);
  }
  ngOnDestroy(): void {
     this.gestionDesArticlesService.nouveauSelectedfile = [];
     this.gestionDesArticlesService.imagesSupprimer = [];
   }
}
