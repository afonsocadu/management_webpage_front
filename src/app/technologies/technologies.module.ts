import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TechnologiesComponent } from './technologies.component';
import { TechnologyModalComponent } from './technology-modal/technology-modal.component';

@NgModule({
  declarations: [
    TechnologiesComponent,
    TechnologyModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    TechnologiesComponent,
    TechnologyModalComponent
  ]
})
export class TechnologiesModule { }
