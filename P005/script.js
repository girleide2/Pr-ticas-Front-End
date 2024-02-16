var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var searchButton = document.querySelector("#search");
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var nomeCidadeInput, nomeCidade, apiKey, apiUrl, results, json, alertElement, tituloElement, valorTempoElement, descricaoElement, imgTempElement, tempMaxElement, tempMinElement, humidElement, ventoElement, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                nomeCidadeInput = document.querySelector('#nomeCidade');
                nomeCidade = nomeCidadeInput === null || nomeCidadeInput === void 0 ? void 0 : nomeCidadeInput.value;
                if (!nomeCidade) {
                    alert('Você precisa digitar uma cidade');
                    return [2 /*return*/];
                }
                console.log(nomeCidade);
                apiKey = '8a60b2de14f7a17c7a11706b2cfcd87c';
                apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(encodeURI(nomeCidade), "&appid=").concat(apiKey, "&units=metric&lang=pt_br");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(apiUrl)];
            case 2:
                results = _a.sent();
                return [4 /*yield*/, results.json()];
            case 3:
                json = _a.sent();
                if (json.cod === 200) {
                    alertElement = document.querySelector('#alert');
                    tituloElement = document.querySelector('#titulo');
                    valorTempoElement = document.querySelector('#valorTempo');
                    descricaoElement = document.querySelector('#descrição');
                    imgTempElement = document.querySelector('#imgTemp');
                    tempMaxElement = document.querySelector('#tempmax');
                    tempMinElement = document.querySelector('#tempmin');
                    humidElement = document.querySelector('#humid');
                    ventoElement = document.querySelector('#vento');
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
                }
                else {
                    showAlert(document.querySelector('#alert'), "Cidade não localizada");
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error('Erro ao buscar dados:', error_1);
                showAlert(document.querySelector('#alert'), "Erro ao buscar dados");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
function showInfo(json, tituloElement, valorTempoElement, descricaoElement, imgTempElement, tempMaxElement, tempMinElement, humidElement, ventoElement) {
    if (tituloElement) {
        tituloElement.innerHTML = "".concat(json.city, ", ").concat(json.country);
    }
    if (valorTempoElement) {
        valorTempoElement.innerHTML = "".concat(json.temp.toFixed(1).toString().replace('.', ','), "<sup>\u00BAC</sup>");
    }
    if (descricaoElement) {
        descricaoElement.innerHTML = "".concat(json.description);
    }
    if (imgTempElement) {
        imgTempElement.setAttribute('src', "https://openweathermap.org/img/wn/".concat(json.tempIcon, "@2x.png"));
    }
    if (tempMaxElement) {
        tempMaxElement.innerHTML = "".concat(json.tempMax.toFixed(1).toString().replace('.', ','), " <sup>C\u00B0</sup>");
    }
    if (tempMinElement) {
        tempMinElement.innerHTML = "".concat(json.tempMin.toFixed(1).toString().replace('.', ','), " <sup>C\u00B0</sup>");
    }
    if (humidElement) {
        humidElement.innerHTML = "".concat(json.humidity, "%");
    }
    if (ventoElement) {
        ventoElement.innerHTML = "".concat(json.windSpeed.toFixed(1).replace('.', ','), " km/h");
    }
}
function showAlert(alertElement, mensagem) {
    if (alertElement) {
        alertElement.innerHTML = mensagem;
        alertElement.classList.add('show');
    }
}
// classe nasa
var ApiNasa = function () { return __awaiter(_this, void 0, void 0, function () {
    var d, dataFormatada, apiChave, Url, results, jsonNasa, asteroidasDoDia, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                d = new Date();
                dataFormatada = "".concat(d.getFullYear(), "-").concat((d.getMonth() + 1) < 10 ? '0' : '').concat(d.getMonth() + 1, "-").concat(d.getDate() < 10 ? '0' : '').concat(d.getDate());
                apiChave = "K70dIzaMyX5Oz8ddlgDWqxtQGawWJjfeIvjlhVIr";
                Url = "https://api.nasa.gov/neo/rest/v1/feed?start_date=".concat(dataFormatada, "&end_date=").concat(dataFormatada, "&api_key=").concat(apiChave);
                return [4 /*yield*/, fetch(Url)];
            case 1:
                results = _a.sent();
                return [4 /*yield*/, results.json()];
            case 2:
                jsonNasa = _a.sent();
                asteroidasDoDia = jsonNasa.near_earth_objects[dataFormatada];
                if (asteroidasDoDia && asteroidasDoDia.length > 2) {
                    showInfoNasa({
                        nome: asteroidasDoDia[2].name,
                        magntudeAbsoluta: asteroidasDoDia[2].absolute_magnitude_h,
                        perigo: asteroidasDoDia[2].is_potentially_hazardous_asteroid,
                        diametroMax: asteroidasDoDia[2].estimated_diameter.kilometers.estimated_diameter_max,
                        diametroMin: asteroidasDoDia[2].estimated_diameter.kilometers.estimated_diameter_min,
                    });
                }
                else {
                    console.log("Dados insuficientes para extrair o nome do asteroide.");
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Erro durante a requisição à API da NASA:", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
function showInfoNasa(json) {
    var nomeElement = document.querySelector('#nome');
    var magnitudeElement = document.querySelector('#magnitude');
    var perigoElement = document.querySelector('#perigo');
    var diametroMaxElement = document.querySelector('#diametroMax');
    var diametroMinElement = document.querySelector('#diametroMin');
    if (nomeElement)
        nomeElement.innerHTML = "Nome: ".concat(json.nome);
    if (magnitudeElement)
        magnitudeElement.innerHTML = "Magnitude absoluta: ".concat(json.magntudeAbsoluta.toFixed(1).replace('.', ','), " lm");
    if (perigoElement)
        perigoElement.innerHTML = "Oferece perigo? ".concat(json.perigo ? 'Sim' : 'Não');
    if (diametroMaxElement)
        diametroMaxElement.innerHTML = "Di\u00E2metro M\u00E1ximo: ".concat(json.diametroMax.toFixed(1).replace('.', ','), " Km");
    if (diametroMinElement)
        diametroMinElement.innerHTML = "Di\u00E2metro M\u00EDnimo: ".concat(json.diametroMin.toFixed(1).replace('.', ','), " Km");
}
ApiNasa();
