import { Component, OnInit } from '@angular/core';
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {ConfigurationService} from "../../../services/configuration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogImagesComponent} from "../../commandes/dialog-images/dialog-images.component";
import {MatDialog} from "@angular/material/dialog";
import {PieceJOintfactureComponent} from "../piece-jointfacture/piece-jointfacture.component";

@Component({
  selector: 'app-consultation-facture',
  templateUrl: './consultation-facture.component.html',
  styleUrls: ['./consultation-facture.component.css']
})
export class ConsultationFactureComponent implements OnInit {

  constructor(public dialog: MatDialog, public gestionDesFacturesService: GestionDesFacturesService, public configurationService: ConfigurationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.configurationService.getConfiguration();
    if (!this.gestionDesFacturesService.facture_consultee){
      this.router.navigate(['/factures'], {relativeTo: this.route});
    }
  }
  ConsulterFichierJointe(): any{
    this.gestionDesFacturesService.getImage(this.gestionDesFacturesService.facture_consultee.num_facture)
      .subscribe(
      res => {
        // this.gestionDesFacturesService.selectedFileListConsulte = res;
        this.dialog.open(PieceJOintfactureComponent, {data: res, height: '700px',
          width: '700px'});

        /*const base64Data = retrieveResonse.picByte;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
      }
    );

  }
}
