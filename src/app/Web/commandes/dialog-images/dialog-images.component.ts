import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {GestionDesCommandes2Service} from '../../../services/gestion-des-commandes-2.service';

@Component({
  selector: 'app-dialog-images',
  templateUrl: './dialog-images.component.html',
  styleUrls: ['./dialog-images.component.css']
})
export class DialogImagesComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public gestionDesCommandes2Service: GestionDesCommandes2Service) {
  }

  // @ts-ignore
  selectedFile: File;
  retrievedImage: any;

  imgURL: any;
  imagesSupprimer = [];
  imgURLList: any[] = [];

  ngOnInit(): void {

    for (const file of this.gestionDesCommandes2Service.nouveauSelectedfile) {
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
    this.gestionDesCommandes2Service.nouveauSelectedfile.splice(i, 1);
  }
  supprimerimage(i: number): any {
    // @ts-ignore
    this.gestionDesCommandes2Service.imagesSupprimer.push(this.gestionDesCommandes2Service.selectedFileListConsulte[i].id);
    console.log(this.gestionDesCommandes2Service.imagesSupprimer);
    this.gestionDesCommandes2Service.selectedFileListConsulte.splice(i, 1);
  }

  // @ts-ignore
  onFileChanged(event): any {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      this.gestionDesCommandes2Service.nouveauSelectedfile.push(this.selectedFile);
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        this.imgURLList.push(this.imgURL);
      };
    }

  }

}
