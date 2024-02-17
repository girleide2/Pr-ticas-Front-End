const searchButton = document.querySelector("#search");

searchButton?.addEventListener("submit", async (event) => {
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
            const alertElement = document.querySelector('#alert');

            showAlert(alertElement, '');
            showInfo({
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
        } else {
            showAlert(document.querySelector('#alert'), "Cidade não localizada");
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        showAlert(document.querySelector('#alert'), "Erro ao buscar dados");
    }
});

function showInfo(json: any){
    const tituloElement = document.querySelector('#titulo');
    const valorTempoElement = document.querySelector('#valorTempo');
    const descricaoElement = document.querySelector('#descrição');
    const imgTempElement = document.querySelector('#imgTemp');
    const tempMaxElement = document.querySelector('#tempmax');
    const tempMinElement = document.querySelector('#tempmin');
    const humidElement = document.querySelector('#humid');
    const ventoElement = document.querySelector('#vento');

    if (tituloElement) {tituloElement.innerHTML = `${json.city}, ${json.country}`;}
    if (valorTempoElement) {valorTempoElement.innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}<sup>ºC</sup>`;}
    if (descricaoElement) {descricaoElement.innerHTML = `${json.description}`;}
    if (imgTempElement) {imgTempElement.setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);}
    if (tempMaxElement) {tempMaxElement.innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;}
    if (tempMinElement) {tempMinElement.innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;}
    if (humidElement) {humidElement.innerHTML = `${json.humidity}%`;}
    if (ventoElement) {ventoElement.innerHTML = `${json.windSpeed.toFixed(1).replace('.', ',')} km/h`;}
}

function showAlert(alertElement: Element | null, mensagem: string) {
    if (alertElement) {
        alertElement.innerHTML = mensagem;
        alertElement.classList.add('show');
    }
}


const ApiNasa = async () => {
    try {
        const d: Date = new Date();
        const dataFormatada: string = `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' : ''}${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;

        const apiChave: string = "K70dIzaMyX5Oz8ddlgDWqxtQGawWJjfeIvjlhVIr";
        const Url: string = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dataFormatada}&end_date=${dataFormatada}&api_key=${apiChave}`;
        const ApiImagens = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiChave}`;

        const results: Response = await fetch(Url);
        const img: Response = await fetch(ApiImagens);
        const jsonNasa: any = await results.json();
        const jsonImg: any = await img.json();
        console.log(jsonImg);
        console.log(jsonNasa);

        const imgNasa = jsonImg.photos;

        if (imgNasa && imgNasa.length > 0) {
            showImg({
                img1: imgNasa[5].img_src,
                img2: imgNasa[60].img_src,
                img3: imgNasa[50].img_src,
                img4: imgNasa[14].img_src,
            });
        } else {
            console.log("Dados insuficientes para extrair a imagem");
        }

        const asteroidasDoDia = jsonNasa.near_earth_objects[dataFormatada];

        if (asteroidasDoDia && asteroidasDoDia.length > 2) {
            showInfoNasa({
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

function showImg(json: any){
    const img1Element = document.querySelector('#img1') as HTMLImageElement;
    const img2Element = document.querySelector('#img2') as HTMLImageElement;
    const img3Element = document.querySelector('#img3') as HTMLImageElement;
    const img4Element = document.querySelector('#img4') as HTMLImageElement;

    if (img1Element) img1Element.src = json.img1;
    if (img2Element) img2Element.src = json.img2;
    if (img3Element) img3Element.src = json.img3;
    if (img4Element) img4Element.src = json.img4;

}

function showInfoNasa(json: any) {
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

ApiNasa();

const apiJoke = async () => {
    try {
        const apiJokeURL: string = 'https://v2.jokeapi.dev/joke/Any?safe-mo';

        const results: Response = await fetch(apiJokeURL);
        const jsonJoke: any = await results.json();
        console.log(jsonJoke);

        if (jsonJoke && jsonJoke.error === false) {
            showDados({
                joke: jsonJoke.setup,
                resposta: jsonJoke.delivery,
            });
        } else {
            console.log("Erro");
        }

    } catch (error) {
        console.error(error);
    }
};

function showDados(json: any){
    console.log(json)
    const jokeElement = document.querySelector('#joke');
    const respostaElement = document.querySelector('#resposta');

    if (jokeElement) jokeElement.innerHTML = `${json.joke}`;
    if (respostaElement) respostaElement.innerHTML = `${json.resposta}`;
}

apiJoke();

  