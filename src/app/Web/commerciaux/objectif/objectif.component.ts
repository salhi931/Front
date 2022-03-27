import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {GestionDesCommerciaux} from '../../../services/gestion-des-commerciaux';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrls: ['./objectif.component.css']
})
export class ObjectifComponent implements OnInit {

  constructor(public gestionDesCommerciaux: GestionDesCommerciaux, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.gestionDesCommerciaux.objectif){
      this.router.navigate(['/commerciaux'], {relativeTo: this.route});
    }
  }
  onSubmit(f: NgForm): void{
    console.log(f.value);
   this.gestionDesCommerciaux.ModifierObjectif(f, this.gestionDesCommerciaux.objectif.id_objectif);
  }
  OnAjoutObjectif(f: NgForm): void{
    this.gestionDesCommerciaux.OnAjoutObjectif(f);
  }

}
