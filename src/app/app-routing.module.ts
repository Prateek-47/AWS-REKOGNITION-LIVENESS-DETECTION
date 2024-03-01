// Import necessary modules from Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define an empty array to hold route configurations
const routes: Routes = [];

// NgModule decorator to define the routing configuration for the Angular application
@NgModule({
  // Import the RouterModule and configure it with the defined routes
  imports: [RouterModule.forRoot(routes)],
  // Export the configured RouterModule to make it available for use in other modules
  exports: [RouterModule]
})
export class AppRoutingModule { }
