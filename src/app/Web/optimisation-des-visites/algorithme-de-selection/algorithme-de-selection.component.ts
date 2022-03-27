import { Component, OnInit } from '@angular/core';
import {OptimisationService} from "../../../services/optimisation.service";

@Component({
  selector: 'app-algorithme-de-selection',
  templateUrl: './algorithme-de-selection.component.html',
  styleUrls: ['./algorithme-de-selection.component.css']
})
export class AlgorithmeDeSelectionComponent implements OnInit {
  constructor(public optimisationService: OptimisationService) { }
  n = 3; // nombre des clients à visiter par un tel commercial
  // tslint:disable-next-line:variable-name
  duree_de_visite = 0.5; // durée de visite des clients
  // ListPosition = ['commercial', 'client 1 ', 'client 3', 'client 5', 'client 6']; // : liste des clients à visites
  ListPosition = [1, 2, 3, 4, 5]; // : liste des clients à visites
  ListPosition2 = ['commercial', 'client 1 ', 'client 3', 'client 5'];
  SolutionPosition = [1]; // solution du problème qui contient l’ordre des clients à visiter
  SolutionHeure = [8];
  MatriceDistance = [ [0, 1.5, 2, 4, 1],
    [1.5, 0, 3, 4, 2],
    [2.0, 3, 0, 5, 4],
    [4, 4, 5, 0, 1],
    [1, 2, 4, 1, 0]
  ]; // matrice des distances entre les clients + commercial
  MatriceDistance2 = [ [0, 1.5, 2, 4],
    [1.5, 0, 3, 4],
    [2.0, 3, 0, 5],
    [4, 4, 5, 0]
  ];
  listPropriete = [0, 1, 3, 2, 4]; // liste des priorités des clients
  listPropriete2 = this.listPropriete;
  // tslint:disable-next-line:variable-name
  Heure_de_visite = [0, 10, 13, 0, 0]; // représente la liste de temps de chaque visite des clients
  // tslint:disable-next-line:variable-name
  Heure_de_visite2 = this.Heure_de_visite;
  // tslint:disable-next-line:variable-name
  Heure_de_debut: any = 8; // début de travail des commerciaux
  // tslint:disable-next-line:variable-name
  Heure_de_fin: any = 24; // heure de fin de travail des commerciaux
  liste: any;
  t = 0;
  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.optimisationService.codePrincipale(this.duree_de_visite, this.Heure_de_debut, this.Heure_de_fin, this.MatriceDistance, this.listPropriete,
      this.ListPosition, this.Heure_de_visite, this.SolutionPosition, this.SolutionHeure);
  }

}
