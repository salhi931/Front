import { AgmCoreModule } from '@agm/core';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Web/login/login.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBar, MatProgressBarModule} from '@angular/material/progress-bar';
import { MatInputModule} from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ClientComponent} from './Web/clients/client.component';
import { GestionDesAdminsComponent } from './Web/gestion-des-admins/gestion-des-admins.component';
import { InterceptorService} from './services/interceptor.service';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule} from '@angular/material/divider';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule} from '@angular/material/list';
import { MatBadgeModule} from '@angular/material/badge';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { AjouterClientComponent } from './Web/clients/ajouter-client/ajouter-client.component';
import { EditionConsultationComponent } from './Web/clients/edition-consultation/edition-consultation.component';
import { ClientsNonValidesComponent } from './Web/clients/clients-non-valides/clients-non-valides.component';
import { TestComponent } from './Web/test/test.component';
import {MatCheckbox, MatCheckboxModule} from '@angular/material/checkbox';
import { CommerciauxComponent } from './Web/commerciaux/commerciaux.component';
import { CommandesComponent } from './Web/commandes/commandes.component';
import { NavComponent } from './Web/nav/nav.component';
import { AjouterCommercialComponent } from './Web/commerciaux/ajouter-commercial/ajouter-commercial.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule} from '@angular/material/dialog';
import { EditionCommerciauxComponent } from './Web/commerciaux/edition-commerciaux/edition-commerciaux.component';
import { ObjectifComponent } from './Web/commerciaux/objectif/objectif.component';
import { ArticlesComponent } from './Web/articles/articles.component';
import { AjouterArticleComponent } from './Web/articles/ajouter-article/ajouter-article.component';
import { MatSelectModule} from '@angular/material/select';
import { EditArticleComponent } from './Web/articles/edit-article/edit-article.component';
import { GestionDesPrixComponent } from './Web/gestion-des-prix/gestion-des-prix.component';
import { AjouterUnTableDePrixComponent } from './Web/gestion-des-prix/ajouter-un-table-de-prix/ajouter-un-table-de-prix.component';
import { FacturesComponent } from './Web/factures/factures.component';
import { LancerUneCommandeComponent } from './Web/commandes/lancer-une-commande/lancer-une-commande.component';
import { AffectationPrixClientsComponent } from './Web/gestion-des-prix/affectation-prix-clients/affectation-prix-clients.component';
import { DialogClientComponent } from './Web/commandes/dialog-client/dialog-client.component'
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatGridListModule} from '@angular/material/grid-list';

