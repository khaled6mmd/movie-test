import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category, Movie } from 'src/app/models/content.model';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit {
  categories: Category[] = [];
  image!: File;
  @Input() isEdit!: boolean;
  @Input() movie: Movie = new Movie;

  constructor(private activeModal: NgbModal, private contentService: ContentService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  closeModal() {
    this.activeModal.dismissAll();
  }

  onFileChanged(event : any) {
    this.image = event.target.files[0];
  }

  getAllCategories() {
    this.contentService.getCategories().subscribe(res => {
      this.categories = res.message;
    })
  }

  saveMovie(newMovie: Movie) {    
    console.log(newMovie);
    console.log(this.movie);
    
    
    const formData: FormData = new FormData();
    formData.append('name', newMovie.name);
    formData.append('description', newMovie.description);
    formData.append('category_id', newMovie['category_id']);

    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    
    if (this.isEdit) {
      this.contentService.updateMovie(this.movie.id, formData).subscribe(res => {
        this.activeModal.dismissAll('saved');
      })
    } else {
      this.contentService.addMovie(formData).subscribe(res => {
        this.activeModal.dismissAll('saved');
      }
      )
    }
  }
}
