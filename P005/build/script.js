"use strict";
class ApiUesc {
    url;
    dadosAPI;
    constructor(url) {
        this.url = url;
        this.dadosAPI = null;
    }
    consumoAPI(url) {
        return fetch(url)
            .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            }
            else {
                throw new Error("Erro na requisição");
            }
        })
            .then((dado) => {
            this.dadosAPI = dado;
        })
            .catch((error) => {
            console.error("Erro ao consumir a API:", error);
            throw error;
        });
    }
    async noticias() {
        await this.consumoAPI(this.url);
        if (this.dadosAPI && this.dadosAPI.slip) {
            console.log(this.dadosAPI.slip.advice);
        }
        else {
            console.log("Dados indisponíveis ou a propriedade slip não existe.");
        }
    }
}
const au = new ApiUesc('https://api.adviceslip.com/advice');
au.noticias();
