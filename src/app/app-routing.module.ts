import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './componentes/about/about.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NewExpComponent } from './home/body/experiencia/new-exp/new-exp.component';
import { EditExpComponent } from './home/body/experiencia/edit-exp/edit-exp.component';
import { NewEduComponent } from './home/body/educacion/new-edu/new-edu.component';
import { EditEduComponent } from './home/body/educacion/edit-edu/edit-edu.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'login', component:IniciarSesionComponent},
  {path: 'new-exp', component:NewExpComponent},
  {path:'edit-exp/:id', component:EditExpComponent},
  {path:'new-edu', component:NewEduComponent},
  {path:'edit-edu/:id', component:EditEduComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
