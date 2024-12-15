import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = 'http://localhost:3000/auth'; 

  constructor(private _http: HttpClient) {}

  /**
   * Method to do the login
   */
  public login(email: string, password: string): Observable<any> {
    return this._http.post(`${this._baseUrl}/sign_in`, { email, password }, { observe: 'response' }).pipe(
      tap(response => {
        const headers = response.headers;
        localStorage.setItem('access-token', headers.get('access-token') || '');
        localStorage.setItem('client', headers.get('client') || '');
        localStorage.setItem('uid', headers.get('uid') || '');
      })
    );
  }

  /**
   * Method to create new user
   */
  public createUser(email: string, password: string, password_confirmation: string ): Observable<any> {
    return this._http.post(`${this._baseUrl}`, { email, password, password_confirmation }, { observe: 'response' }).pipe(
      tap(response => {
        console.log('User created successfully', response);
      }),
      
    );
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('access-token') && !!localStorage.getItem('client') && !!localStorage.getItem('uid');
  }

  // Method to do logout
  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'access-token': localStorage.getItem('access-token') || '',
      'client': localStorage.getItem('client') || '',
      'uid': localStorage.getItem('uid') || ''
    });
  }
}