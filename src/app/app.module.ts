import { NgModule } from '@angular/core';
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
import { SliderComponent } from './components/slider/slider.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MoviesSectionComponent } from './components/movies-section/movies-section.component';
@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    HomeComponent,
    SliderComponent,
    MoviesSectionComponent
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
    SidebarModule
  ],
  providers: [ AuthService , 
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptor,
     multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
