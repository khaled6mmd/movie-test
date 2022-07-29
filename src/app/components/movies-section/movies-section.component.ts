import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.css']
})
export class MoviesSectionComponent implements OnInit {

  @Input() movies: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.movies);
    
  }

}
