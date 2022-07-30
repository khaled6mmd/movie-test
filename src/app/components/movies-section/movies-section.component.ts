import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.css']
})
export class MoviesSectionComponent implements OnInit {

  @Input() movies: Movie[] = [];
  @Output() onMovieSaved: EventEmitter<any> = new EventEmitter();
  categorys: any;

  constructor(private modalService: NgbModal, private contentService: ContentService) { }

  ngOnInit(): void {
  }

  openAddEditModal(isEdit: boolean, movie?: Movie) {
    const modal: NgbModalRef = this.modalService.open(AddEditMovieComponent, { ariaLabelledBy: 'modal-basic-title' })
    modal.result.then((result) => {
    }, (reason) => {
      if (reason === 'saved') {
        this.onMovieSaved.emit();
      }
    });
    modal.componentInstance.isEdit = isEdit;
    if (isEdit) {
      modal.componentInstance.movie = movie;
    }
  }

  getAllCategorys() {
    this.contentService.getCategories().subscribe(res => {
      this.categorys = res.message;
    })

  deleteMovie(movieId: number) {
    this.contentService.deleteMovie(movieId).subscribe(res => {
      this.onMovieSaved.emit();
    })
  }
}