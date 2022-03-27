import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {OptimisationService} from "../../../services/optimisation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GestionClientsService} from "../../../services/gestionClients.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "ol";
import {PieceJOintfactureComponent} from "../../factures/piece-jointfacture/piece-jointfacture.component";

@Component({
  selector: 'app-dialog-feedback',
  templateUrl: './dialog-feedback.component.html',
  styleUrls: ['./dialog-feedback.component.css']
})
export class DialogFeedbackComponent implements OnInit {
  feedback: any = [];
  nomClient: any;
  commerciaux: any = [];
  displayedColumns: string[] = ['N', 'Commercial', 'description', 'date_de_lancement', 'piece' , 'delete'];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public gestionClientsService: GestionClientsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gestionClientsService.getCommerciaux()
      .subscribe(data1 => {
        this.commerciaux = data1;
        this.gestionClientsService.getFeedbackbyClient(this.data.id)
          .subscribe(data => {
            this.feedback = data;
            for (const feed of this.feedback) {
              feed.Commercial = this.getNomCommercial(feed.idCommercial);
            }
            this.nomClient = this.gestionClientsService.getNomClient(this.data.id);
            this.dataSource = new MatTableDataSource(this.feedback) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
            console.log(data);
          }, error => {
            console.log(error.message);
          });
      }, error => {
        console.log(error.message);
      });

  }
  getNomCommercial(id: number): any{
    for (const commercial of this.commerciaux){
      if (Number(commercial.id_commercial) === Number(id)){
        return commercial.nom;
      }
    }
    return '';
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
  OnSupprimer(id: any): any{

  }

}
