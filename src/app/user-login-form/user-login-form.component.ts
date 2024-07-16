import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { username: '', password: '' };

  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
  ) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend and adding token to local storage
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open(`Login successful, Welcom ${response.user.username}`, 'OK', {
        duration: 2000
     });
     let user = {
      ...response.user,
      id: response.user._id,
      password: this.userData.password,
      token: response.token
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }

}
