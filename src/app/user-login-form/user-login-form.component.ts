import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

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

  @Input() userData = { Username: '', Password: '' };

  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserLoginFormComponent>,
      public snackBar: MatSnackBar,
      public router: Router
  ) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend and adding token to local storage
// If login fails, shows a failure notification
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log(response);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open(`Login successful, Welcome ${response.user.username}`, 'OK', {
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
