import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  loader: boolean = true;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.getAllMovies()
  }

  getAllMovies() {
    this.contentService.getAllMovies().subscribe(res => {
      this.movies = res.message;
    }
    )
  }
}
