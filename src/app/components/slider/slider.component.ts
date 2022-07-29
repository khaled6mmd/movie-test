import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  current = 0;
  // tslint:disable-next-line: variable-name
  movies_data: any;
  // tslint:disable-next-line: variable-name
  tv_shows: any;


  constructor(
    // private movieService: MoviesService,
  ) { }

  ngOnInit() {
    this.getnowPlayingMovies(1);
    this.sliderTimer();
  }

  getnowPlayingMovies(page: number) {
    // this.movieService.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
    //   this.movies_data = res.results;
    // });
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies_data.length;
    }, 5000);
  }


}
