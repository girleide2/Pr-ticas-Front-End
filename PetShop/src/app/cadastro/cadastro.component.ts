import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BancoBackService } from '../banco-back.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  constructor(private bancoBack: BancoBackService){

  }

  submitForm(form: NgForm){
    let{nome, cpf, nomePet, servico, valor, horario} = form.value;
    console.log(nome, cpf, nomePet, servico, valor, horario);
    let atendimento = {nome, cpf, nomePet, servico, valor, horario};
    this.bancoBack.cadastroDeAtendimento(atendimento);
  }
}
