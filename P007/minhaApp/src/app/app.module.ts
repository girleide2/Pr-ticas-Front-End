import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ClassesComponent } from './components/classes/classes.component';

@NgModule({
  declarations: [
    AppComponent,
    CarrinhoComponent,
    ClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
