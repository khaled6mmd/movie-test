import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/content.model';
import { ConfirmationDialogService } from 'src/app/services/confirmation-dialog.service.service';
import { ContentService } from 'src/app/services/content.service';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@Component({
  selector: 'app-movies-section',
  templateUrl: './movies-section.component.html',
  styleUrls: ['./movies-section.component.css']
})
export class MoviesSectionComponent implements OnInit, OnDestroy {

  @Input() movies: Movie[] = [];
  @Input() categoryName: string | undefined ;
  @Output() onMovieSaved: EventEmitter<any> = new EventEmitter();
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private contentService: ContentService, private confirmationDialogService: ConfirmationDialogService) { }

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

  public openDeleteConfirmationDialog(movieId: number) {
    this.confirmationDialogService.confirm('Please confirm', 'Are you sure!')
      .then((confirmed) => {
        if (confirmed) {
          this.deleteMovie(movieId)
        }
      })
      .catch(() => { });
  }

  truncateString(string: string, number: number) {
    return (string.length > number) ? string.substr(0, number-1) + '...' : string;
  };

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
