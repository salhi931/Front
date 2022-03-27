import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Web/login/login.component';
import {GestionDesAdminsComponent} from './Web/gestion-des-admins/gestion-des-admins.component';
import {ClientComponent} from './Web/clients/client.component';
import {AjouterClientComponent} from './Web/clients/ajouter-client/ajouter-client.component';
import {EditionConsultationComponent} from './Web/clients/edition-consultation/edition-consultation.component';
import {ClientsNonValidesComponent} from './Web/clients/clients-non-valides/clients-non-valides.component';
import {CommerciauxComponent} from './Web/commerciaux/commerciaux.component';
import {CommandesComponent} from './Web/commandes/commandes.component';
import {AjouterCommercialComponent} from './Web/commerciaux/ajouter-commercial/ajouter-commercial.component';
import {EditionCommerciauxComponent} from './Web/commerciaux/edition-commerciaux/edition-commerciaux.component';
import {ObjectifComponent} from './Web/commerciaux/objectif/objectif.component';
import {GestionDesArticlesService} from "./services/gestion-des-articles.service";
import {AjouterArticleComponent} from "./Web/articles/ajouter-article/ajouter-article.component";
import {ArticlesComponent} from "./Web/articles/articles.component";
import {EditArticleComponent} from "./Web/articles/edit-article/edit-article.component";
import {GestionDesPrixComponent} from "./Web/gestion-des-prix/gestion-des-prix.component";
import {AjouterUnTableDePrixComponent} from "./Web/gestion-des-prix/ajouter-un-table-de-prix/ajouter-un-table-de-prix.component";
import {FacturesComponent} from "./Web/factures/factures.component";
import {LancerUneCommandeComponent} from "./Web/commandes/lancer-une-commande/lancer-une-commande.component";
import {AffectationPrixClientsComponent} from "./Web/gestion-des-prix/affectation-prix-clients/affectation-prix-clients.component";
import {EditionConsultationCommandeComponent} from "./Web/commandes/edition-consultation-commande/edition-consultation-commande.component";
import {CreationFactureComponent} from "./Web/factures/creation-facture/creation-facture.component";
import {ConsultationFactureComponent} from "./Web/factures/consultation-facture/consultation-facture.component";
import {RetoursComponent} from "./Web/retours/retours.component";
import {LancerRetoursComponent} from "./Web/retours/lancer-retours/lancer-retours.component";
import {ConsultationRetoursComponent} from "./Web/retours/consultation-retours/consultation-retours.component";
import {PaiementComponent} from "./Web/paiement/paiement.component";
import {ConsultationPaiementComponent} from "./Web/paiement/consultation-paiement/consultation-paiement.component";
import {LancerUnPaiementComponent} from "./Web/paiement/lancer-un-paiement/lancer-un-paiement.component";
import {StockComponent} from "./Web/stock/stock.component";
import {OptimisationDesVisitesComponent} from "./Web/optimisation-des-visites/optimisation-des-visites.component";
import {AlgorithmeDeSelectionComponent} from "./Web/optimisation-des-visites/algorithme-de-selection/algorithme-de-selection.component";
import {AffectationManuelleComponent} from "./Web/optimisation-des-visites/affectation-manuelle/affectation-manuelle.component";
import {DialogArticleComponent} from "./Web/articles/dialog-ajouter-article/dialog-article.component";
import {GestionDesPromotionComponent} from "./Web/gestion-des-promotion/gestion-des-promotion.component";
import {LancerUnePromotionComponent} from "./Web/gestion-des-promotion/lancer-une-promotion/lancer-une-promotion.component";
import {ConsultationModificationUnePromotionComponent} from "./Web/gestion-des-promotion/consultation-modification-une-promotion/consultation-modification-une-promotion.component";
import {ReportingComponent} from "./Web/reporting/reporting.component";
import {ArticlesReportingComponent} from './Web/reporting/articles-reporting/articles-reporting.component';
import {SuivieDesCommerciauxComponent} from './Web/suivie-des-commerciaux/suivie-des-commerciaux.component';
import {TestComponent} from './Web/test/test.component';
import {ConfigurationService} from './services/configuration.service';
import {ConfigurationComponent} from './Web/configuration/configuration.component';
import {ClientsReportingComponent} from "./Web/reporting/clients-reporting/clients-reporting.component";
import {CommerciauxReportingComponent} from "./Web/reporting/commerciaux-reporting/commerciaux-reporting.component";
import {ZonesComponent} from "./Web/reporting/zones-reporting/zones.component";
import {AppComponent} from "./app.component";
import {HistoriqueDesCommerciauxComponent} from "./Web/historique-des-commerciaux/historique-des-commerciaux.component";
import {LivraisonsComponent} from "./Web/livraisons/livraisons.component";
import {GestionDesColisComponent} from "./Web/gestion-des-colis/gestion-des-colis.component";
import {TransfertDeStockComponent} from "./Web/transfert-de-stock/transfert-de-stock.component";
import {ValidationTransfertStockComponent} from "./Web/transfert-de-stock/validation-transfert-stock/validation-transfert-stock.component";
import {FeedbackClientComponent} from "./Web/feedback-client/feedback-client.component";

