import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  Username = '';
  @Input() userDetails = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: Date,
    FavoriteMovies: []
  };
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  currentUser: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userProfile();
    this.getFavMovies();
  }

  userProfile(): void {
    this.currentUser = this.fetchApiData.getUser();
    this.userDetails.Username = this.currentUser.Username;
    this.userDetails.Password = this.currentUser.Password;
    this.userDetails.Email = this.currentUser.Email;
    this.userDetails.Birthday = this.currentUser.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.currentUser.FavoriteMovies.includes(movie._id));
    });
  }

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

  getFavMovies(): void {
    this.currentUser = this.fetchApiData.getUser();
    this.userDetails.FavoriteMovies = this.currentUser.FavoriteMovies;
    this.FavoriteMovies = this.currentUser.FavoriteMovies;
    console.log(`Favorite movies include ${this.FavoriteMovies}`);
  }

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

  resetUser(): void {
    this.userDetails = JSON.parse(localStorage.getItem("user") || "");
  }

  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.clear();
  }
  
}