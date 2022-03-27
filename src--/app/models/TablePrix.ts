export class TablePrix{
  public  id_prix: number;
  public id_article: number;
  public code_article: number;
  public nom_article: string;
  public prix: number;
  // tslint:disable-next-line:variable-name
  constructor(id_prix: number, id_article: number, code_article: number, nom_article: string, prix: number) {

    this.id_prix = id_prix;
    this.id_article = id_article;
    this.code_article = code_article;
    this.nom_article = nom_article;
    this.prix = prix;
  }
}