const routes: Routes = [
  { path: '*', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'gestion-des-admins', component: GestionDesAdminsComponent},
  { path: 'gestion-des-clients', component: ClientComponent},
  { path: 'Ajouter-clients', component: AjouterClientComponent},
  { path: 'Edition-consultation-client', component: EditionConsultationComponent},
  { path: 'clients-non-valides', component: ClientsNonValidesComponent},
  { path: 'commerciaux', component: CommerciauxComponent},
  { path: 'commerciaux-ajout', component: AjouterCommercialComponent},
  { path: 'commerciaux-edition', component: EditionCommerciauxComponent},
  { path: 'commerciaux-objectif', component: ObjectifComponent},
  { path: 'commandes', component: CommandesComponent},
  { path: 'lancer-une-commande', component: LancerUneCommandeComponent},
  { path: 'edition-consultation-commande', component: EditionConsultationCommandeComponent},
  { path: 'articles', component: ArticlesComponent},
  { path: 'articles-ajout', component: AjouterArticleComponent},
  { path: 'articles-edit', component: EditArticleComponent},
  { path: 'articles-dialog', component: DialogArticleComponent},
  { path: 'promotion', component: GestionDesPromotionComponent},
  { path: 'lancer-promotion', component: LancerUnePromotionComponent},
  { path: 'consultation-promotion', component: ConsultationModificationUnePromotionComponent},
  { path: 'gestion-des-prix', component: GestionDesPrixComponent},
  { path: 'table-de-de-prix-ajout', component: AjouterUnTableDePrixComponent},
  { path: 'affectation-prix-client', component: AffectationPrixClientsComponent},
  { path: 'factures', component: FacturesComponent},
  { path: 'livraisons', component: LivraisonsComponent},
  { path: 'Gestion des colis', component: GestionDesColisComponent},
  { path: 'creer-une-facture', component: CreationFactureComponent},
  { path: 'consultation-facture', component: ConsultationFactureComponent},
  { path: 'retours', component: RetoursComponent},
  { path: 'lancer-un-retours', component: LancerRetoursComponent},
  { path: 'consultation-retours', component: ConsultationRetoursComponent},
  { path: 'paiement', component: PaiementComponent},
  { path: 'lancer-un-paiement', component: LancerUnPaiementComponent},
  { path: 'consultation-paiement', component: ConsultationPaiementComponent},
  { path: 'stock', component: StockComponent},
  { path: 'transfert', component: TransfertDeStockComponent},
  { path: 'transfert-validation', component: ValidationTransfertStockComponent},
  { path: 'optimisation', component: OptimisationDesVisitesComponent},
  { path: 'algorithme-de-selection', component: AlgorithmeDeSelectionComponent},
  { path: 'affectation-manuelle', component: AffectationManuelleComponent},
  { path: 'reporting', component: ReportingComponent},
  { path: 'reporting-articles', component: ArticlesReportingComponent},
  { path: 'reporting-clients', component: ClientsReportingComponent},
  { path: 'reporting-commerciaux', component: CommerciauxReportingComponent},
  { path: 'reporting-zones-reporting', component: ZonesComponent},
  { path: 'suivie', component: SuivieDesCommerciauxComponent},
  { path: 'historique', component: HistoriqueDesCommerciauxComponent},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'Transfert-de-stcok', component: TransfertDeStockComponent},
  { path: 'test', component: TestComponent},
  { path: 'feedback', component: FeedbackClientComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
