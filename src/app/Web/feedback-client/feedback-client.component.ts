import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ConfigurationService} from "../../services/configuration.service";
import {GestionClientsService} from "../../services/gestionClients.service";
import {Form} from "@angular/forms";
import {PieceJOintfactureComponent} from "../factures/piece-jointfacture/piece-jointfacture.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-feedback-client',
  templateUrl: './feedback-client.component.html',
  styleUrls: ['./feedback-client.component.css']
})
export class FeedbackClientComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['N', 'nomClient', 'Commercial', 'description', 'date_de_lancement', 'piece' , 'delete'];
  // displayedColumns: string[] = ['num_commande', 'client', 'TTC', 'date_de_lancement', 'status', 'edit', 'suppression'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource([]) ;
  filtrage: any;
  Total: any = 0;
  feedback: any[] = [];
  constructor(public dialog: MatDialog, public gestionClientsService: GestionClientsService, public configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 10);

  }
  ngAfterViewInit(): any {
    this.configurationService.getConfiguration();

    this.gestionClientsService.getClients()
      .subscribe(data => {
        this.gestionClientsService.clients = data;
        this.gestionClientsService.getCommericaux()
          .subscribe(dataCom => {
            this.gestionClientsService.commerciaux = dataCom;
            this.getFeedbacks();
          });

        // this.configurationService.getConfiguration();
        // this.gestionDesCommandesService.getClients();
        //  this.getCommandes();
      }, error => {alert('une error s\'est produite'); });  }

  getFeedbacks(): any{
    this.gestionClientsService.getFeedback()
      .subscribe(data => {
        this.feedback = data;
        for (const feed of this.feedback) {
          feed.Commercial = this.getNomCommercial(feed.idCommercial);
          feed.nomClient = this.gestionClientsService.getNomClient(feed.idClient);
        }
        // @ts-ignore
        this.dataSource.data = this.feedback ;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
        console.log(data);
      }, error => {
        console.log(error.message);
      });
  }
  getFeedbacksCommercialDate(f: Form): any{
    // @ts-ignore
    this.gestionClientsService.getFeedbacksCommercialDate(f)
      .subscribe(data2 => {
        this.feedback = data2;
        for (const feed of this.feedback){
          feed.Commercial = this.getNomCommercial(feed.idCommercial);
          feed.nomClient = this.gestionClientsService.getNomClient(feed.idClient);
        }
        // @ts-ignore
        this.dataSource.data = this.feedback;
        setTimeout(
          () => {
            this.dataSource.paginator = this.paginator; }, 10);
      }, error => {alert('une error s\'est produite');
      });
  }
  getNomCommercial(id: number): any{
    for (const commercial of this.gestionClientsService.commerciaux){
      if (Number(commercial.id_commercial) === Number(id)){
        return commercial.nom;
      }
    }
    return '';
  }
  appliquerfilter(filtervalue: string): any{
    this.dataSource.filter = filtervalue.trim().toLocaleLowerCase();
  }
  piece(id: any): any {
    this.gestionClientsService.getPiece(id)
      .subscribe(res => {
          // this.gestionDesFacturesService.selectedFileListConsulte = res;
          this.dialog.open(PieceJOintfactureComponent, {data: res, height: '700px',
            width: '700px'});

          /*const base64Data = retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;*/
        }
      );

  }
  OnSupprimer(id: any): any{}

}
