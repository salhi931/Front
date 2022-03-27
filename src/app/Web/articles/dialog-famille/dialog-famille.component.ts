import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {DialogArticleComponent} from "../dialog-ajouter-article/dialog-article.component";
import {DialogFamilleAjouterComponent} from "./dialog-famille-ajouter/dialog-famille-ajouter.component";
import {DialogStockComponent} from "../../stock/dialog-stock/dialog-stock.component";

@Component({
  selector: 'app-dialog-famille',
  templateUrl: './dialog-famille.component.html',
  styleUrls: ['./dialog-famille.component.css']
})
export class DialogFamilleComponent implements OnInit {
  famille: any;
  nouvellefamille: any;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private http: HttpClient, public gestionDesArticlesService: GestionDesArticlesService) { }
  ngOnInit(): void {
    this.getfamille();
   }
  AjouterFamille(famille: any): any{
    console.log(famille);
    this.http.post(environment.HTTP + 'articlesFamilles', {description: famille}).subscribe(() => {
      console.log('succes');
      this.getfamille();
      this.gestionDesArticlesService.getFamille();
    }, error => {alert(error.message); });
  }
  getfamille(): any{
    this.http
      .get(environment.HTTP + 'getFamille').subscribe(data => {this.famille = data; }, error => {alert(error.message); });

  }
  supprimerarticle(i: number): void{
    console.log(i);
  }
  ModifierFamille(famille: any): any{
    this.openDialog(famille);
  }
  openDialog(famille: any): void {
    const dialogref = this.dialog.open(DialogFamilleAjouterComponent, { data: famille, height: '100px', width: '500px'});
    dialogref.afterClosed().subscribe(data => {
      if (data !== famille.description){
       this.http.patch(environment.HTTP + 'articlesFamilles/' + famille.id, {description: data})
         .subscribe(() => {
           console.log('succes');
           this.getfamille();
           this.gestionDesArticlesService.getFamille();
         }, error => {alert(error.message); });
      }
    }, error => {
      console.log(error.message);
    });
  }


  }
