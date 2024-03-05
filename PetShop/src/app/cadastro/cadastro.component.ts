import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BancoBackService } from '../banco-back.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  constructor(private bancoBack: BancoBackService) {}

  submitForm(form: NgForm) {
    let { nome, cpf, nomePet, servico, valor, horario } = form.value;

    if (servico === undefined) {
        servico = 'Serviço não selecionado';
    }

    console.log(nome, cpf, nomePet, servico, valor, horario);
    this.bancoBack.cadastroDeAtendimento({ nome, cpf, nomePet, servico, valor, horario });
  }
}
