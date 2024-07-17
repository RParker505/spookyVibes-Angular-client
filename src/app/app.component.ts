//This is the app's root component(displays as the homepage)

import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spookyVibes-Angular-client';

  // Pass MatDialog as an argument so that it's available for use in this component
  constructor(public dialog: MatDialog) { }
  
  // This function will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
      });
    }

  // This function will open the dialog when the login button is clicked  
  openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px'
      });
    }
  // This function will open the list of all movie cards when button is clicks 
  openMoviesDialog(): void {
      this.dialog.open(MovieCardComponent, {
        width: '500px'
      });
    }

}
