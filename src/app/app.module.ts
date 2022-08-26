import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ModalAssignPersonDocumentComponent } from './componentes/modals/modal/assign-person-document-modal';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './componentes/nav/nav.component';
import { BodyComponent } from './home/body/body.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ButtonComponent } from './componentes/button/button.component';
import { CardComponent } from './componentes/card/card.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ContactComponent } from './componentes/contact/contact.component';
import { AboutComponent } from './componentes/about/about.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExperienciaComponent } from './home/body/experiencia/experiencia.component';
import { EducacionComponent } from './home/body/educacion/educacion.component';
import { ProyectosComponent } from './home/body/proyectos/proyectos.component';
import { SkillsComponent } from './home/body/skills/skills.component';
import { interceptorProvider } from './service/interceptor-service';
import { UploadFileModalComponent } from './componentes/modals/upload-file-modal/upload-file-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavComponent,
    BodyComponent,
    ButtonComponent,
    CardComponent,
    FooterComponent,
    ContactComponent,
    AboutComponent,
    IniciarSesionComponent,
    ExperienciaComponent,
    EducacionComponent,
    ProyectosComponent,
    SkillsComponent,
    ModalAssignPersonDocumentComponent,
    UploadFileModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
