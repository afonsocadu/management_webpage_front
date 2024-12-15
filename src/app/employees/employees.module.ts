import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EmployeesComponent } from './employees.component';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TechnologiesAssociatedComponent } from './technologies-associated/technologies-associated.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeModalComponent,
    TechnologiesAssociatedComponent
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
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  exports: [
    EmployeesComponent,
    EmployeeModalComponent,
    TechnologiesAssociatedComponent
  ]
})
export class EmployeesModule { }
