import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {environment} from "../../../../environments/environment";
import {DialogFamilleAjouterComponent} from "../dialog-famille/dialog-famille-ajouter/dialog-famille-ajouter.component";
import {DialogSousFamilleAjouterComponent} from "./dialog-sous-famille-ajouter/dialog-sous-famille-ajouter.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dialog-sous-famille',
  templateUrl: './dialog-sous-famille.component.html',
  styleUrls: ['./dialog-sous-famille.component.css']
})
export class DialogSousFamilleComponent implements OnInit {
  famille: any;
  sousfamille: any;
  sousfamilles: any;
  famille_selectione: any;
  nouvellesousfamille: any;
  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private http: HttpClient, public gestionDesArticlesService: GestionDesArticlesService) { }

  ngOnInit(): void {
    this.getfamille();
    this.getSousfamille()
      .subscribe(data => {
        this.sousfamille = data;

      }, error => {alert(error.message); });
  }
  ModifierFamille(famille: any): any {
    this.openDialog(famille);
  }
  openDialog(sousfamille: any): void {
    const dialogref = this.dialog.open(DialogSousFamilleAjouterComponent, { data: sousfamille, height: '100px', width: '500px'});
    dialogref.afterClosed().subscribe(data => {
      if (data !== sousfamille.description){
        this.http.patch(environment.HTTP + 'articlesSousFamilles/' + sousfamille.id, {idFamille: sousfamille.idFamille, description: data})
          .subscribe(() => {
            console.log('succes');
            this.getfamille();
            this.getSousfamille().subscribe(data1 => this.sousfamille = data1);
          }, error => {alert(error.message); });
      }
    }, error => {
      console.log(error.message);
    });
  }
  getfamille(): any{
    this.http
      .get(environment.HTTP + 'getFamille').subscribe(data => {this.famille = data; }, error => {alert(error.message); });

  }
  getSousfamille(): Observable<any>{
    return  this.http
      .get(environment.HTTP + 'getSousFamille');

  }
  // tslint:disable-next-line:typedef
  getsousfamilles(id: any){
    console.log(id);
    // @ts-ignore
    this.sousfamilles = this.sousfamille.filter(sousfamille => (sousfamille.idFamille === Number(id)));
    console.log(this.sousfamilles);
  }
  supprimerarticle(id: any){}

  // tslint:disable-next-line:variable-name
  AjouterSousFamille(sousfamille: any, famille_selectione: any): any{
    console.log(sousfamille);
    this.http.post(environment.HTTP + 'articlesSousFamilles', {idFamille: famille_selectione, description: sousfamille}).subscribe(() => {
      console.log('succes');
      this.getfamille();
      this.gestionDesArticlesService.getFamille();
    }, error => {alert(error.message); });
  }
}
