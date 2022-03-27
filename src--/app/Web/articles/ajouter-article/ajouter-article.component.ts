import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GestionDesArticlesService} from '../../../services/gestion-des-articles.service';
import {environment} from "../../../../environments/environment";
import {DialogMapComponent} from "../../optimisation-des-visites/dialog-map/dialog-map.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogArticleComponent} from "../dialog-ajouter-article/dialog-article.component";
import {DialogFamilleComponent} from "../dialog-famille/dialog-famille.component";
import {DialogSousFamilleComponent} from "../dialog-sous-famille/dialog-sous-famille.component";

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.css']
})
export class AjouterArticleComponent implements OnInit, OnDestroy {
  famille: any[] = [
    {famille: 'famille 1', sousfamille1: 'sousfamille 11', sousfamille2: 'sousfamille 12', sousfamille3: 'sousfamille 13'},
    {famille: 'famille 2', sousfamille1: 'sousfamille 21', sousfamille2: 'sousfamille 22', sousfamille3: 'sousfamille 23'},
    {famille: 'famille 3', sousfamille1: 'sousfamille 31', sousfamille2: 'sousfamille 32', sousfamille3: 'sousfamille 33'},
  ];
  famille_selectione = '';
  SousFamille: any;
  Sousfamille2: any;
  Sousfamille3: any;

  getfamille(idFamilleSelectionnee: string){
    console.log(idFamilleSelectionnee);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    this.SousFamille = this.gestionDesArticlesService.SousFamille.filter(sousfamille => (Number(sousfamille.idFamille) === Number(idFamilleSelectionnee)));
    console.log(this.SousFamille);

  }
  constructor(public dialog: MatDialog, public gestionDesArticlesService: GestionDesArticlesService) { }

  ngOnInit(): void {
    this.gestionDesArticlesService.selectedFileList = [];
    if (this.gestionDesArticlesService.famille === undefined || this.gestionDesArticlesService.SousFamille === undefined){
      this.gestionDesArticlesService.getFamille();
      this.gestionDesArticlesService.getSousFamille();
    }
  }
  ajouterimages(): any{
    this.openDialog();
  }
  openDialog(): void{
    this.dialog.open(DialogArticleComponent, {data: this.gestionDesArticlesService.selectedFileList, height: '700px',
      width: '700px'});

  }
  openDialogFamille(): void{
    this.dialog.open(DialogFamilleComponent, { height: '600px',
      width: '600px'});

  }
  openDialogSousFamille(): void{
    this.dialog.open(DialogSousFamilleComponent, { height: '700px',
      width: '700px'});

  }

  onSubmit(f: NgForm): any{
    // this.openDialog();
     this.gestionDesArticlesService.AjouterArticle(f,  this.gestionDesArticlesService.selectedFileList);
  }
  nouvelleFamille(): void{
    this.openDialogFamille();
  }
  nouvelleSousFamille(): void{
    this.openDialogSousFamille();
  }

  ngOnDestroy(): void {
    this.gestionDesArticlesService.selectedFileList = [];
  }
}
