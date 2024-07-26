import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * MovieDetailsComponent is a dialog that opens on button click.
 * It renders in MovieCardComponent and displays movie details, including director, genre and synopsis.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  /**
   * 
   * @param data - title and content strings that will change dynamically based on the movie
   * @param dialogRef 
   */
  constructor(@Inject(MAT_DIALOG_DATA)
      public data: {
          title: string,
          content: string
      },
      public dialogRef: MatDialogRef<MovieDetailsComponent>
    ) {}

  /**
   * Lifecycle hook is called after Angular has initialized all data-bound properties.
   * The hook is called when the first change detection is run on the component.
   */
  ngOnInit(): void {}

  /**
   * Closes dialog when user clicks "close" button
   */
  closeMessageBox(): void {
    this.dialogRef.close();
  }

}
