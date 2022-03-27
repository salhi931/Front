import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GestionClientsService} from '../../../services/gestionClients.service';
import {ConfigurationService} from '../../../services/configuration.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogPositionComponent} from '../dialog-position/dialog-position.component';
import {DialogFactureComponent} from "../../factures/dialog-facture/dialog-facture.component";

@Component({
  selector: 'app-ajouter-client',
  templateUrl: './ajouter-client.component.html',
  styleUrls: ['./ajouter-client.component.css']
})
export class AjouterClientComponent implements OnInit, OnDestroy{
  client: any;
  // @ts-ignore
  selectedFile: File;
  imgURL: any;
  @HostBinding('class.employer-form') public readonly employerForm = true;
  public qualifications = ['Young Padawan', 'Junior', 'Middle', 'Senior'];
  constructor(public dialog: MatDialog, public gestionClientsService: GestionClientsService , public config: ConfigurationService) { }

  ngOnInit(): void {
    this.config.getConfiguration();
    this.gestionClientsService.getzones();
    this.gestionClientsService.getCategorieClient();
    this.gestionClientsService.getTableprix();
  }

  onSubmit(f: NgForm): void{
    console.log(f.value);
    this.client = f.value;
    this.client.lat = this.gestionClientsService.lat;
    this.client.lng = this.gestionClientsService.lng;
    console.log(this.client);
    this.gestionClientsService.AjoutClient(f, this.selectedFile, this.gestionClientsService.lat, this.gestionClientsService.lng);
    //f.reset();
  }
  // @ts-ignore
  onFileChanged(event): any{
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      // tslint:disable-next-line:prefer-const
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
       // tslint:disable-next-line:variable-name
      reader.onload = (_event) => {
        this.imgURL = reader.result;
       };
    }
  }
  openDialog(): void{
    // tslint:disable-next-line:variable-name
    let status_position = false;
    // tslint:disable-next-line:max-line-length
    this.gestionClientsService.getPosition().then(pos =>
    { if (!status_position){
      status_position = true;
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      const dialogref = this.dialog.open(DialogPositionComponent, {data: {lat: pos.lat, lng: pos.lng}});
      dialogref.afterClosed().subscribe(data => {
        console.log(this.gestionClientsService.lat, this.gestionClientsService.lng);

      }, error => {
        console.log(error.message);
      });
    }
    });
    setTimeout(() => {
      if (!status_position){
        status_position = true;
        const dialogref1 = this.dialog.open(DialogPositionComponent, {data: {lat:  33.60017951049487 , lng: -7.571468353271484}});
        dialogref1.afterClosed().subscribe(data1 => {
          console.log(this.gestionClientsService.lat, this.gestionClientsService.lng);
        }, error => {
          console.log(error.message);
        });
      }
    }, 5000);
  }
  // @ts-ignore
  map(event): any{
    console.log(event);
    this.gestionClientsService.lat = event.coords.lat;
    this.gestionClientsService.lng = event.coords.lng;
  }
  EffacerCoordonnees(): any{
    this.gestionClientsService.lat = undefined;
    this.gestionClientsService.lng = undefined;

  }
  ngOnDestroy(): void {
    this.gestionClientsService.lat = undefined;
    this.gestionClientsService.lng = undefined;
  }
}
