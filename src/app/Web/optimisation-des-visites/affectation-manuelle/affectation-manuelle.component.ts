import {Component, OnInit, ViewChild} from '@angular/core';
import {OptimisationService} from "../../../services/optimisation.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, NgForm, NgModel} from '@angular/forms';
import {ConfigurationService} from "../../../services/configuration.service";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-affectation-manuelle',
  templateUrl: './affectation-manuelle.component.html',
  styleUrls: ['./affectation-manuelle.component.css']
})
export class AffectationManuelleComponent implements OnInit {
  constructor(public optimisationService: OptimisationService, public configurationService: ConfigurationService) { }
  displayedColumns: string[] = ['N.o', 'client', 'zone', 'categorie', 'status', 'ordre', 'heure', 'priorite' ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]) ;
  toppingsCat = new FormControl();
  toppingsVille = new FormControl();
  toppingsPrefect = new FormControl();
  toppingsZone = new FormControl();
  isLoading = false;
  statuss = false;
  iteniraire = true;
  OptimisationCode = false;
  priorite = true;
  // ********************************
  // tslint:disable-next-line:variable-name
  duree_de_visite = 0.5;
  // tslint:disable-next-line:variable-name
  Heure_de_debut = 8;
  // tslint:disable-next-line:variable-name
  Heure_de_fin = 19;
  vitesse = 100;
  zones: any = [];
  prefecture: any = [];
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]) ;
    this.dataSource.data = [];
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 500);
    this.configurationService.getConfiguration();
    this.optimisationService.getPrefecture().subscribe(data => { this.optimisationService.prefecture = data; });
    this.optimisationService.getVIlle().subscribe(data => { this.optimisationService.villes = data; console.log(data); });
    this.optimisationService.getCommericaux()
      .subscribe(data => {
        this.optimisationService.commerciaux = data;
      }, error => {console.log(error.message); });
    this.optimisationService.getCategories()
      .subscribe(dataa => {
        this.optimisationService.categories = dataa;
        this.optimisationService.getZones()
          .subscribe(data => {
            this.optimisationService.zones = data;
          }, error => {console.log(error.message); });
      });
    // this.optimisationService.codePrincipale();
  }

  OptimisationCode1(f: NgForm): any{
    this.OptimisationCode = !this.OptimisationCode;
    if (f.value.idCommercial !== undefined && f.value.idCommercial !== null && f.value.idCommercial !== '' && this.OptimisationCode){
      this.isLoading = true;
      this.PlusCourtChemin(f);
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
    else{
      let j = 0;
      for (const elemt of this.dataSource.filteredData) {
        // @ts-ignore
        // @ts-ignore
        this.dataSource.filteredData[j].ordre = 0;
        j += 1;
      }
      this.iteniraire = false;
    }
  }
  onSelectPriorite(): any{
    // this.priorite = !this.priorite;
    // this.gestionDesPrixService.onAffecterPrix(id_article, code_article, nom_article, prix);
  }
  onAffecterOrdre(ordre: any, element: any  ): any{
    element.ordre = ordre;
    console.log(ordre, element);
    // this.gestionDesPrixService.onAffecterPrix(id_article, code_article, nom_article, prix);
  }
  onAffecterheure(heure: any, element: any  ): any{
    element.heure = heure;
    console.log(heure, element);
    // this.gestionDesPrixService.onAffecterPrix(id_article, code_article, nom_article, prix);
  }
  onSelect2(f: NgForm): any {
    if (this.statuss) {
      let j = 0;
      for (const elemt of this.dataSource.filteredData) {
        // @ts-ignore
        this.dataSource.filteredData[j].statuss = true;
        j += 1;
      }
      console.log(f.value.idCommercial);
      if (f.value.idCommercial !== undefined && f.value.idCommercial !== null && f.value.idCommercial !== '' && this.OptimisationCode){
        this.isLoading = true;
        this.PlusCourtChemin(f);
        setTimeout(() => {
          this.isLoading = false;
        }, 200);
      }
      else {
        // tslint:disable-next-line:no-shadowed-variable
        let j = 0;
        for (const elemt of this.dataSource.filteredData) {
          // @ts-ignore
          this.dataSource.filteredData[j].ordre = 0;
          j += 1;
        }
        this.iteniraire = false;
      }
    }
    else{
      let j = 0;
      for (const elemt of this.dataSource.filteredData) {
        // @ts-ignore
        this.dataSource.filteredData[j].statuss = false;
        // @ts-ignore
        this.dataSource.filteredData[j].ordre = 0;
        j += 1;
      }
    }
  }
  onSelect( element: any , f: NgForm): any{
    if (!element.statuss){
      element.ordre = 0;
    }
    if (f.value.idCommercial !== undefined && f.value.idCommercial !== null && f.value.idCommercial !== '' && this.OptimisationCode){
      this.isLoading = true;
      this.PlusCourtChemin(f);
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    }
    else {
      // tslint:disable-next-line:no-shadowed-variable
      let j = 0;
      for (const elemt of this.dataSource.filteredData) {
        // @ts-ignore
        // @ts-ignore
        this.dataSource.filteredData[j].ordre = 0;
        j += 1;
      }
      this.iteniraire = false;
    }

  }

  Select( f: NgForm): any{
    if (f.value.idCommercial !== undefined && f.value.idCommercial !== null && f.value.idCommercial !== '' && this.OptimisationCode){
      this.isLoading = true;
      this.PlusCourtChemin(f);
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    }
    else {
      // tslint:disable-next-line:no-shadowed-variable
      let j = 0;
      this.OptimisationCode = false;
      for (const elemt of this.dataSource.filteredData) {
        // @ts-ignore
        // @ts-ignore
        this.dataSource.filteredData[j].ordre = 0;
        j += 1;
      }
      this.iteniraire = false;
    }

  }
  algorithmeOptimisationAvecContrainte(f: NgForm): any{
    // @ts-ignore
    const clients = this.dataSource.filteredData.filter( client => client.statuss === true);
    console.log(f.value.idCommercial, clients);
    const Position = [this.optimisationService.getPositionCommercial(f.value.idCommercial)];
    console.log(Position[0]);
    const Priorite = [0];
    const vitesse = f.value.vitesse;
    // tslint:disable-next-line:variable-name
    const listHeure_de_visite = [0];
    const SolutionPosition = [this.optimisationService.getNomCommercial(f.value.idCommercial)];
    console.log(f.value.Heure_de_debut);
    const SolutionHeure = [f.value.Heure_de_debut];
    const Sommets = [this.optimisationService.getNomCommercial(f.value.idCommercial)];
    const duree_de_visite = f.value.duree_de_visite;
    const Heure_de_debut = f.value.Heure_de_debut;
    const Heure_de_fin = f.value.Heure_de_fin;
    for (const client of clients){
      // @ts-ignore
      Position.push({lat: client.lat, lng: client.lng});
      // @ts-ignore
      Sommets.push(client.idClient);
      // @ts-ignore
      listHeure_de_visite.push(client.heure);
      // @ts-ignore
      Priorite.push(client.priorite);
    }
    const MatriceDistance = this.optimisationService.matriceDistance(Position, vitesse);
    // console.log(duree_de_visite);
    console.log(Position);
    console.log(Heure_de_debut);
    console.log(Heure_de_fin);
    console.log(MatriceDistance);
    console.log(Priorite);
    console.log(listHeure_de_visite);
    console.log(SolutionPosition);
    console.log(SolutionHeure);
    const Solution = this.optimisationService.codePrincipale(duree_de_visite, Heure_de_debut, Heure_de_fin, MatriceDistance, Priorite,
    Sommets, listHeure_de_visite, SolutionPosition, SolutionHeure);
    let j = 0;
    for (const elemt of this.dataSource.filteredData){
      let i = 0;
      for (const sommet of Solution){
        // @ts-ignore
        if (Number(elemt.idClient) === Number(sommet.client)){
          console.log(sommet);

          // @ts-ignore
          this.dataSource.filteredData[j].ordre = i;
          // @ts-ignore
          this.dataSource.filteredData[j].heure =  sommet.temps;
        }
        i += 1;
      }
      j += 1;
    }
    console.log(this.optimisationService.liste);

  }
  PlusCourtChemin(f: NgForm): any{
    const date = f.value.date;
    console.log(date);
    // @ts-ignore
    const clients = this.dataSource.filteredData.filter( client => client.statuss === true);
    console.log(f.value.idCommercial, clients);
    const Position = [this.optimisationService.getPositionCommercial(f.value.idCommercial)];
    console.log(Position[0]);
    const Sommets = [this.optimisationService.getNomCommercial(f.value.idCommercial)];
    for (const client of clients){
      // @ts-ignore
      Position.push({lat: client.lat, lng: client.lng});
      // @ts-ignore
      Sommets.push(client.idClient);
    }
    console.log(Sommets);
    console.log(Position);

    const MatriceDistance = this.optimisationService.matriceDistance(Position, f.value.vitesse);
    const solution = this.optimisationService.trajetMinimale(MatriceDistance, Sommets);
    console.log(solution);
    let j = 0;
    // @ts-ignore
    for (const elemt of this.dataSource.filteredData){
      let i = 0;
      for (const sommet of solution){
        // @ts-ignore
        if (Number(elemt.idClient) === Number(sommet)){
          console.log(sommet);

          // @ts-ignore
          this.dataSource.filteredData[j].ordre = i;
        }
        i += 1;
      }
      j += 1;
    }
    this.iteniraire = true;

  }
  getzone(idzone: number): any{
    for (const zone of this.optimisationService.zones){
      if (Number(zone.id) === Number(idzone)){return zone.zone; }
    }
    return 'null';
  }

  getClientZone(zones: any, categories: any): any{
    console.log(zones);
    if (this.optimisationService.getClientsByZones(zones, categories) !== null) {
      // @ts-ignore
      this.optimisationService.getClientsByZones(zones, categories)
        .subscribe(data => {
          console.log(data);
          this.dataSource.data = data;
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort; }, 100);
        } , error => {console.log(error); this.dataSource.data = []; });
    }
    else{
      this.dataSource.data = [];
      setTimeout(
        () => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; }, 100);
    }
    //this.dataSource = new MatTableDataSource(this.optimisationService.clients) ;
    //   setTimeout(
    //     () => {
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort; }, 10);
    // console.log(zones.value);





    // if (zones.length > 0){
    //   let clients = this.optimisationService.clients;
    //   // @ts-ignore
    //   clients = clients.filter(client1 => this.verifier(zones, client1.zone));
    //   this.dataSource = new MatTableDataSource(clients) ;
    //   setTimeout(
    //     () => {
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort; }, 10);
    // }
    // else {
    //   this.dataSource = new MatTableDataSource(this.optimisationService.clients) ;
    //   setTimeout(
    //     () => {
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort; }, 10);
    // }
  }
  verifier(zones: any, clientZone: any): any{
    if (zones.indexOf(clientZone) !== -1) {
      return true;
    }
    else {return false; }
  }
  VilleGetPrefects(Ville: any): any{
    this.toppingsCat = new FormControl();
    this.toppingsPrefect = new FormControl();
    this.toppingsZone = new FormControl();
    // @ts-ignore
    this.prefecture = this.optimisationService.prefecture.filter(prefect => prefect.ville === Ville);
  }
  VilleGetPrefectsList(Ville: any): any{
    this.toppingsCat = new FormControl();
    this.toppingsPrefect = new FormControl();
    this.toppingsZone = new FormControl();
    // @ts-ignore
    this.prefecture = this.optimisationService.prefecture.filter(prefect => Ville.includes(prefect.ville));
    this.PrefectGetZonesList(this.toppingsPrefect.value);
  }
  PrefectGetZones(Prefect: any): any{
    this.toppingsCat = new FormControl();
    this.toppingsZone = new FormControl();
    // @ts-ignore
    this.zones = this.optimisationService.zones.filter(zone => zone.prefect === Prefect);
  }
  PrefectGetZonesList(Prefect: any): any{
    this.toppingsCat = new FormControl();
    this.toppingsZone = new FormControl();
    if (this.toppingsPrefect.value !== null) {
      // @ts-ignore
      this.zones = this.optimisationService.zones.filter(zone => Prefect.includes(zone.prefect));
    }
    else {
      this.zones = null;
    }
  }
  Zones(a: any, b: any, c: any): any {

  }
  test(){
    // @ts-ignore
    this.toppingsPrefect = new FormControl();
    this.toppingsZone = new FormControl();
  }
  getClientVillePrefectZones(Ville: any, Prefect: any, Zones: any, Categories: any): any {
     if ( Ville !== null && (Prefect === null)){
      this.statuss = false;
      this.optimisationService.ClientsByVille(Ville, Categories)
        .subscribe(data => {
          // this.optimisationService.clients = data;
          this.dataSource.data = data;
          console.log(data);
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              }, 500);
        } , error => {console.log(error); this.dataSource.data = []; });

    }
     if ( Prefect !== null && Zones !== null  && Zones.length > 0){
        this.statuss = false;
        this.optimisationService.ClientsByVilleAndPrefectureAndZone(Ville, Prefect, Zones, Categories)
         .subscribe(data => {
           this.optimisationService.clients = data;
           this.dataSource.data = data;
           setTimeout(
             () => {
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort; }, 500);
         } , error => {console.log(error); this.dataSource.data = []; });
     }
     if (Prefect !== null && (Zones === null  || Zones.length === 0 )){

       this.statuss = false;
       this.optimisationService.ClientsByVilleAndPrefecture(Ville, Prefect, Categories)
         .subscribe(data => {
           this.optimisationService.clients = data;
           this.dataSource.data = data;
           setTimeout(
             () => {
               this.dataSource.paginator = this.paginator;
               this.dataSource.sort = this.sort; }, 500);
         } , error => {console.log(error); this.dataSource.data = []; });
     }
  }
  getClientVillePrefectZonesList(Ville: any, Prefect: any, Zones: any, Categories: any): any{
      this.optimisationService.getClientVillePrefectZonesListv2(Ville, Prefect, Zones, Categories)
        ?.subscribe(data => {
          this.statuss = false;
          // this.optimisationService.clients = data;
          this.dataSource.data = data;
          console.log(data);
          setTimeout(
            () => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 500);
        } , error => {console.log(error); this.dataSource.data = []; });
  }

  FiltrerParCategorie(Categories: any): any{
    // @ts-ignore
    this.dataSource.data = this.optimisationService.clients.filter(client => Categories.includes(client.categorie_client));
    setTimeout(
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; }, 500);
  }

  onSubmitt(f: NgForm): any {
    // @ts-ignore
    this.optimisationService.enregistrerVisites(f.value.idCommercial, f.value.date, this.dataSource.filteredData);
    console.log(f);
    console.log(f.value);
    console.log(this.dataSource);
  }
}
