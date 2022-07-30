import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category, Movie } from 'src/app/models/content.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];
  categories: Category[] = [];
  availableCategories: any = [];
  loader: boolean = true;

  constructor(
    private contentService: ContentService, private modalService : NgbModal, private authService: AuthService) { }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.contentService.getAllMovies().subscribe(res => {
      this.movies = res.message;
      this.getAllCategories();
    }
    )
  }

  getAllCategories() {
    this.contentService.getCategories().subscribe(res => {
      this.categories = res.message;
      this.getAvaiableCategories()
    })
  }

  getCategoryById(movieCategoryId: string) {
    return this.categories.find(category => category.id === movieCategoryId);
  }

  getAvaiableCategories() {
    this.availableCategories = []
    this.movies.forEach(movie => {
      this.availableCategories.push(this.getCategoryById(movie.category_id));
      console.log(this.availableCategories);

    })    
  }

  filtertMoviesByCategory(categoryId: string) {
    return this.movies.filter(movie => movie.category_id === categoryId);
  }

  openAddEditModal(isEdit: boolean) {
    const modal: NgbModalRef = this.modalService.open(AddEditMovieComponent, { ariaLabelledBy: 'modal-basic-title' })
    modal.result.then(() => {
    }, (reason) => {
      if (reason === 'saved') {
        this.getAllMovies()
      }
    });
    modal.componentInstance.isEdit = isEdit;
  }
  onLogOut() {
    this.authService.logOut();
  }
}
