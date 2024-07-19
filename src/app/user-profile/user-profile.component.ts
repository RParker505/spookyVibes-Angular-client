import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response: any) => {
      this.userData = {
        ...response,
        id: response._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }
  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }
  backToMovies(): void {
    this.router.navigate(["movies"]);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.favoriteMovies = response.filter((movie: any) => {
        return this.userData.favoriteMovies.includes(movie._id)
      })
    }, (err: any) => {
      console.error(err);
    });
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.userData = {
        ...response,
        id: response._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    })
  }

  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovies(movie._id).subscribe((response: any) => {
      this.userData.favoriteMovies = response.favoriteMovies;
      this.getFavoriteMovies();
    }, (err: any) => {
      console.error(err)
    })
  }
  
  logout(): void {
    this.router.navigate(["welcome"]);
    localStorage.clear();
  }
}