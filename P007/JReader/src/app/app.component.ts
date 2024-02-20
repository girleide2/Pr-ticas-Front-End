import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JReader';

  veiculos(event: any): void {
    const fileInput = event.target;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const content = e.target.result;
        const jsonVeiculos = JSON.parse(content);
        console.log(jsonVeiculos);
      };
      reader.readAsText(file);
    }
  }
}
