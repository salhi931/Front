import { Component, OnInit } from '@angular/core';
import {GestionDesFacturesService} from "../../../services/Gestion-des-factures.service";
import {ConfigurationService} from "../../../services/configuration.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-consultation-facture',
  templateUrl: './consultation-facture.component.html',
  styleUrls: ['./consultation-facture.component.css']
})
export class ConsultationFactureComponent implements OnInit {

  constructor(public gestionDesFacturesService: GestionDesFacturesService, public configurationService: ConfigurationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.configurationService.getConfiguration();
    if (!this.gestionDesFacturesService.facture_consultee){
      this.router.navigate(['/factures'], {relativeTo: this.route});
    }
  }
}
