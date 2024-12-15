import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private url:string = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  listProjects(){
    return this.http.get(`${this.url}/projects`)
  }

  createProject(newProject: string){
    return this.http.post<string>(`${this.url}/projects`, newProject)
  }

  deleteProject(projectId: number) {
    return this.http.delete<string>(`${this.url}/projects/${projectId}`)
  }

  updateProject(project_id: number, updated_data: {title: string } ) {
    return this.http.put<string>(`${this.url}/projects/${project_id}`, updated_data);
  }

  updateEmployees(updatedData:{ project_id: number, updated_data: { employees: string[] }}) {
    return this.http.put<string>(`${this.url}/projects/update_employees`, updatedData);
  }

  updateTechnologies(updated_data: { project_id: number, updated_data: { technologies: string[] }}) {
    return this.http.put<string>(`${this.url}/projects/update_technologies`, updated_data);
  }

  updateTitle(updated_data: { id: number, updated_data: { title: string }}) {
    return this.http.put<string>(`${this.url}/projects/${updated_data.id}`, updated_data);
  }
}
