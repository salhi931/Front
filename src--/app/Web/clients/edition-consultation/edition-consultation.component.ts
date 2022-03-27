import {Component, OnDestroy, OnInit} from '@angular/core';
import {GestionClientsService} from '../../../services/gestionClients.service';
import {ConfigurationService} from '../../../services/configuration.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edition-consultation',
  templateUrl: './edition-consultation.component.html',
  styleUrls: ['./edition-consultation.component.css']
})
export class EditionConsultationComponent implements OnInit, OnDestroy {
  src: any;
  // @ts-ignore
  selectedFile: File;
  lat: any;
  lng: any;

  // tslint:disable-next-line:max-line-length
  constructor(public gestionCleintsService: GestionClientsService, public config: ConfigurationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.config.getConfiguration();
    this.lat = Number(this.gestionCleintsService.client_consulte.lat);
    this.lng = Number(this.gestionCleintsService.client_consulte.lng);
    if (!this.gestionCleintsService.client_consulte) {
      this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route});
    }
  }

  onSubmit(f: NgForm): void {
    // this.gestionCleintsService.client_consulte.lat = String(this.lat);
    // this.gestionCleintsService.client_consulte.lng = String(this.lng);
    // tslint:disable-next-line:max-line-length
    this.gestionCleintsService.ModifierClient(f, this.gestionCleintsService.client_consulte.idClient, this.selectedFile, this.lat, this.lng);
    this.gestionCleintsService.retour();
    // f.reset();
  }

  Retour() {
    this.router.navigate(['/gestion-des-clients'], {relativeTo: this.route});
    this.gestionCleintsService.retour();
  }

  // @ts-ignore
  onFileChanged(event): any {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      //this.src = reader.result;
      // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.gestionCleintsService.src = reader.result;
      };
    }
  }
  // @ts-ignore
  map(event): any{
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
}

  ngOnDestroy(): void {
    this.gestionCleintsService.selectedFileConsulte = undefined;
    this.gestionCleintsService.src = undefined;

  }
}
