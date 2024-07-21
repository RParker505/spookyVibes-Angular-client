import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  FavoriteMovies: any[] = [];
  isFavMovie: boolean = false;
  userData = { Username: "", FavoriteMovies: [] };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

// Lifecycle hook called when Angular has created the component
ngOnInit(): void {
  this.getMovies();
  this.getFavMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

logout(): void {
  this.router.navigate(["welcome"]);
  localStorage.clear();
}

redirectProfile(): void {
  this.router.navigate(["profile"]);
}

showGenre(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
          title: String(movie.Genre.Name).toUpperCase(),
          content: movie.Genre.Description
      },
      width: "400px"
  })
}

showDirector(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
          title: String(movie.Director.Name).toUpperCase(),
          content: movie.Director.Bio
      },
      width: "400px"
  })
}

showSynopsis(movie: any): void {
  this.dialog.open(MovieDetailsComponent, {
      data: {
          title: String(movie.Title).toUpperCase(),
          content: movie.Description
      },
      width: "400px"
  })
}

getFavMovies(): void {
  this.user = this.fetchApiData.getUser();
  this.userData.FavoriteMovies = this.user.FavoriteMovies;
  this.FavoriteMovies = this.user.FavoriteMovies;
  console.log('User fav movies', this.FavoriteMovies);
}

isFavoriteMovie(movieID: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.FavoriteMovies.indexOf(movieID) >= 0;
}

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
