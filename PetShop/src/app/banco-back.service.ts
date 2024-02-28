import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BancoBackService {
  constructor(private http: HttpClient) { }

  cadastroDeAtendimento(atendimento: {
    nome: string,
    cpf: string,
    nomePet: string,
    servico: string,
    valor:string,
    horario: string}){ 

  this.http.post('https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/posts.json',
  atendimento)
  .subscribe(ResponseData => {
    console.log(ResponseData);
  });
 }

 getAtendimento(){
  return this.http.get('https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/posts.json')
  {
    params: new HttpParams().set('print', 'pretty')
  }
 }
}
