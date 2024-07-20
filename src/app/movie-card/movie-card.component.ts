import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) { }

// Lifecycle hook called when Angular has created the component
ngOnInit(): void {
  this.getMovies();
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

}
