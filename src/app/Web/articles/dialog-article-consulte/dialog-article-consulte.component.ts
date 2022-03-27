import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";

@Component({
  selector: 'app-dialog-article-consulte',
  templateUrl: './dialog-article-consulte.component.html',
  styleUrls: ['./dialog-article-consulte.component.css']
})
export class DialogArticleConsulteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDesArticlesService: GestionDesArticlesService) {
  }

  // @ts-ignore
  selectedFile: File;
  retrievedImage: any;

  imgURL: any;
  imagesSupprimer = [];
  imgURLList: any[] = [];

  ngOnInit(): void {
    console.log(this.gestionDesArticlesService.nouveauSelectedfile);
    console.log(this.gestionDesArticlesService.selectedFileListConsulte);
    for (const file of this.gestionDesArticlesService.nouveauSelectedfile) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURLList.push(reader.result);
      };
    }
  }

  supprimer(i: number): any {
    this.imgURLList.splice(i, 1);
    this.gestionDesArticlesService.nouveauSelectedfile.splice(i, 1);
  }
  supprimerimage(i: number): any {
    // @ts-ignore
    this.gestionDesArticlesService.imagesSupprimer.push(this.gestionDesArticlesService.selectedFileListConsulte[i].id);
    console.log(this.gestionDesArticlesService.imagesSupprimer);
    this.gestionDesArticlesService.selectedFileListConsulte.splice(i, 1);
  }

  // @ts-ignore
  onFileChanged(event): any {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      this.gestionDesArticlesService.nouveauSelectedfile.push(this.selectedFile);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.imgURLList.push(this.imgURL);
      };
    }

  }


}
