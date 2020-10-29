import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

// IMPORTACION DE FECHAS EN ESPAÑOL
import '@angular/common/locales/global/es';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { ClientesService } from './clientes/clientes.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './clientes/form.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter'
// Este import me sirve para poner a escoger la fecha al usuario
//import { MatInputModule } from '@angular/material/input';
import { DetalleComponent } from './clientes/detalle/detalle.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/page/:page', component: ClientesComponent },
  { path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent },
  { path: 'facturas/:id', component: DetalleFacturaComponent },
  { path: 'facturas/form/:clienteId', component: FacturasComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    ClientesService,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
