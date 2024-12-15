import { Component } from '@angular/core';
import { EmployeesService } from './employees.service';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProjectsService } from '../projects/projects.service';
import { EmployeeModalComponent } from './employee-modal/employee-modal.component';
import { TechnologiesService } from '../technologies/technologies.service';
import { TechnologiesAssociatedComponent } from './technologies-associated/technologies-associated.component';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

protected employees: { id: number, user_name: string, project?: string, technology: string[] }[] = [];
protected dataSource: MatTableDataSource<any>;
protected displayedColumns: string[] = ['userName', 'project', 'actions', 'technologies']
protected projectList: string[] = [];
protected _technologytList: string[] = []

constructor(
  private _employeeService: EmployeesService,
  private _dialog: MatDialog,
  private _projectsService: ProjectsService,
  private _technologyService: TechnologiesService,
    ) {
  this.dataSource = new MatTableDataSource<any>([]); 
}

async ngOnInit() {
  await this._employeeList();
  await this._projectList();
  await this._tecnologyList();
}

public async deleteEmployee(employeeId: number) {
   const response = await lastValueFrom(this._employeeService.deleteEmployee(employeeId));

   if(response.message == 'Employee deleted successfully!'){
    this._employeeList();
  }
}

public async editEmployee(employee: { id: number, user_name: string, project: string }) {
  const dialogRef = this._dialog.open(EmployeeModalComponent, {
    width: '500px',
    data: { employee: employee, projectList: this.projectList, technologyList: this._technologytList },
    panelClass: 'modal-container'
  });

  try {
    const result = await lastValueFrom(dialogRef.afterClosed());
    if (!result) return;

    const updatedFields = {
      user_name: result.user_name,
      project: result.project,
      technology: result.technologies
    };

    const response = await lastValueFrom(this._employeeService.updateEmployee(result.id, updatedFields));
    if (response) {
      await this._employeeList();
    }
  } catch (error) {
    this._handleError(error);
  }
}

  public async createEmployee() {
    const dialogRef = this._dialog.open(EmployeeModalComponent, {
      width: '500px',
      data: { projectList: this.projectList, technologyList: this._technologytList },
      panelClass: 'modal-container'
    });
  
    try {
      const result = await lastValueFrom(dialogRef.afterClosed());
      if (!result) {
        return; 
      }
      const response = await lastValueFrom(this._employeeService.createEmployee(result));
      
      if (response) {
        await this._employeeList(); 
      }
    } catch (error) {
      this._handleError(error);
    }
  }

  protected _openAssociatedTechnologiesModal(technologies: any) {
    const dialogRef = this._dialog.open(TechnologiesAssociatedComponent, {
      width: '500px',
      data: { technologies: technologies },
      panelClass: 'modal-container',
    });
  }

  private async _projectList() {
    const projects: any = await lastValueFrom(this._projectsService.listProjects());
    if (projects) {
      this.projectList = projects.map((project: any) => project.title);
    }
}

  private async _tecnologyList() {
    const tecnologies: any = await lastValueFrom(this._technologyService.listTechnologies());

    if (tecnologies) {
      this._technologytList = tecnologies.map((tecnology: any) => tecnology.name);
    }
  }

  private async _employeeList() {
    const employees: any = await lastValueFrom(this._employeeService.listEmployee());

    if(!employees) {
      return
    }

    this.employees = employees.map((employee: any) => ({
      id: employee.id,
      user_name: employee.user_name,
      project: employee.title ? employee.title : 'N/A',
      technologies: employee.technologies
    }));  

    this.dataSource.data = this.employees;
  }

  private _handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      const errorMessage = error.error?.error || 'An error occurred';
      this._dialog.open(DialogComponent, {
        data: { message: errorMessage }
      });
    }
  }
}

