import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category, Movie } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.css']
})
export class MoviesSectionComponent implements OnInit, OnDestroy {

  @Input() movies: Movie[] = [];
  @Input()category!: Category;
  @Output() onMovieSaved: EventEmitter<any> = new EventEmitter();
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private contentService: ContentService) { }

  ngOnInit(): void {
  }

  public openAddEditModal(isEdit: boolean, movie: Movie) {
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

  public deleteMovie(movieId: number) {
    this.subscriptions.push(
    this.contentService.deleteMovie(movieId).subscribe(res => {
      this.onMovieSaved.emit();
    }))
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
