import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './componentes/about/about.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NewExpComponent } from './home/body/experiencia/new-exp/new-exp.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component:IniciarSesionComponent},
  {path: 'new-exp', component:NewExpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
