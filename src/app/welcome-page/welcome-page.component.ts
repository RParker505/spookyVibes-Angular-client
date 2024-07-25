import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * WelcomePageComponent is the landing page for the app.
 * It renders forms for registration and log in.
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Creates an instance of the WelcomePageComponent
   * @param dialog - Use MatDialog to handle dialog opening
   */
  // Pass MatDialog as an argument so that it's available for use in this component
  constructor(public dialog: MatDialog) { }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
  }
  
  /**
   * Opens the user registration form when button is clicked.
   */  
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
      });
    }

  /**
   * Opens the login form when button is clicked.
   */ 
  openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px'
      });
    }

}
