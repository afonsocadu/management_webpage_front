import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TechnologiesService } from '../technologies/technologies.service';
import { ProjectEmployeesComponent } from './project-employees/project-employees.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectTechnologiesComponent } from './project-technologies/project-technologies.component';
import { ProjectTitleComponent } from './project-title/project-title.component';
import { projectData } from './projects-types';
import { ProjectsService } from './projects.service';
import { technologyData } from '../technologies/technologies-type'
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  protected projectList: string[] = [];
  protected employees: string = '';
  protected dataSource: MatTableDataSource<any>;
  protected displayedColumns: string[] = ['title', 'employees', 'technologies', 'delete']
  protected _technologytList: string[] = []

  constructor(
    private _technologyService: TechnologiesService,
    private _projectsService: ProjectsService,
    private _dialog: MatDialog
    ) {
    this.dataSource = new MatTableDataSource<any>([]); 
   }

  async ngOnInit() {
    await this._projectList();
    await this._tecnologyList();
  }

  protected async _openProjectTitle(project: projectData) {
    const dialogRef = this._dialog.open(ProjectTitleComponent, {
      width: '500px',
      data: { project: project },
      panelClass: 'modal-container',
    });

    dialogRef.afterClosed().subscribe( async  (result) => {
      if(!result){
        return;
      }
      const params = { id: project.id, updated_data: result };
        
      const response = await lastValueFrom(this._projectsService.updateTitle(params));

      if(response){
        await this._projectList();
      }
    })
  }

  protected _openProjectEmployees(project: any) {
    const dialogRef = this._dialog.open(ProjectEmployeesComponent, {
      width: '500px',
      data: { project: project },
      panelClass: 'modal-container',
    });

    dialogRef.afterClosed().subscribe( async  (result) => {
      if(!result){
        return;
      }
      const params = { project_id: project.id, updated_data: result };
  
      const response = await lastValueFrom(this._projectsService.updateEmployees(params));

      if(response){
        await this._projectList();
      }
    })
  }

  protected _openProjectTechnologies(project: projectData) {
    const dialogRef = this._dialog.open(ProjectTechnologiesComponent, {
      width: '500px',
      data: { project: project, technologies: this._technologytList },
      panelClass: 'modal-container',
    });

    dialogRef.afterClosed().subscribe( async  (result) => {
      if(!result){
        return;
      }

      const params = { project_id: project.id, updated_data: result };

      const response = await lastValueFrom(this._projectsService.updateTechnologies(params));

      if(response){
        await this._projectList();
      }
    })
  }

  protected async _createProject() {
    const dialogRef = this._dialog.open(ProjectModalComponent, {
      width: '500px',
      data: { projectList: this.projectList, technologyList: this._technologytList },
      panelClass: 'modal-container',
    });

    dialogRef.afterClosed().subscribe( async  (result) => {
      if(!result){
        return;
      }

      const response = await lastValueFrom(this._projectsService.createProject(result));

      if(response){
        await this._projectList();
      }
    })
  }

  protected async _deleteProject(project_id: number){
    const response = await lastValueFrom(this._projectsService.deleteProject(project_id));

    if (response){
      await this._projectList();
    }
  }

  private async _tecnologyList() {
    const tecnologies: any = await lastValueFrom(this._technologyService.listTechnologies());

    if (tecnologies) {
      this._technologytList = tecnologies.map((tecnology: technologyData) => tecnology.name);
    }
  }

  private async _projectList() {
    const projects: any = await lastValueFrom(this._projectsService.listProjects());

    if(!projects) {
      return
    }

    this.projectList = projects.map((project: projectData) => ({
      id: project.id,
      title: project.title,
      associatedEmployees: project.associated_employees,
      employeesAvailable: project.employees_available,
      technologies: project.technologies
    }));

    this.dataSource.data = this.projectList;
  }
}
