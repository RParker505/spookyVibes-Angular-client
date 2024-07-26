import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * MovieCardComponent displays a card with a single movie's title, director and image.
 * Users can select from several buttons to get more movie details or add/remove it to/from their favorites.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /**
   * Arrays to store all movies, user details and user's favorite movies.
   */
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];

  isFavMovie: boolean = false;
  userData = { Username: "", FavoriteMovies: [] };

  /**
   * Creates an instance of the MovieCardComponent
   * @param fetchApiData - Service to interact with the API.
   * @param router - Service to route user to other views on the app.
   * @param dialog - Service to route user to other views on the app.
   * @param snackBar - Service to show notifications to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

/**
 * Lifecycle hook is called after Angular has initialized all data-bound properties.
 * The hook is called when the first change detection is run on the component.
 */
ngOnInit(): void {
  this.getMovies();
  this.getFavMovies();
}

/**
 * Fetches all movies.
 */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

/**
 * Opens a dialog to display a single movie's genre information.
 * @param movie - The movie object.
 */
showGenre(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
          title: String(movie.Genre.Name).toUpperCase(),
          content: movie.Genre.Description
      },
      width: "400px"
  })
}

/**
 * Opens a dialog to display a single movie's director information.
 * @param movie - The movie object.
 */
showDirector(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
          title: String(movie.Director.Name).toUpperCase(),
          content: movie.Director.Bio
      },
      width: "400px"
  })
}

/**
 * Opens a dialog to display a single movie's synopsis.
 * @param movie - The movie object.
 */
showSynopsis(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
          title: String(movie.Title).toUpperCase(),
          content: movie.Description
      },
      width: "400px"
  })
}

/**
 * Gets user details via API and adds their favorite movies to empty array.
 * Prints user's favorite movies to the console.
 */
getFavMovies(): void {
  this.user = this.fetchApiData.getUser();
  this.userData.FavoriteMovies = this.user.FavoriteMovies;
  this.FavoriteMovies = this.user.FavoriteMovies;
  console.log('User fav movies', this.FavoriteMovies);
}

/**
 * Checks if a given movieID is in the user's list of favorite movies.
 * User data is retrieved from local storage and ID is checked against FavoriteMovies array.
 * @param movieID - Unique ID for a single movie. 
 * @returns - Returns `true` if the movie ID is in the user's list of favorite movies, otherwise `false`.
 */
isFavoriteMovie(movieID: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.FavoriteMovies.indexOf(movieID) >= 0;
}

/**
 * Adds a movie to a user's list of favorites.
 * Once movie has been added, local storage user details are updated and a success message is displayed to the user.
 * @param {string} movie -  The ID of the movie to add to the favorite list.
 */
addFavMovies(movie: string): void {
  this.user = this.fetchApiData.getUser();
  this.userData.Username = this.user.Username;
  this.fetchApiData.addFavoriteMovies(movie).subscribe((response) => {
    localStorage.setItem('user', JSON.stringify(response));
    this.getFavMovies();
    this.snackBar.open('Movie has been added to your favorites!', 'OK', {
      duration: 3000,
    });
  });
}

/**
 * Removes a movie from a user's list of favorites.
 * Once movie has been removed, local storage user details are updated and a success message is displayed to the user.
 * @param {string} movie -  The ID of the movie to add to the favorite list.
 */
removeFavMovies(movie: any): void {
  this.user = this.fetchApiData.getUser();
  this.userData.Username = this.user.Username;
  this.fetchApiData.deleteFavoriteMovies(movie).subscribe((response) => {
    localStorage.setItem('user', JSON.stringify(response));
    this.getFavMovies();
    this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
      duration: 3000,
    });
  });
}

}
