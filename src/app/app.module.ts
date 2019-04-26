import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CameraTabDefaultPagePage } from '../pages/camera-tab-default-page/camera-tab-default-page';
import { CartTabDefaultPagePage } from '../pages/cart-tab-default-page/cart-tab-default-page';
import { CloudTabDefaultPagePage } from '../pages/cloud-tab-default-page/cloud-tab-default-page';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { HomePage } from '../pages/home/home';
import { ROGallegosPage } from '../pages/r-ogallegos/r-ogallegos';
import { MunicipiosPage } from '../pages/municipios/municipios';
import { ComisionesDeFomentosPage } from '../pages/comisiones-de-fomentos/comisiones-de-fomentos';
import { ParajesPage } from '../pages/parajes/parajes';
import { UrgenciasPage } from '../pages/urgencias/urgencias';
import { MostrarTelefonosPage } from '../pages/mostrar-telefonos/mostrar-telefonos';
import { DetallesPage } from '../pages/detalles/detalles';
import { ContactoPage } from '../pages/contacto/contacto';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AbstractItemsProvider } from '../providers/abstract-items/abstract-items';

//Imports Ionic
import { AndroidPermissions } from '@ionic-native/android-permissions';
import {CallNumber} from '@ionic-native/call-number';

//Imports Angular
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SQLite } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';

@NgModule({
  declarations: [
    MyApp,
    CameraTabDefaultPagePage,
    CartTabDefaultPagePage,
    CloudTabDefaultPagePage,
    TabsControllerPage,
    HomePage,
    ROGallegosPage,
    MunicipiosPage,
    ComisionesDeFomentosPage,
    ParajesPage,
    UrgenciasPage,
    MostrarTelefonosPage,
    DetallesPage,
    ContactoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraTabDefaultPagePage,
    CartTabDefaultPagePage,
    CloudTabDefaultPagePage,
    TabsControllerPage,
    HomePage,
    ROGallegosPage,
    MunicipiosPage,
    ComisionesDeFomentosPage,
    ParajesPage,
    UrgenciasPage,
    MostrarTelefonosPage,
    DetallesPage,
    ContactoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AbstractItemsProvider, //Provider agregado automaticamente
    AndroidPermissions,
    HttpClientModule,
    CallNumber,
    HttpClient,
    SQLite,
    TasksServiceProvider
  ]
})
export class AppModule {}