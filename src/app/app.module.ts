import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeesModule } from './employees/employees.module';
import { ProjectsModule } from './projects/projects.modal';
import { TechnologiesModule } from './technologies/technologies.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { LoginModule } from './login/login.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent,
  ],
  imports: [
    ProjectsModule,
    EmployeesModule,
    TechnologiesModule,
    LoginModule,
    BrowserModule,
    AppRoutingModule,
    MatCheckboxModule,
    HttpClientModule,
    FormsModule
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
