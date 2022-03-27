export class Client {
  public id_client: number;
  public nom_client: string;
  public code: string;
  public contact_client: string;
  public adresse_client: string;
  public tele1: string;
  public tele2: string;
  public solde: number;
  public ancien_solde: number;
  public solde_cheque: number;
  public categorie_client: string;
  public localisation: number;
  public zone_client: string;
  public plafond_cheque: number;
  public plafond_effet: number;
  public plafond: number;
  public credit: boolean;
  public delai_paiement: number;
  public taux_de_retours: number;
  public caracteristique1: string;
  public caracteristique2: string;
  public caracteristique3: string;
  public caracteristique4: string;
  public caracteristique5: string;
  public caracteristique6: string;
  public caracteristique7: string;
  public caracteristique8: string;
  public list_prix: number;
  public status: boolean;
  // tslint:disable-next-line:variable-name
  constructor(id_client: number, nom_client: string, code: string, contact_client: string, adresse_client: string, tele1: string, tele2: string, solde: number, ancien_solde: number, solde_cheque: number, categorie_client: string, localisation: number, zone_client: string, plafond_cheque: number, plafond_effet: number, plafond: number, credit: boolean, delai_paiement: number, taux_de_retours: number, caracteristique1: string, caracteristique2: string, caracteristique3: string,caracteristique4: string, caracteristique5: string,caracteristique6: string,caracteristique7: string,caracteristique8: string, list_prix: number, status: boolean) {
    this.id_client = id_client;
    this.nom_client = nom_client;
    this.code = code;
    this.contact_client = contact_client;
    this.adresse_client = adresse_client;
    this.tele1 = tele1;
    this.tele2 = tele2;
    this.solde = solde;
    this.ancien_solde = ancien_solde;
    this.solde_cheque = solde_cheque;
    this.categorie_client = categorie_client;
    this.localisation = localisation;
    this.zone_client = zone_client;
    this.plafond_cheque = plafond_cheque;
    this.plafond_effet = plafond_effet;
    this.plafond = plafond;
    this.credit = credit;
    this.delai_paiement = delai_paiement;
    this.taux_de_retours = taux_de_retours;
    this.caracteristique1 = caracteristique1;
    this.caracteristique2 = caracteristique2;
    this.caracteristique3 = caracteristique3;
    this.caracteristique4 = caracteristique4;
    this.caracteristique5 = caracteristique5;
    this.caracteristique6 = caracteristique6;
    this.caracteristique7 = caracteristique7;
    this.caracteristique8 = caracteristique8;
    this.list_prix = list_prix;
    this.status = status;

  }
}

