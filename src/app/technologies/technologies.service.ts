import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {
  private url:string = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  listTechnologies(){
    return this.http.get(`${this.url}/technologies`);
  }

  createTechnology(newTechnoloy: string){
    return this.http.post<string>(`${this.url}/technologies`, newTechnoloy);
  }

  updateTechnology(technologyId: number, updatedData: { name: string } ){
    return this.http.put<string>(`${this.url}/technologies/${technologyId}`, updatedData);
  }

  deleteTechnology(technologyId: number){
    return this.http.delete<string>(`${this.url}/technologies/${technologyId}`);
  }
}
