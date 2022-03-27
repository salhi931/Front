import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {OptimisationService} from "../../../services/optimisation.service";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";

@Component({
  selector: 'app-dialog-article',
  templateUrl: './dialog-article.component.html',
  styleUrls: ['./dialog-article.component.css']
})
export class DialogArticleComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDesArticlesService: GestionDesArticlesService) { }
  // @ts-ignore
  selectedFile: File;
  retrievedImage: any;

  imgURL: any;
  imgURLList: any[] = [];

  ngOnInit(): void {
    for (const file of this.data){
      const reader = new FileReader();
      reader.readAsDataURL(file);
       // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
         this.imgURLList.push(reader.result);
      };
    }
  }
  supprimer(i: number): any{
    this.imgURLList.splice(i, 1);
    this.gestionDesArticlesService.selectedFileList.splice(i, 1);
  }
  // @ts-ignore
  onFileChanged(event): any{
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      this.gestionDesArticlesService.selectedFileList.push(this.selectedFile);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.imgURLList.push(this.imgURL);
      };
    }
  }
}
