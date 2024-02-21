import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormControlsComponent } from './form-controls/form-controls.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    FormControlsComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
