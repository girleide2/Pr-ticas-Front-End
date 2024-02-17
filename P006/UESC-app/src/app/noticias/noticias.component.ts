import { Component } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {

  ngOnInit(): void {
    this.ApiNasa();
  }

  ApiNasa = async () => {
    try {
        const d: Date = new Date();
        const dataFormatada: string = `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' : ''}${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;

        const apiChave: string = "K70dIzaMyX5Oz8ddlgDWqxtQGawWJjfeIvjlhVIr";
        const Url: string = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dataFormatada}&end_date=${dataFormatada}&api_key=${apiChave}`;

        const results: Response = await fetch(Url);
        const jsonNasa: any = await results.json();

        const asteroidasDoDia = jsonNasa.near_earth_objects[dataFormatada];

        if (asteroidasDoDia && asteroidasDoDia.length > 2) {
            this.showInfoNasa({
                nome: asteroidasDoDia[2].name,
                magntudeAbsoluta: asteroidasDoDia[2].absolute_magnitude_h,
                perigo: asteroidasDoDia[2].is_potentially_hazardous_asteroid,
                diametroMax: asteroidasDoDia[2].estimated_diameter.kilometers.estimated_diameter_max,
                diametroMin: asteroidasDoDia[2].estimated_diameter.kilometers.estimated_diameter_min,
            });
        } else {
            console.log("Dados insuficientes para extrair o nome do asteroide.");
        }
    } catch (error) {
        console.error("Erro durante a requisição à API da NASA:", error);
    }
};


showInfoNasa(json: any) {
    const nomeElement = document.querySelector('#nome');
    const magnitudeElement = document.querySelector('#magnitude');
    const perigoElement = document.querySelector('#perigo');
    const diametroMaxElement = document.querySelector('#diametroMax');
    const diametroMinElement = document.querySelector('#diametroMin');

    if (nomeElement) nomeElement.innerHTML = `Nome: ${json.nome}`;
    if (magnitudeElement) magnitudeElement.innerHTML = `Magnitude absoluta: ${json.magntudeAbsoluta.toFixed(1).replace('.', ',')} lm`;
    if (perigoElement) perigoElement.innerHTML = `Oferece perigo? ${json.perigo ? 'Sim' : 'Não'}`;
    if (diametroMaxElement) diametroMaxElement.innerHTML = `Diâmetro Máximo: ${json.diametroMax.toFixed(1).replace('.', ',')} Km`;
    if (diametroMinElement) diametroMinElement.innerHTML = `Diâmetro Mínimo: ${json.diametroMin.toFixed(1).replace('.', ',')} Km`;
}
}
