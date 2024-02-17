import { Component } from '@angular/core';

@Component({
  selector: 'app-destaque',
  templateUrl: './destaque.component.html',
  styleUrl: './destaque.component.css'
})
export class DestaqueComponent {
  ngOnInit(): void {
    this.ApiNasa();
  }
  
  ApiNasa = async () => {
    try {
        const d: Date = new Date();
        const dataFormatada: string = `${d.getFullYear()}-${(d.getMonth() + 1) < 10 ? '0' : ''}${d.getMonth() + 1}-${d.getDate() < 10 ? '0' : ''}${d.getDate()}`;

        const apiChave: string = "K70dIzaMyX5Oz8ddlgDWqxtQGawWJjfeIvjlhVIr";
        const ApiImagens = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiChave}`;

        const img: Response = await fetch(ApiImagens);
        const jsonImg: any = await img.json();
        console.log(jsonImg);

        const imgNasa = jsonImg.photos;

        if (imgNasa && imgNasa.length > 0) {
            this.showImg({
                img1: imgNasa[5].img_src,
                img2: imgNasa[60].img_src,
                img3: imgNasa[50].img_src,
                img4: imgNasa[14].img_src,
            });
        } else {
            console.log("Dados insuficientes para extrair a imagem");
        }

    } catch (error) {
        console.error("Erro durante a requisição à API da NASA:", error);
    }
};

showImg(json: any){
    const img1Element = document.querySelector('#img1') as HTMLImageElement;
    const img2Element = document.querySelector('#img2') as HTMLImageElement;
    const img3Element = document.querySelector('#img3') as HTMLImageElement;
    const img4Element = document.querySelector('#img4') as HTMLImageElement;

    if (img1Element) img1Element.src = json.img1;
    if (img2Element) img2Element.src = json.img2;
    if (img3Element) img3Element.src = json.img3;
    if (img4Element) img4Element.src = json.img4;

}
}
