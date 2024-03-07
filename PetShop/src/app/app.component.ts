import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarComponente: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  mostrarCadastro() {
    this.mostrarComponente = 'cadastro';
  }

  mostrarListagem() {
    this.mostrarComponente = 'listagem';
  }

  mostrarEditarCadastro() {
    this.mostrarComponente = 'editarCadastro';
  }

}