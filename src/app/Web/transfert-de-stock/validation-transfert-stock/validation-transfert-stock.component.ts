import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {GestionDeStockService} from "../../../services/gestion-de-stock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-validation-transfert-stock',
  templateUrl: './validation-transfert-stock.component.html',
  styleUrls: ['./validation-transfert-stock.component.css']
})
export class ValidationTransfertStockComponent implements OnInit {
  displayedColumns: string[] = ['N.o', 'codeArticle', 'NomArticle', 'quantite', 'quantiteApprouvee', 'magasin'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
  //demandedetail: any;
  VerificationStock = true;
  magasins: any = [];
  magasinSelected: any;
  // tslint:disable-next-line:variable-name
  constructor( private _snackBar: MatSnackBar, public gestionDeStockService: GestionDeStockService, private router: Router, private route : ActivatedRoute ) { }

  ngOnInit(): void {
    if (this.gestionDeStockService.id_Transfert !== undefined){
      if (this.gestionDeStockService.transfertentete.chargement){
        this.displayedColumns = ['N.o', 'codeArticle', 'NomArticle', 'quantiteStock', 'quantite',  'quantiteApprouvee', 'magasin'];
      }
      this.gestionDeStockService.getMagasin()
        .subscribe(data => {
          console.log(data);
          this.magasins = data;
          this.dataSource.data =  this.gestionDeStockService.transfertdetail;
          setTimeout( () => {
            this.dataSource.paginator = this.paginator;
            // this.magasinSelected = String(this.magasinSelected)
            this.dataSource.sort = this.sort;
          }, 10);
        });


    }
    else{
      this.router.navigate(['/transfert'], {relativeTo: this.route});
    }
  }
  valider(): any{
    // @ts-ignore
     if (true){
      this.gestionDeStockService.verifierStockMobileWeb(this.gestionDeStockService.transfertentete.idCommercial)
        .subscribe(data => {
          if (data === 1){
            alert('le stock Mobile-Web est incompatible');
          }
          if (data === 2){
            this.gestionDeStockService.verifier_validerStock(this.dataSource);
          }
        }, error => { alert(error.message); });
      // this.gestionDeStockService.verifier_validerStock(this.dataSource);

    }
    else{
      const packTransfert = {transfertentete: this.gestionDeStockService.transfertentete, transfertdetail: this.dataSource.filteredData};
      this.gestionDeStockService.save(packTransfert);
    }
  }
  openSnackBar(message: string, action: string): any{
    this._snackBar.open(message, action);
  }
  exportTable(): void{
    this.gestionDeStockService.exportToPdf('ExampleTable1');
  }
  onchangeMagasin(): any{
    // dechargement
    if (this.gestionDeStockService.transfertentete.type){
      // @ts-ignore
      this.dataSource.data.forEach( data => data.idMagasinOrigine = this.magasinSelected);

    }
    // dechargement
    if (!this.gestionDeStockService.transfertentete.type){
      // @ts-ignore
      this.dataSource.data.forEach( data => data.idMagasinDestinataire = this.magasinSelected);

    }

  }

}
