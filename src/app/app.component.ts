// Import necessary modules from Angular and AWS Amplify
import { Component, OnInit } from '@angular/core';
import awsconfig from './../aws-exports';
import { Auth, Amplify } from 'aws-amplify';
import { Hub } from 'aws-amplify';

// Define the Angular component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Component properties
  title = 'aws-rekognition-liveness-detection-angular';
  load_face_live = false;

  // Initialize component on Angular's OnInit lifecycle event
  ngOnInit(): void {
    // Configure AWS Amplify with the provided AWS configuration
    Amplify.configure(awsconfig);
    Auth.configure(awsconfig);

    // Listen for 'auth' events using the Hub module
    Hub.listen('auth', this.listener);

    // Set a flag to indicate that face live loading is in progress
    this.load_face_live = true;

    // Log a message to the console indicating that the component has been loaded
    console.log('component-loaded');
  }

  // Method to sign the user out
  signOut(): void {
    // Set the face live loading flag to false
    this.load_face_live = false;

    // Use a setTimeout to delay the actual sign-out operation by 3 milliseconds
    setTimeout(() => {
      Auth.signOut();
    }, 3);
  }

  // Event listener for authentication events
  listener = (data) => {
    switch (data.payload.event) {
      // When a user signs in, log a message and set the face live loading flag to true
      case 'signIn':
        console.log('user signed in');
        this.load_face_live = true;
        break;
    }
  };
}
