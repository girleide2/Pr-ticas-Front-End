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

  editarAtendimento(id: string) {
    return this.http.get<any>(`https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/PetShop/${id}.json`);
  }


  editar(id:string, Data: {   NomePassageiro: string, 
      novoNome: string,
      novoCpf: string,
      novoNomePet: string,
      novoServico: string,
      novoValor: string,
      novoHorario: string,
}
) {
return this.http.put(`https://petshop-doguinho-caramelo-default-rtdb.firebaseio.com/PetShop/${id}.json`, Data, {observe: 'response'});
}

}
