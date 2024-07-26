import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * The NavBarComponent handles navigation for the app.
 * Users can use it to move between the movies and profile pages or choose to logout.
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
   * Creates an instance of the NavBarComponent
   * @param router - Service that allows users to move between views in the app.
   */
  constructor(
    public router: Router
  ) { }

  /**
   * Lifecycle hook is called after Angular has initialized all data-bound properties.
   * The hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {
  }

  /**
   * Navigates a user to the movies page.
   */
  public launchMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates a user to their profile page.
   */
  public launchProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user.
   * Clears the local storage and routes user to the welcome page.
   */
  public logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

}
