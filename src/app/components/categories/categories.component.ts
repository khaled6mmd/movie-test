import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Category, Movie } from 'src/app/models/content.model';
import { AuthService } from 'src/app/services/auth.service';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public movies: Movie[] = [];
  public categories: Category[] = [];
  public selectedCategoryID: string;
  public isCategorySelected: boolean = false;
  public subscriptions: Subscription[] = [];
  public loader: boolean = true;

  constructor(private contentService: ContentService, private spinner: NgxSpinnerService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories() {
    this.subscriptions.push(
      this.contentService.getCategories().subscribe({
        next : res => {
          this.categories = res.message;
        },
        error: err => {
          if (err.status === 401) {
            this.authService.logOut()
          }
        }
      }))
  }

  public getMoviesByCategory(categoryId: string) {
    this.spinner.show();
    this.loader= true;
    this.selectedCategoryID = categoryId

    if (categoryId) {
      this.isCategorySelected = !this.isCategorySelected
    }
    this.isCategorySelected = true;
    this.subscriptions.push(
      this.contentService.getMoviesByCategory(categoryId).subscribe(res => {
        this.movies = res.message;
        this.spinner.hide();
        this.loader= false;
      }))
  }

  public getCategoryId(id: string) {
    return this.categories.find(category => category.id == id);
  }
}
