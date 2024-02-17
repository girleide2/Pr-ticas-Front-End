import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  ngOnInit(): void {
    this.apiJoke();
  }

  async apiJoke(): Promise<void> {
    try {
        const apiJokeURL: string = 'https://v2.jokeapi.dev/joke/Any?safe-mode';

        const results: Response = await fetch(apiJokeURL);
        const jsonJoke: any = await results.json();
        console.log(jsonJoke);

        if (jsonJoke && jsonJoke.error === false) {
            this.showDados({
                joke: jsonJoke.setup,
                resposta: jsonJoke.delivery,
            });
        } else {
            console.log("Erro");
        }

    } catch (error) {
        console.error(error);
    }
  }

  showDados(json: any): void {
    console.log(json);
    const jokeElement = document.querySelector('#joke');
    const respostaElement = document.querySelector('#resposta');

    if (jokeElement) jokeElement.innerHTML = `${json.joke}`;
    if (respostaElement) respostaElement.innerHTML = `${json.resposta}`;
  }
}
