import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

/**
 * The UserProfileFormComponent displays user details and allows them to update their profile or deregister.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [DatePipe] 
})
export class UserProfileComponent implements OnInit {

  Username = '';
  @Input() userDetails = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    FavoriteMovies: []
  };
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  currentUser: any = {};

  /**
   * Creates an instance of the UserProfileComponent.
   * @param fetchApiData - Service to interact with the API.
   * @param router - Service to route user to other views on the app.
   * @param snackBar - Service to show notifications to the user.
   * @param datePipe - Service to convert stored birthday into yyyy-MM-dd format for display in the component.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public datePipe: DatePipe
  ) { }

  /**
   * Lifecycle hook is called after Angular has initialized all data-bound properties.
   * The hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {
    this.userProfile();
    this.getFavMovies();
  }

  /**
   * Gets user details from API and assigns the values to fields that will be used in the form to display and update user details.
   */
  userProfile(): void {
    this.currentUser = this.fetchApiData.getUser();
    this.userDetails.Username = this.currentUser.Username;
    this.userDetails.Password = this.currentUser.Password;
    this.userDetails.Email = this.currentUser.Email;
    this.userDetails.Birthday = this.datePipe.transform(this.currentUser.Birthday, 'yyyy-MM-dd',"UTC") || '';
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.currentUser.FavoriteMovies.includes(movie._id));
    });
  }

  /**
   * Applies userDetails provided in the form and updates the user's information on the backend.
   * Messages are shown to user to indicate successful or failed update.
   */
  updateProfile(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe(      (response: any) => {
      this.userDetails = response;
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
      this.userProfile();
      this.snackBar.open('User Update', 'Success', {
        duration: 2000,
      });
    },
    () => {
      this.snackBar.open('Please try again', 'No success', {
        duration: 2000,
      });
    }
  );
}

  /**
   * Deletes user from the backend via a DELETE call to the API.
   * Message confirming a successful or failed deletion is shown to the user.
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log('Deleted User', response);
        this.snackBar.open('Profile deleted successfully', 'OK', {
          duration: 2000
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      }, (error) => {
        console.error('Error deleting user', error);
      });
    }
  }

  /**
   * Fetches all movies from the API and filters for the user's favorites.
   */
  getFavMovies(): void {
    this.currentUser = this.fetchApiData.getUser();
    this.userDetails.FavoriteMovies = this.currentUser.FavoriteMovies;
    this.FavoriteMovies = this.currentUser.FavoriteMovies;
    console.log(`Favorite movies include ${this.FavoriteMovies}`);
  }

  /**
   * Removes a movie from the user's list of favorites.
   * Updates the local storage and FavoriteMovies array.
   * @param movie - The movie object to be removed from the favorites list.
   */
  removeFavMovies(movie: any): void {
    this.currentUser = this.fetchApiData.getUser();
    this.userDetails.Username = this.currentUser.Username;
    this.fetchApiData.deleteFavoriteMovies(movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavMovies();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }

  /**
   * Resets the user update form to display details of the user in localStorage.
   */
  resetUser(): void {
    this.userDetails = JSON.parse(localStorage.getItem("user") || "");
  }
  
}