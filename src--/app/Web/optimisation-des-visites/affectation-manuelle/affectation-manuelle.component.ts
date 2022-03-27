import {Component, OnInit, ViewChild} from '@angular/core';
import {OptimisationService} from "../../../services/optimisation.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-affectation-manuelle',
  templateUrl: './affectation-manuelle.component.html',
  styleUrls: ['./affectation-manuelle.component.css']
})
export class AffectationManuelleComponent implements OnInit {
  constructor(public optimisationService: OptimisationService) { }
  displayedColumns: string[] = ['N.o', 'client', 'zone', 'status' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]) ;
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  //filtrage: any;
  ngOnInit(): void {

    this.optimisationService.getVisites()
      .subscribe(data => {
        this.optimisationService.visites = data;
      }, error => {console.log(error.message); });
    this.optimisationService.getCommericaux()
      .subscribe(data => {
        this.optimisationService.commerciaux = data;
      }, error => {console.log(error.message); });
    this.optimisationService.getZones()
      .subscribe(data => {
        this.optimisationService.zones = data;
        this.optimisationService.getClients()
          .subscribe(data1 => {
            this.optimisationService.clients = data1;
            for (const client of this.optimisationService.clients){
              client.statuss = true;
              client.zone_client = this.getzone(client.zone);
            }
            this.dataSource = new MatTableDataSource(this.optimisationService.clients) ;
            setTimeout(
              () => {
                this.dataSource.paginator = this.paginator; }, 10);
          }, error => {console.log(error.message); });
      }, error => {console.log(error.message); });
    this.optimisationService.codePrincipale();
  }

  onSubmitt(f: NgForm): any{
    const idCommercial = f.value.idCommercial;
    const date = f.value.date;
    console.log(date);
    // @ts-ignore
    const clients = this.dataSource.filteredData.filter( client => client.statuss === true);
    this.optimisationService.enregistrerVisites(idCommercial, date, clients);

  }
  getzone(idzone: number): any{
    console.log(this.optimisationService.zones);
    for (const zone of this.optimisationService.zones){
      if (Number(zone.id) === Number(idzone)){return zone.zone; }
    }
    return 'null';
  }

  getClientZone(zones: any): any{
    console.log(zones.value);
    if (zones.length > 0){
      let clients = this.optimisationService.clients;
      // @ts-ignore
      clients = clients.filter(client1 => this.verifier(zones, client1.zone));
      this.dataSource = new MatTableDataSource(clients) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 10);
    }
    else {
      this.dataSource = new MatTableDataSource(this.optimisationService.clients) ;
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator; }, 10);
    }
  }
  verifier(zones: any, clientZone: any): any{
    if (zones.indexOf(clientZone) !== -1) {
      return true;
    }
    else {return false; }
  }
}
