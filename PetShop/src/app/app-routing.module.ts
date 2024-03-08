import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';

const routes: Routes = [

  { path: 'listagem', component: ListagemComponent },
  { path: '', redirectTo: '/listagem', pathMatch: 'full' },
  { path: '**', redirectTo: '/listagem' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
