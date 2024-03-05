import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalhes-atendimento',
  templateUrl: './detalhes-atendimento.component.html',
  styleUrls: ['./detalhes-atendimento.component.css']
})
export class DetalhesAtendimentoComponent {
  @Input() detalhesAtendimento: any;
}
