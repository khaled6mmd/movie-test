import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './components/registration/log-in/log-in.component';
import { SignUpComponent } from './components/registration/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MoviesSectionComponent } from './components/movies-section/movies-section.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    HomeComponent,
    MoviesSectionComponent,
    AddEditMovieComponent,
    CategoriesComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccordionModule,
    CarouselModule,
    SidebarModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ AuthService , 
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
