import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Category, Movie } from 'src/app/models/content.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';
import { AddEditMovieComponent } from '../add-edit-movie/add-edit-movie.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public categories: Category[] = [];
  public availableCategories: any = [];
  public loader: boolean = true;
  public subscriptions: Subscription[] = [];

  constructor(
    private contentService: ContentService, private modalService: NgbModal, private authService: AuthService) { }

  ngOnInit() {
    this.getAllMovies();
  }

  private getAllMovies() {
    this.subscriptions.push(
      this.contentService.getAllMovies().subscribe(res => {
        this.movies = res.message;
        this.getAllCategories();
      }
      ))
  }

  private getAllCategories() {
    this.subscriptions.push(
      this.contentService.getCategories().subscribe(res => {
        this.categories = res.message;
        this.getAvaiableCategories()
      }))
  }

  public getCategoryById(movieCategoryId: string) {
    return this.categories.find(category => category.id === movieCategoryId);
  }

  private getAvaiableCategories() {
    this.availableCategories = []
    this.movies.forEach(movie => {
      this.availableCategories.push(this.getCategoryById(movie.category_id));
      console.log(this.availableCategories);

    })
  }

  public filtertMoviesByCategory(categoryId: string) {
    return this.movies.filter(movie => movie.category_id === categoryId);
  }

  public openAddEditModal(isEdit: boolean) {
    const modal: NgbModalRef = this.modalService.open(AddEditMovieComponent, { ariaLabelledBy: 'modal-basic-title' })
    modal.result.then(() => {
    }, (reason) => {
      if (reason === 'saved') {
        this.getAllMovies()
      }
    });
    modal.componentInstance.isEdit = isEdit;
  }
  
  public onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
