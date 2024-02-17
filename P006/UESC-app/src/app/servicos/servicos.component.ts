import { Component } from '@angular/core';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent {
  cidade: string = '';
  pais: string = '';
  temperatura: number = 0;
  temperaturaMax: number = 0;
  temperaturaMin: number = 0;
  descricao: string = '';
  iconeTempo: string = '';
  vento: number = 0;
  umidade: number = 0;
  mensagemAlerta: string = ''; 

  async buscarDados(event: Event): Promise<void> {
    event.preventDefault();

    const nomeCidadeInput = document.querySelector<HTMLInputElement>('#nomeCidade');
    const nomeCidade: string | undefined = nomeCidadeInput?.value;

    if (!nomeCidade) {
        alert('Você precisa digitar uma cidade');
        return;
    }

    console.log(nomeCidade);

    const apiKey: string = '8a60b2de14f7a17c7a11706b2cfcd87c';
    const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(nomeCidade)}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
      const results = await fetch(apiUrl);
      const json = await results.json();

      if (json.cod === 200) {
          this.showInfo({
              city: json.name,
              country: json.sys.country,
              temp: json.main.temp,
              tempMax: json.main.temp_max,
              tempMin: json.main.temp_min,
              description: json.weather[0].description,
              tempIcon: json.weather[0].icon,
              windSpeed: json.wind.speed,
              humidity: json.main.humidity,
          });
          this.showAlert(null, ''); 
      } else {
          this.showAlert(document.querySelector('#alert'), "Cidade não localizada");
      }
  } catch (error) {
      console.error('Erro ao buscar dados:', error);
      this.showAlert(document.querySelector('#alert'), "Erro ao buscar dados");
  }
}

showInfo(json: any): void {
  this.cidade = json.city;
  this.pais = json.country;
  this.temperatura = json.temp;
  this.temperaturaMax = json.tempMax;
  this.temperaturaMin = json.tempMin;
  this.descricao = json.description;
  this.iconeTempo = json.tempIcon;
  this.vento = json.windSpeed;
  this.umidade = json.humidity;
}

  showAlert(alertElement: Element | null, mensagem: string): void {
    this.mensagemAlerta = mensagem; 
    if (alertElement) {
      alertElement.innerHTML = mensagem;
      alertElement.classList.add('show');
    }
  }
}
const servicos = new ServicosComponent();
servicos.showAlert;
servicos.showInfo;

