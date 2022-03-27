import { Component, OnInit } from '@angular/core';
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {ConfigurationService} from "../../../services/configuration.service";
import {GestionDesRetoursService} from "../../../services/gestion-des-retours.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-consultation-retours',
  templateUrl: './consultation-retours.component.html',
  styleUrls: ['./consultation-retours.component.css']
})
export class ConsultationRetoursComponent implements OnInit {

  constructor(public gestionDesRetoursService: GestionDesRetoursService, public configurationService: ConfigurationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.gestionDesRetoursService.retours_consultee){
      this.router.navigate(['/retours'], {relativeTo: this.route});
    }
    setTimeout(() => {
      // @ts-ignore
      //this.nomCommercial = this.gestionDesRetoursService.getNomCommercial();
      //this.codeClient = this.gestionDesRetoursService.recherche_code(this.gestionDesRetoursService.retours_consultee.nom_client);
    }, 0);
  }
  /*getCodeClient(): any{
   this.gestionDesRetoursService.recherche_code('hh');
 }
 /*etNomCommercial(): any{
   setTimeout(() =>{
     this.gestionDesRetoursService.getNomCommercial();

   }, 1000)
 }*/
}
