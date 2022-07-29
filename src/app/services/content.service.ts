import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  apiBase: string = 'https://test-api.storexweb.com/api/';

  getAllMovies() {
    const action = 'movies';
    return this.http.get<any>(this.apiBase + action)
  }    

  getMoviesByCategory(category_id: any) {
    const action = 'moviesByCategory/'
    return this.http.get<any>(this.apiBase + action + category_id)
  } 

  addMovie(newMovie: Movie) {
    const action = 'movies/';
    return this.http.post<any>(this.apiBase + action, newMovie)
  }

  updateMovie(newMovie: Movie) {
    const action = 'movies/';
    return this.http.post<any>(this.apiBase + action, newMovie)
  }

  deleteMovie(category_id:string,  method: any) {
    const action = 'movies/';
    return this.http.post<any>(this.apiBase + action, {category_id, method})
  }

  getCategories() {
    const action = 'categories';
    return this.http.get<any>(this.apiBase + action)
  }

}
