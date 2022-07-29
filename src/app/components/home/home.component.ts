import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any;
  responsiveOptions;
  loader = true;

  constructor(
    // private movies: MoviesService,
    // private tv: TvService
    private contentService: ContentService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  ngOnInit() {
    // this.trendingMovies(1);
    // this.tvShow(1);
    this.getAllMovies()
  }

  getAllMovies() {
    this.contentService.getAllMovies().subscribe(res => {
      this.movies = res;
    }
    )
  }

  trendingMovies(page: number) {
    // this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
    //   this.nowPlaying = res.results;
    //   this.loader = false;
    // });
  }

  tvShow(page: number) {
    // this.tv.getTvOnTheAir(page).pipe(delay(2000)).subscribe((res: any) => {
    //   this.tvShows = res.results;
    //   this.loader = false;
    // });
  }
}
