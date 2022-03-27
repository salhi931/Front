import { Component, OnInit } from '@angular/core';
import {GestionDesPrixService} from "../../../services/gestion-des-prix.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-consultation-modification-une-promotion',
  templateUrl: './consultation-modification-une-promotion.component.html',
  styleUrls: ['./consultation-modification-une-promotion.component.css']
})
export class ConsultationModificationUnePromotionComponent implements OnInit {

  constructor(public gestionDesPrixService: GestionDesPrixService) { }

  Sauvgarder(f: NgForm): void{
    console.log(f.value);
    console.log(this.gestionDesPrixService.PromotionConsultee);
    this.gestionDesPrixService.SauvgarderPromotionModifier(this.gestionDesPrixService.PromotionConsultee);
  }
  ngOnInit(): void {
  }

}
