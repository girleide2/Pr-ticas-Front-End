import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.css'],
  animations: [
    trigger('transformPanel', [
      state('void', style({ transform: 'scaleY(0.8)', opacity: 0 })),
      state('showing', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition('void => *', animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('* => void', animate('100ms linear')),
    ]),
  ],
})
export class FormControlsComponent implements OnInit {
  usuarioForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      nomeUsuario: new FormControl("", [Validators.required, Validators.maxLength(12), this.semEspacoValidator()]),
      senha: new FormControl("", [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      nomeCompleto: new FormControl("", [Validators.required, this.validarNomeCompleto()]),
      telefone: new FormControl("", [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]),
      endereco: new FormControl("",  [Validators.required]),
      dataNascimento: new FormControl("", [Validators.required, this.validarDataNascimento()]),
      genero: new FormControl("", [Validators.required]),
      profissao: new FormControl("", [Validators.required]),
    });
  }

  get senha() {
    return this.usuarioForm.get('senha')!;
  }

  get nomeUsuario() {
    return this.usuarioForm.get('nomeUsuario')!;
  }

  get email() {
    return this.usuarioForm.get('email')!;
  }

  get nomeCompleto() {
    return this.usuarioForm.get('nomeCompleto')!;
  }

  get telefone() {
    return this.usuarioForm.get('telefone')!;
  }

  get endereco() {
    return this.usuarioForm.get('endereco')!;
  }

  get dataNascimento() {
    return this.usuarioForm.get('dataNascimento')!;
  }

  get genero() {
    return this.usuarioForm.get('genero')!;
  }

  get profissao() {
    return this.usuarioForm.get('profissao')!;
  }

  submitForm() {
    if (this.usuarioForm.valid) {
      const formData = this.usuarioForm.value;
      console.log("Você enviou o formulário com os seguintes dados:", formData);
    } else {
      console.log("Formulário inválido. Por favor, corrija os erros antes de enviar.");
    }
  }

  semEspacoValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.indexOf(' ') >= 0) {
        return { 'noSpaces': true };
      }
      return null;
    };
  }

  validarNomeCompleto(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nomeCompleto = control.value;
      if (nomeCompleto && nomeCompleto.indexOf(' ') === -1) {
        return { 'noSpaceInFullName': true };
      }
      return null;
    };
  }
  validarDataNascimento(): ValidatorFn {
    const dataNascimentoRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    return (control: AbstractControl): ValidationErrors | null => {
      const dataNascimento = control.value;

      if (!dataNascimentoRegex.test(dataNascimento)) {
        return { 'formatoDataInvalido': true };
      }
      const dataNascimentoDate = new Date(dataNascimento);
      const hoje = new Date();
      if (isNaN(dataNascimentoDate.getTime())) {
        return { 'dataNascimentoInvalida': true };
      }
      let idade = hoje.getFullYear() - dataNascimentoDate.getFullYear();
      if (hoje.getMonth() < dataNascimentoDate.getMonth() || (hoje.getMonth() === dataNascimentoDate.getMonth() && hoje.getDate() < dataNascimentoDate.getDate())) {
        idade--;
      }
      if (idade < 18) {
        return { 'menorDeIdade': true };
      }
      return null;
    };
  }
  
}
