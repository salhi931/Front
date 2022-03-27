import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GestionDesArticlesService implements OnInit{
  articles: any;
  // tslint:disable-next-line:variable-name
  article_consulter: any;
  // @ts-ignore
  selectedFileList: File[] = [];
  // @ts-ignore
  selectedFileListConsulte: any[];
  // @ts-ignore
  nouveauSelectedfile: File[] = [];
  // @ts-ignore
  imagesSupprimer: any[] = [];
  famille: any;
  SousFamille: any;

  constructor( private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    //this.getarticles();
  }
  getarticles(): Observable<any>{
    return this.http
                .get(environment.HTTP + 'Articles');
  }
  // tslint:disable-next-line:variable-name
  modifier(f: NgForm, nouveauSelectedfile: any, imagesSupprimer: any[]): any{
    const id_article = this.article_consulter.id_article;
    console.log(id_article);
    this.http.patch(environment.HTTP + 'articleses/' + id_article, f.value)
      .subscribe(() => {
        for (const image of nouveauSelectedfile){
          const uploadImageData = new FormData();
          // @ts-ignore
          uploadImageData.append('imageFile', image, id_article);
           this.http.post(environment.HTTP + 'image/upload', uploadImageData, { observe: 'response' })
            .subscribe((response) => {}
            );
        }
        /*****************************************************************************************************************************/
        for (const image of imagesSupprimer){
           // @ts-ignore
          this.http.delete(environment.HTTP + 'imageModelArticles/' + image)
            .subscribe(() => {});
        }
      });
  }
  AjouterArticle(f: NgForm,  selectedFileList: any): any{
    console.log(f.value);
    this.http
      .post(environment.HTTP + 'ArticlesPost', f.value)
      .subscribe(data => {
        for (const image of selectedFileList){
            const uploadImageData = new FormData();
            // @ts-ignore
            uploadImageData.append('imageFile', image, data);
            this.http.post(environment.HTTP + 'image/upload', uploadImageData, { observe: 'response' })
              .subscribe((response) => {
                  if (response.status === 200) {
                    alert('Image uploaded successfully');
                  } else {
                    alert('Image not uploaded successfully');
                  }
                }
              );
        }
        alert('vous avez ajouter un article avec succes');
        this.router.navigate(['/articles'], {relativeTo: this.route});
      }, error => {
        alert('un erreur s\'est produit');
      });
  }
  Modifierarticle(f: NgForm, id: number): any {
    this.http
      .put(environment.HTTP + 'articleses/' + id, f.value)
      .subscribe(data => {
        alert('la modification est bien faite');
      }, error => {
        alert(error);
      });
  }
  ConsulterModifier(id: number): Observable<any>{
    return this.http
      .get(environment.HTTP + 'Articles/' + id);
  }
  SupprimerArticle(id: number): any{
    this.http
      .delete(environment.HTTP + 'articleses/' + id)
      .subscribe(() => {
        alert('suppression reussite');
      }, error => {
        alert(error.error.message);
      });
  }
  getImage(id: number): Observable<any>{
    // Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get(environment.HTTP + 'image/get/' + id);
  }

  getFamilleReturn(): Observable<any>{
    return this.http
      .get(environment.HTTP + 'getFamille');
  }
  getFamille(): any{
     this.http
      .get(environment.HTTP + 'getFamille')
       .subscribe(data => {
         this.famille = data;
       }, error => {console.log(error.message); });
  }
  getSousFamille(): any{
     this.http
      .get(environment.HTTP + 'getSousFamille')
       .subscribe(data => {
         this.SousFamille = data;
         console.log(this.SousFamille);
       }, error => {console.log(error.message); });
  }



}
