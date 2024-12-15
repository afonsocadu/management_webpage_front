import { lastValueFrom } from 'rxjs';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  protected _email: string = '';
  protected _password: string = '';
  protected _password_confirmation: string = '';
  protected _isCreatingUser: boolean = false;

  constructor(private _authService: AuthService, private _router: Router, private _dialog: MatDialog) {}

  /**
   * Handles the login form submission.
   */
  protected onSubmit() {
    if (this._isCreatingUser) {
      this._createUser();

      return
    } 

    this._login();
  }

  /**
   * Logs in as a recruiter by creating a new user with a unique email and default password.
   * Upon successful user creation, submits the login form.
   */
  protected _logInRecruiter() {
    this._email = this._generateUniqueEmail();
    this._password = '123456'
    this._password_confirmation = '123456'

    this._createUser();
  }

  protected _toggleForm() {
    this._isCreatingUser = !this._isCreatingUser;
  }
    
  /**
   * Generates a unique email
   */
  private _generateUniqueEmail(): string {
    const timestamp = new Date().getTime();
    return `recruiter${timestamp}@example.com`; 
  }

  private _login() {
    this._authService.login(this._email, this._password).subscribe(
      response => {
        if (response.status == 200) {
          this._router.navigate(['/project']);
        }
      },
      error => {
        this._dialog.open(DialogComponent, {
          data: {
            message: 'Error creating user: ' + error.message
          }
        });
      }
    );
  }

  private async _createUser() {
    try {
      const response = await lastValueFrom(
        this._authService.createUser(this._email, this._password, this._password_confirmation)
      )

      if (response.body.status == 'success') {
        this._login();
        return
      }    
    } catch(error) {
      if (error instanceof HttpErrorResponse) {
        //TODO Refactor to improve readability
        const errorMessage = error.error?.errors?.full_messages;

        this._dialog.open(DialogComponent, {
          data: { message: errorMessage }
        });
        }
      }
  }
}
