import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/content.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  apiBase: string = 'https://test-api.storexweb.com/api/';

  public getAllMovies(): Observable<any>  {
    const action = 'movies';
    return this.http.get<any>(this.apiBase + action)
  }    

  public getMoviesByCategory(category_id: string): Observable<any>  {
    const action = 'moviesByCategory/'
    return this.http.get<any>(this.apiBase + action + category_id)
  } 

  public addMovie(newMovie: FormData): Observable<any>  {
    const action = 'movies';
    return this.http.post<any>(this.apiBase + action, newMovie)
  }

  public updateMovie(movieId:number, newMovie: Movie): Observable<any>  {
    const action = 'movies/';
    return this.http.put<any>(this.apiBase + action + movieId, newMovie)
  }

  public deleteMovie(id:number): Observable<any>  {
    const action = 'movies/';
    return this.http.post<any>(this.apiBase + action + id, {_method:'delete'})
  }

  public getCategories(): Observable<any> {
    const action = 'category';
    return this.http.get<any>(this.apiBase + action)
  }

}
