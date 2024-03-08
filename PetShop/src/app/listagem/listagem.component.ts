import { Component } from '@angular/core';
import { BancoBackService } from '../banco-back.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent {
  dadosPetShop: any[] = [];
  servicos: any[] = [];
  nomeFiltrado: string = '';
  detalhesAtendimento: any;

  constructor(private bancoBack: BancoBackService) {}

  carregarServicos() {
    this.bancoBack.getAtendimento().subscribe(data => {
      this.dadosPetShop = data;
      this.servicos = this.dadosPetShop.filter(item => item.nome === this.nomeFiltrado);
    });
  }

  mostrarDetalhes(servico: any) {
    this.detalhesAtendimento = servico;
  }
}
