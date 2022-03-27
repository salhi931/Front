import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {GestionDesArticlesService} from "../../../services/gestion-des-articles.service";
import {OptimisationService} from "../../../services/optimisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {DialogFactureComponent} from "../../factures/dialog-facture/dialog-facture.component";
import {PieceJOintfactureComponent} from "../../factures/piece-jointfacture/piece-jointfacture.component";

@Component({
  selector: 'app-dialog-fichier-jointe-visites',
  templateUrl: './dialog-fichier-jointe-visites.component.html',
  styleUrls: ['./dialog-fichier-jointe-visites.component.css']
})
export class DialogFichierJointeVisitesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public optimisationService: OptimisationService, private router: Router, private route: ActivatedRoute) {
  }
  pieces: any = false;
  imgURL: any;
  imagesSupprimer = [];
  imgURLList: any[] = [];
  visite: any;
  ngOnInit(): void {


    this.optimisationService.getVisite(this.data.id)
      .subscribe(data => {
        this.visite = data;
      }, error => {console.log(error.message); });
    this.optimisationService.getImage(this.data.id)
      .subscribe(
        res => {
          this.optimisationService.selectedFileListConsulte = res;
          console.log(this.optimisationService.selectedFileListConsulte);
          //this.router.navigate(['/articles-edit'], {relativeTo: this.route});

          /*const base64Data = retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
        }
      );

  }
  piece(): any{
    this.dialog.open(PieceJOintfactureComponent, {data: this.optimisationService.selectedFileListConsulte , height: '700px',
      width: '900px'});

  }

}
