import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BancoBackService } from '../banco-back.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.component.html',
  styleUrls: ['./editar-cadastro.component.css']
})
export class EditarCadastroComponent {
  dadosPetShop: any[] = [];
  servicos: any[] = [];
  nomeFiltrado: string = '';
  detalhesAtendimento: any;
  editar!: FormGroup;
  id: string = '';
  editadoSucesso: boolean = false;
  exibirFormularioEdicao: boolean = false;

  constructor(private formBuilder: FormBuilder, private bancoBack: BancoBackService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.editar = this.formBuilder.group({
      novoNome: ['', Validators.required],
      novoCpf: ['', Validators.required],
      novoNomePet: ['', Validators.required],
      novoServico: ['', Validators.required],
      novoValor: ['', Validators.required],
      novoHorario: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.editarAtendimento(this.id);
  }
  

  editarAtendimento(id: any) {
    console.log("id-->" + id);
    this.bancoBack.editarAtendimento(id).subscribe(responseData => {
      console.log(responseData);
      if (responseData && responseData.novoNome) {
        this.editar.setValue(responseData);
      }
    });
  }

  salvaret() {
    this.bancoBack.editar(this.id, this.editar.value).subscribe(responseData => {
      if (responseData.status == 200) {
        this.editadoSucesso = true;
      }
    });
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

  mostrarFormulario() {
    this.exibirFormularioEdicao = true;
  }

  atualizarNomeFiltrado(event: any) {
    this.nomeFiltrado = event?.target?.value || '';
  }
}
