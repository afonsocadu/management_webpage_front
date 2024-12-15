import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private url:string = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}
  
  listEmployee(){
    return this.http.get(`${this.url}/employees`)
  }

  deleteEmployee(employeeId: number) {
    return this.http.delete<any>(`${this.url}/employees/${employeeId}`)
  }

  updateEmployee(employeeId: number, updatedData: {user_name: string, project: string } ) {
    return this.http.put<any>(`${this.url}/employees/${employeeId}`, updatedData);
  }
  
  createEmployee(newEmployee: {user_name: string, project: string }){
    return this.http.post<any>(`${this.url}/employees`, newEmployee);
  }
}