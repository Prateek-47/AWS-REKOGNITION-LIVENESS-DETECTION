// Import necessary modules from Angular and external libraries
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaceLivenessComponent } from './face-liveness/face-liveness.component';
import { FaceLivenessReactWrapperComponent } from 'src/FaceLivenessReactWrapperComponent';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { MatIconModule } from '@angular/material/icon';

// NgModule decorator to define the main module of the Angular application
@NgModule({
  // Declarations: Components that belong to this module
  declarations: [
    AppComponent,
    FaceLivenessComponent,
    FaceLivenessReactWrapperComponent
  ],
  // Imports: Other modules that this module depends on
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    AmplifyAuthenticatorModule,
    MatIconModule
  ],
  // Schemas: Defines the schema used for the components in this module
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  // Providers: Services or dependencies provided by this module
  providers: [],
  // Bootstrap: The main component that is used to start the application
  bootstrap: [AppComponent]
})
export class AppModule { }
