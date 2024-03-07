import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BancoBackService } from '../banco-back.service';

@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.component.html',
  styleUrl: './editar-cadastro.component.css'
})
export class EditarCadastroComponent {
  dadosPetShop: any[] = [];
  servicos: any[] = [];
  nomeFiltrado: string = '';
  detalhesAtendimento: any;
  novoAtendimento: any;
  editar: boolean = false;

  constructor(private bancoBack: BancoBackService) {}

  submitForm(form: NgForm) {
    let { nome, cpf, nomePet, servico, valor, horario } = form.value;

    if (servico === undefined) {
        servico = 'Serviço não selecionado';
    }

    console.log(nome, cpf, nomePet, servico, valor, horario);
    this.bancoBack.cadastroDeAtendimento({ nome, cpf, nomePet, servico, valor, horario });
  }

  carregarServicos() {
    this.bancoBack.getAtendimento().subscribe(data => {
      this.dadosPetShop = data;
      this.servicos = this.dadosPetShop.filter(item => item.nome === this.nomeFiltrado);
    });
  }

  mostrarDetalhes(servico: any) {
    this.detalhesAtendimento = servico;
    return this.detalhesAtendimento;
  }

  editarAtendimento(id: any) {
    id = this.detalhesAtendimento;
    console.log(id);
  }

}
