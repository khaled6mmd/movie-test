import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category, Movie } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.css']
})
export class MoviesSectionComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Input()category!: Category;
  @Output() onMovieSaved: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal, private contentService: ContentService) { }

  ngOnInit(): void {
  }

  openAddEditModal(isEdit: boolean, movie: Movie) {
    const modal: NgbModalRef = this.modalService.open(AddEditMovieComponent, { ariaLabelledBy: 'modal-basic-title' })
    modal.result.then(() => {
    }, (reason) => {
      if (reason === 'saved') {
        this.onMovieSaved.emit();
      }
    });
    modal.componentInstance.isEdit = isEdit;
    modal.componentInstance.movie = movie;
  }

  deleteMovie(movieId: number) {
    this.contentService.deleteMovie(movieId).subscribe(res => {
      this.onMovieSaved.emit();
    })
  }
}
