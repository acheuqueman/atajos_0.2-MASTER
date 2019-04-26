import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ROGallegosPage } from '../pages/r-ogallegos/r-ogallegos';
import { MunicipiosPage } from '../pages/municipios/municipios';
import { ComisionesDeFomentosPage } from '../pages/comisiones-de-fomentos/comisiones-de-fomentos';
import { ParajesPage } from '../pages/parajes/parajes';
import { UrgenciasPage } from '../pages/urgencias/urgencias';
import { HomePage } from '../pages/home/home';

import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import {TasksServiceProvider } from '../providers/tasks-service/tasks-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = TabsControllerPage;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      androidPermissions: AndroidPermissions,
      public sqlite: SQLite,
      public tasksService: TasksServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      androidPermissions.requestPermissions(
        [
          //androidPermissions.PERMISSION.CAMERA, 
          androidPermissions.PERMISSION.CALL_PHONE, 
          //androidPermissions.PERMISSION.GET_ACCOUNTS, 
          //androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
          //androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );
      this.createDatabase();
      //this.createDatabase_numeros()
      //this.tasksService.insert_prueba();
    }); //Fin platform ready
  }
  goToROGallegos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ROGallegosPage);
  }goToMunicipios(params){
    if (!params) params = {};
    this.navCtrl.setRoot(MunicipiosPage);
  }goToComisionesDeFomentos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ComisionesDeFomentosPage);
  }goToParajes(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ParajesPage);
  }goToUrgencias(params){
    if (!params) params = {};
    this.navCtrl.setRoot(UrgenciasPage);
  }
  //Crea la base de datos en SQLite
  private createDatabase(){
    this.sqlite.create({
      name: 'contactos_local.db',
      location: 'default' // the location field is required
    })
    .then((db : SQLiteObject) => {
      console.log("Base de datos: "+db);
      this.tasksService.setDatabase(db);
      //this.tasksService.prueba_borrartabla(); ////  Borra contenido de tabla contactos_local
      this.tasksService.createTable_contactos();
      return this.tasksService.createTable_numeros();
    })
    .catch(error =>{
      console.error(error);
    });
  }

  /*
  private createDatabase_numeros(){
    this.sqlite.create({
      name: 'numeros.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log(db);
      this.tasksService.setDatabase(db);
      return this.tasksService.createTable();
    })
    .catch(error =>{
      console.error(error);
    });
  }
  */

} //Fin Clase
