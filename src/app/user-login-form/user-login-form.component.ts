import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

/**
 * UserLoginFormComponent allows a registered user to log in to the app.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Object holding user data for login
   * @property {string} Username - User's username
   * @property {string} Password - User's password
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of the UserLoginFormComponent
   * @param fetchApiData - Service to interact with the API.
   * @param dialogRef - Referenece to the dialog opened.
   * @param snackBar - Service to show notifications to the user.
   * @param router - Service to route user to other views on the app.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
  ) { }

/**
 * Lifecycle hook is called after Angular has initialized all data-bound properties.
 * The hook is called when the first change detection is run on the component.
 */
ngOnInit(): void {
}

/**
 * Logs in the user by sending userData object to the backend.
 * On success, user data and token are added to local storage and a success message is shown.
 * After log in, user is routed to movies page.
 * If login fails, error message is displayed.
 */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log(response);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(`Login successful. Welcome ${response.user.Username}!`, 'OK', {
        duration: 2000
     });
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }

}
