import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



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
    valor: string,
    horario: string
  }) {
    this.http.post('https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/PetShop.json', atendimento)
      .subscribe(ResponseData => {
        console.log(ResponseData);
      });
  }

  getAtendimento(): Observable<any> {
    return this.http.get<any>('https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/PetShop.json')
      .pipe(
        map(data => {
          return Object.values(data);
        })
      );
  }

  editarAtendimento(id: string, novoAtendimento: any) {
    const url = `https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/PetShop/${id}.json`;
    return this.http.put(url, novoAtendimento);
  }
}
