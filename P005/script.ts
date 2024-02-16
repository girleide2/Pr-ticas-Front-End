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
            const tituloElement = document.querySelector('#titulo');
            const valorTempoElement = document.querySelector('#valorTempo');
            const descricaoElement = document.querySelector('#descrição');
            const imgTempElement = document.querySelector('#imgTemp');
            const tempMaxElement = document.querySelector('#tempmax');
            const tempMinElement = document.querySelector('#tempmin');
            const humidElement = document.querySelector('#humid');
            const ventoElement = document.querySelector('#vento');

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
            }, tituloElement, valorTempoElement, descricaoElement, imgTempElement, tempMaxElement, tempMinElement, humidElement, ventoElement);
        } else {
            showAlert(document.querySelector('#alert'), "Cidade não localizada");
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        showAlert(document.querySelector('#alert'), "Erro ao buscar dados");
    }
});

function showInfo(json: {
    city: string,
    country: string,
    temp: number,
    tempMax: number,
    tempMin: number,
    description: string,
    tempIcon: string,
    windSpeed: number,
    humidity: number,
}, tituloElement: Element | null, valorTempoElement: Element | null, descricaoElement: Element | null, imgTempElement: Element | null, tempMaxElement: Element | null, tempMinElement: Element | null, humidElement: Element | null, ventoElement: Element | null) {
    if (tituloElement) {
        tituloElement.innerHTML = `${json.city}, ${json.country}`;
    }
    
    if (valorTempoElement) {
        valorTempoElement.innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')}<sup>ºC</sup>`;
    }

    if (descricaoElement) {
        descricaoElement.innerHTML = `${json.description}`;
    }

    if (imgTempElement) {
        imgTempElement.setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    }

    if (tempMaxElement) {
        tempMaxElement.innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    }

    if (tempMinElement) {
        tempMinElement.innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    }

    if (humidElement) {
        humidElement.innerHTML = `${json.humidity}%`;
    }

    if (ventoElement) {
        ventoElement.innerHTML = `${json.windSpeed.toFixed(1).replace('.', ',')} km/h`;
    }
}

function showAlert(alertElement: Element | null, mensagem: string) {
    if (alertElement) {
        alertElement.innerHTML = mensagem;
        alertElement.classList.add('show');
    }
}

// classe nasa

const ApiNasa = async () => {
    try {
        const d: Date = new Date();
        const dataFormatada: string = `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' : ''}${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;

        const apiChave: string = "K70dIzaMyX5Oz8ddlgDWqxtQGawWJjfeIvjlhVIr";
        const Url: string = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dataFormatada}&end_date=${dataFormatada}&api_key=${apiChave}`;

        const results: Response = await fetch(Url);
        const jsonNasa: any = await results.json();

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

  