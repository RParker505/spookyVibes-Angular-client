import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any;
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

// Lifecycle hook called when Angular has created the component
ngOnInit(): void {
  this.getMovies();
  this.getUser();
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

getUser(): void {
  const { Username } = JSON.parse(
    localStorage.getItem('user') || '{}'
  );
  this.fetchApiData.getUser(Username).subscribe((response: any) => {
    this.user = response;
    this.favorites = this.user.FavoriteMovies;
  });
}

// Check if movie is marked as favorite
isFavorite(movie: any): boolean {
  return this.favorites.includes(movie._id);
}

// Add title to user favorites
addTitleToFavorites(movie: any): void {
  this.fetchApiData.addFavoriteMovies(movie).subscribe((response: any) => {
    console.log(response);
    // update FavoriteMovies in the local storage
    const user = JSON.parse(localStorage.getItem('user') || '');
    user.FavoriteMovies.push(movie._id);
    localStorage.setItem('user', JSON.stringify(user));

    // update the favorites array to reflect the favorite state without reloading the page
    this.favorites.push(movie._id);
    this.snackBar.open('Movie added to your favorites', 'Success', {
      duration: 2000,
    });
  });
}

// Remove title from user favorites
removeTitleFromFavorites(movie: any): void {
  this.fetchApiData.deleteFavoriteMovies(movie).subscribe((response: any) => {
    console.log(response);
    // update FavoriteMovies in the local storage
    const user = JSON.parse(localStorage.getItem('user') || '');
    user.FavoriteMovies = user.FavoriteMovies.filter(
      (id: string) => id !== movie._id
    );
    localStorage.setItem('user', JSON.stringify(user));
    // Update the favorites array to reflect the favorite state without reloading the page
    this.favorites = this.favorites.filter(
      (id: string) => id !== movie._id
    );
    this.snackBar.open('Movie removed from your favorites', 'Success', {
      duration: 2000,
    });
  });
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

modifyFavoriteMovies(movie: any): void {
  let user = JSON.parse(localStorage.getItem("user") || "");
  let icon = document.getElementById(`${movie._id}-favorite-icon`);

  if (user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteFavoriteMovies(movie._id).subscribe(response => {
          icon?.setAttribute("fontIcon", "favorite_border");

          console.log("Successfully removed movie from user favorites")
          console.log(response);
          user.FavoriteMovies = response.FavoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
      }, err => {
          console.error(err)
      })
  } else {
      this.fetchApiData.addFavoriteMovies(movie._id).subscribe(response => {
          icon?.setAttribute("fontIcon", "favorite");

          console.log("Successfully added movie to user favorites")
          console.log(response);
          user.FavoriteMovies = response.FavoriteMovies;
          localStorage.setItem("user", JSON.stringify(user));
      }, err => {
          console.error(err)
      })
  }
  localStorage.setItem("user", JSON.stringify(user));
}

}