// tslint:disable-next-line:max-line-length
import { EditionConsultationCommandeComponent } from './Web/commandes/edition-consultation-commande/edition-consultation-commande.component';
import { CreationFactureComponent } from './Web/factures/creation-facture/creation-facture.component';
import { DialogFactureComponent } from './Web/factures/dialog-facture/dialog-facture.component';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { ConsultationFactureComponent } from './Web/factures/consultation-facture/consultation-facture.component';
import { RetoursComponent } from './Web/retours/retours.component';
import { LancerRetoursComponent } from './Web/retours/lancer-retours/lancer-retours.component';
import { ConsultationRetoursComponent } from './Web/retours/consultation-retours/consultation-retours.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { DialogRetourComponent } from './Web/retours/dialog-retour/dialog-retour.component';
import { PaiementComponent } from './Web/paiement/paiement.component';
import { ConsultationPaiementComponent } from './Web/paiement/consultation-paiement/consultation-paiement.component';
import { LancerUnPaiementComponent } from './Web/paiement/lancer-un-paiement/lancer-un-paiement.component';
import { DialogPaiementComponent } from './Web/paiement/dialog-paiement/dialog-paiement.component';
import { StockComponent } from './Web/stock/stock.component';
import { DialogStockComponent } from './Web/stock/dialog-stock/dialog-stock.component';
import { OptimisationDesVisitesComponent } from './Web/optimisation-des-visites/optimisation-des-visites.component';
import { AlgorithmeDeSelectionComponent } from './Web/optimisation-des-visites/algorithme-de-selection/algorithme-de-selection.component';
import { AffectationManuelleComponent } from './Web/optimisation-des-visites/affectation-manuelle/affectation-manuelle.component';
import {environment} from '../environments/environment';
import { DialogMapComponent } from './Web/optimisation-des-visites/dialog-map/dialog-map.component';
import { DialogArticleComponent } from './Web/articles/dialog-ajouter-article/dialog-article.component';
import { DialogArticleConsulteComponent } from './Web/articles/dialog-article-consulte/dialog-article-consulte.component';
import { DialogPositionComponent } from './Web/clients/dialog-position/dialog-position.component';
import { DialogFamilleComponent } from './Web/articles/dialog-famille/dialog-famille.component';
import { DialogSousFamilleComponent } from './Web/articles/dialog-sous-famille/dialog-sous-famille.component';
import { DialogFamilleAjouterComponent } from './Web/articles/dialog-famille/dialog-famille-ajouter/dialog-famille-ajouter.component';
import { DialogSousFamilleAjouterComponent } from './Web/articles/dialog-sous-famille/dialog-sous-famille-ajouter/dialog-sous-famille-ajouter.component';
import { GestionDesPromotionComponent} from './Web/gestion-des-promotion/gestion-des-promotion.component';
import {LancerUnePromotionComponent} from './Web/gestion-des-promotion/lancer-une-promotion/lancer-une-promotion.component';
import {ConsultationModificationUnePromotionComponent} from "./Web/gestion-des-promotion/consultation-modification-une-promotion/consultation-modification-une-promotion.component";
import { ReportingComponent } from './Web/reporting/reporting.component';
import { ChartsModule } from 'ng2-charts';
import { ZonesComponent } from './Web/reporting/zones-reporting/zones.component';
import { ArticlesReportingComponent } from './Web/reporting/articles-reporting/articles-reporting.component';
import {SuivieDesCommerciauxComponent} from './Web/suivie-des-commerciaux/suivie-des-commerciaux.component';
import {DatePipe} from '@angular/common';
import { ConfigurationComponent } from './Web/configuration/configuration.component';
import { ClientsReportingComponent } from './Web/reporting/clients-reporting/clients-reporting.component';
import { CommerciauxReportingComponent } from './Web/reporting/commerciaux-reporting/commerciaux-reporting.component';
import { HistoriqueDesCommerciauxComponent } from './Web/historique-des-commerciaux/historique-des-commerciaux.component';
// @ts-ignore
import { DialogHistoriqueComponent } from './Web/Historique-des-commerciaux/dialog-historique/dialog-historique.component';
import { DialogImagesComponent } from './Web/commandes/dialog-images/dialog-images.component';
import { DialogComponent } from './Web/retours/dialog/dialog.component';
import { DialogQuantiteComponent } from './Web/retours/dialog/dialog-quantite/dialog-quantite.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LivraisonsComponent } from './Web/livraisons/livraisons.component';
import { GestionDesColisComponent } from './Web/gestion-des-colis/gestion-des-colis.component';
import { DialogColisComponent } from './Web/optimisation-des-visites/dialog-colis/dialog-colis.component';
import { DialogFichierJointeVisitesComponent } from './Web/optimisation-des-visites/dialog-fichier-jointe-visites/dialog-fichier-jointe-visites.component';
import { DialogFeedbackComponent } from './Web/clients/dialog-feedback/dialog-feedback.component';
import { TransfertDeStockComponent } from './Web/transfert-de-stock/transfert-de-stock.component';
import { ValidationTransfertStockComponent } from './Web/transfert-de-stock/validation-transfert-stock/validation-transfert-stock.component';
import { PieceJOintfactureComponent } from './Web/factures/piece-jointfacture/piece-jointfacture.component';
import { DialogConsultationComponent } from './Web/factures/dialog-consultation/dialog-consultation.component';
import { DialogConsultationPaiementComponent } from './Web/paiement/dialog-consultation-paiement/dialog-consultation-paiement.component';
import { DialogConsultationCommandeComponent } from './Web/commandes/dialog-consultation-commande/dialog-consultation-commande.component';
import { FeedbackClientComponent } from './Web/feedback-client/feedback-client.component';

