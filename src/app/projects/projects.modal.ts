import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ProjectsComponent } from './projects.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EmployeesModule } from '../employees/employees.module';
import { ProjectEmployeesComponent } from './project-employees/project-employees.component';
import { ProjectTechnologiesComponent } from './project-technologies/project-technologies.component';
import { ProjectTitleComponent } from './project-title/project-title.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectModalComponent,
    ProjectEmployeesComponent,
    ProjectTechnologiesComponent,
    ProjectTitleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    EmployeesModule,
  ],
  exports: [
    ProjectsComponent,
    ProjectModalComponent,
    ProjectTechnologiesComponent,
    ProjectTitleComponent,
  ]
})
export class ProjectsModule { }
