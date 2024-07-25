//This is the app's root component(displays as the homepage)

import { Component } from '@angular/core';

/**
 * This is the root component of the Angular application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Application title.
   */
  title = 'spookyVibes-Angular-client';
}
