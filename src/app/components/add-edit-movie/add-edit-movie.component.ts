import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category, Movie } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit, OnDestroy {
  public categories: Category[] = [];
  private image!: File;
  @Input() isEdit!: boolean;
  @Input() movie: Movie = new Movie;
  subscriptions: Subscription[] = [];

  constructor(private activeModal: NgbModal, private contentService: ContentService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  public closeModal(): void {
    this.activeModal.dismissAll();
  }

  public onFileChanged(event : any): void {
    this.image = event.target.files[0];
  }

  public getAllCategories(): void {
    this.subscriptions.push(
      this.contentService.getCategories().subscribe(res => {
        this.categories = res.message;
      }))
  }

  public saveMovie(newMovie: Movie): void {    
    const formData: FormData = new FormData();
    formData.append('name', newMovie.name);
    formData.append('description', newMovie.description);
    formData.append('category_id', newMovie['category_id']);

    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    
    if (this.isEdit) {
      this.subscriptions.push(
      this.contentService.updateMovie(this.movie.id, formData).subscribe(res => {
        this.activeModal.dismissAll('saved');
      }))
    } else {
      this.subscriptions.push(
      this.contentService.addMovie(formData).subscribe(res => {
        this.activeModal.dismissAll('saved');
      })
      )
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