@NgModule({
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    GestionDesAdminsComponent,
    AjouterClientComponent,
    EditionConsultationComponent,
    ClientsNonValidesComponent,
    TestComponent,
    CommerciauxComponent,
    CommandesComponent,
    NavComponent,
    AjouterCommercialComponent,
    EditionCommerciauxComponent,
    ObjectifComponent,
    ArticlesComponent,
    AjouterArticleComponent,
    EditArticleComponent,
    GestionDesPrixComponent,
    AjouterUnTableDePrixComponent,
    FacturesComponent,
    LancerUneCommandeComponent,
    AffectationPrixClientsComponent,
    DialogClientComponent,
    EditionConsultationCommandeComponent,
    CreationFactureComponent,
    DialogFactureComponent,
    ConsultationFactureComponent,
    RetoursComponent,
    LancerRetoursComponent,
    ConsultationRetoursComponent,
    DialogRetourComponent,
    PaiementComponent,
    ConsultationPaiementComponent,
    LancerUnPaiementComponent,
    DialogPaiementComponent,
    StockComponent,
    DialogStockComponent,
    OptimisationDesVisitesComponent,
    AlgorithmeDeSelectionComponent,
    AffectationManuelleComponent,
    DialogMapComponent,
    DialogArticleComponent,
    DialogArticleConsulteComponent,
    DialogPositionComponent,
    DialogFamilleComponent,
    DialogSousFamilleComponent,
    DialogFamilleAjouterComponent,
    DialogSousFamilleAjouterComponent,
    GestionDesPromotionComponent,
    LancerUnePromotionComponent,
    ConsultationModificationUnePromotionComponent,
    ReportingComponent,
    ZonesComponent,
    ArticlesReportingComponent,
    SuivieDesCommerciauxComponent,
    ConfigurationComponent,
    ClientsReportingComponent,
    CommerciauxReportingComponent,
    HistoriqueDesCommerciauxComponent,
    DialogHistoriqueComponent,
    DialogImagesComponent,
    DialogComponent,
    DialogQuantiteComponent,
    LivraisonsComponent,
    GestionDesColisComponent,
    DialogColisComponent,
    DialogFichierJointeVisitesComponent,
    DialogFeedbackComponent,
    TransfertDeStockComponent,
    ValidationTransfertStockComponent,
    PieceJOintfactureComponent,
    DialogConsultationComponent,
    DialogConsultationPaiementComponent,
    DialogConsultationCommandeComponent,
    FeedbackClientComponent,

  ],
  // tslint:disable-next-line:max-line-length
  entryComponents: [DialogImagesComponent, DialogHistoriqueComponent, DialogSousFamilleAjouterComponent, DialogFamilleAjouterComponent, DialogFamilleComponent, DialogConsultationCommandeComponent,
    DialogSousFamilleComponent, DialogPositionComponent, DialogClientComponent, DialogRetourComponent, DialogPaiementComponent, DialogConsultationComponent, DialogConsultationPaiementComponent,
    DialogStockComponent, DialogMapComponent, DialogArticleConsulteComponent, DialogComponent, DialogQuantiteComponent, DialogColisComponent, DialogFichierJointeVisitesComponent, DialogFeedbackComponent, PieceJOintfactureComponent],
  imports: [
    MatGridListModule,
    NgxMaterialTimepickerModule,
    NgbModule,
    ChartsModule,
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    FormsModule,
    MatOptionModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    HttpClientModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: environment.Key
    }),
    MatButtonToggleModule
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
