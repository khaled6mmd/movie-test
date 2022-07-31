import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category, Movie } from 'src/app/models/content.model';
import { AuthService } from 'src/app/services/auth.service';
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
  private subscriptions: Subscription[] = [];
  errorMsgs: string[] = [];

  constructor(private activeModal: NgbModal, private contentService: ContentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }
  
  public getErrorMsgs(message: any) {
    this.errorMsgs = [];
    for (let key in message) {
      this.errorMsgs.push(message[key][0]);
    }
  }

  public closeModal() {
    this.activeModal.dismissAll();
  }

  public onFileChanged(event: any) {
    this.image = event.target.files[0];
  }

  public getAllCategories() {
    this.subscriptions.push(
      this.contentService.getCategories().subscribe({
        next: res => {
          this.categories = res.message;
        },
        error: err => {
          if (err.status == 401) {
            this.authService.logOut()
          }
        }
      }))
  }

  public saveMovie(newMovie: Movie) {
    const formData: FormData = new FormData();
    formData.append('name', newMovie.name);
    formData.append('description', newMovie.description);
    formData.append('category_id', newMovie['category_id']);
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }

    if (this.isEdit) {
      this.subscriptions.push(
        this.contentService.updateMovie(this.movie.id, newMovie).subscribe({
          next: res => {
            if (res.status == 'success') {
              this.activeModal.dismissAll('saved');
            } if (res.status == 'failed') {
              this.getErrorMsgs(res.message);
              console.log(this.errorMsgs);
            }
          },
          error: err => {
            if (err.status == 401) {
              this.authService.logOut()
            }
            console.log(err);
          }
        }))
    } else {
      this.subscriptions.push(
        this.contentService.addMovie(formData).subscribe({
          next: res => {
            if (res.status == 'success') {
              this.activeModal.dismissAll('saved');
            } if (res.status == 'failed') {
              this.getErrorMsgs(res.message);
              console.log(this.errorMsgs);
            }
          },
          error: err => {
            if (err.status == 401) {
              this.authService.logOut()
            }
          }
        })
      )
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
