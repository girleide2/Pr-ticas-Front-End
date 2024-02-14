class ApiUesc {
  url: any;
  dadosAPI: any;

  constructor(url: any) {
    this.url = url;
    this.dadosAPI = null;
  }

  consumoAPI(url: any): Promise<void> {
    return fetch(url)
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
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

  async noticias(): Promise<void> {
    await this.consumoAPI(this.url);
    if (this.dadosAPI && this.dadosAPI.slip) {
      console.log(this.dadosAPI.slip.advice);
    } else {
      console.log("Dados indisponíveis ou a propriedade slip não existe.");
    }
  }
}

const au = new ApiUesc('https://api.adviceslip.com/advice');
au.noticias();
