import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ROGallegosPage } from '../r-ogallegos/r-ogallegos';
import { MunicipiosPage } from '../municipios/municipios';
import { ComisionesDeFomentosPage } from '../comisiones-de-fomentos/comisiones-de-fomentos';
import { ParajesPage } from '../parajes/parajes';
import { UrgenciasPage } from '../urgencias/urgencias';
import {ContactoPage} from '../contacto/contacto';

import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //prueba : string;
  //AbstractItemsProvider:AbstractItemsProvider;
  localidad : number;
  ip_wamp = 'http://localhost/Atajos/get_telefonos.php';

  constructor(public navCtrl: NavController, private provider:AbstractItemsProvider, public http: HttpClient) {
    console.log("Pagina: Home");
    //this.prueba = AbstractItemsProvider.getUserName();
    //console.log(this.prueba);
    this.provider.Tipo_localidad = 0;

    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };

    //this.provider.probar_conexion();
    

  }// Fin constructor

  goToROGallegos(params){
    //this.localidad = this.AbstractItemsProvider.setLocalidad();
    //this.provider.setLocalidad(29);
    this.provider.Localidad_id = 29;
    this.provider.Tipo_localidad = 1;
    this.provider.Localidad_Nombre = "Rio Gallegos";
    if (!params) params = {};
    this.navCtrl.push(ROGallegosPage);
  }
  
  goToMunicipios(params){
    this.provider.Tipo_localidad = 2;
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }
  goToComisionesDeFomentos(params){
    this.provider.Tipo_localidad = 3;
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }
  goToParajes(params){
    this.provider.Tipo_localidad = 4;
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }
  goToOtros(params){
    this.provider.Tipo_localidad = 5;
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }
  goToUrgencias(params){
    if (!params) params = {};
    this.navCtrl.push(UrgenciasPage);
  }
  goToContacto(params){
    if (!params) params = {};
    this.navCtrl.push(ContactoPage);
  }

  
}
