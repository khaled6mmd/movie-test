import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getMoviesByCategory(category_id: number) {
    const action = 'moviesByCategory/'
    return this.http.get<any>(this.apiBase + action + category_id)
  } 

  addMovie(newMovie: FormData) {
    const action = 'movies';
    return this.http.post<any>(this.apiBase + action, newMovie)
  }

  updateMovie(movieId:number, newMovie: FormData) {
    const action = 'movies/';
    return this.http.put<any>(this.apiBase + action + movieId, newMovie)
  }

  deleteMovie(id:number) {
    const action = 'movies/';
    return this.http.post<any>(this.apiBase + action + id, {_method:'delete'})
  }

  getCategories() {
    const action = 'category';
    return this.http.get<any>(this.apiBase + action)
  }

}
