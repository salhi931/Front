import { Component, OnInit } from '@angular/core';
import {GestionDePaiementService} from "../../../services/gestion-de-paiement.service";
import {ConfigurationService} from "../../../services/configuration.service";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-consultation-paiement',
  templateUrl: './consultation-paiement.component.html',
  styleUrls: ['./consultation-paiement.component.css']
})
export class ConsultationPaiementComponent implements OnInit {

  constructor(public gestionDePaiementService: GestionDePaiementService, public configurationService: ConfigurationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.gestionDePaiementService.paiement_consultee === undefined){
      this.router.navigate(['/paiement'], {relativeTo: this.route});
    }
  }

}
