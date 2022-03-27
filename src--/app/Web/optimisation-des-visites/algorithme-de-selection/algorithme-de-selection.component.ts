import { Component, OnInit } from '@angular/core';
import {OptimisationService} from "../../../services/optimisation.service";

@Component({
  selector: 'app-algorithme-de-selection',
  templateUrl: './algorithme-de-selection.component.html',
  styleUrls: ['./algorithme-de-selection.component.css']
})
export class AlgorithmeDeSelectionComponent implements OnInit {
  constructor(public optimisationService: OptimisationService) { }

  ngOnInit(): void {
    this.optimisationService.codePrincipale();
  }

}
