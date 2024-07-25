import { Component, OnInit, Input } from '@angular/core';

// This import brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The UserRegistrationFormComponent allows new users to register for the app.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Creates an instance of the UserRegistrationFormComponent
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of the UserRegistrationFormComponent
   * @param fetchApiData - service to interact with the API.
   * @param dialogRef - Referenece to the dialog opened.
   * @param snackBar - Service to show notifications to the user.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }
  
  /**
   * Lifecycle hook is called after Angular has initialized all data-bound properties.
   * The hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {
  }
  
  /**
   * Registers a new user by sending userData to the backend.
   * Displays success message once user is registered.
   */
  registerUser(): void {
      this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    // Logic for a successful user registration goes here! (To be implemented)
       this.dialogRef.close(); // This will close the modal on success!
       console.log(response);
       this.snackBar.open('user registered successfully', 'OK', {
          duration: 2000
       });
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }

}
