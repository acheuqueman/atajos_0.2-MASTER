import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { DetallesPage } from '../detalles/detalles';

/**
 * Generated class for the MostrarTelefonosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-telefonos',
  templateUrl: 'mostrar-telefonos.html',
})
export class MostrarTelefonosPage {

  items: any[];
  busqueda: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private provider:AbstractItemsProvider) {
    console.log("Pagina: Mostrar-telefonos");
    //Para que ande el post
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };

    this.busqueda = navParams.get('busqueda');
    //console.log("Busqueda: " + this.busqueda);
    if (this.busqueda != true)
    {
      this.cargar_telefonos();
    } else if (this.busqueda == true) {
      this.items = this.provider.items;
      

      //this.provider.Categoria_id = this.items
    }
  }

  /*
  ocultar_spiner(){
    console.log(document.getElementById("espiner2"));
    document.getElementById("espiner2").style.visibility = "hidden";
      document.getElementById("espiner2").style.position = "absolute";
  }
  */

  ionViewDidLoad() {
    
    if (this.busqueda == true){
      //console.log("Busqueda true");
      //this.ocultar_spiner();
      this.provider.loading.dismiss();
      this.busqueda = false;
    }
  }
  //++ Hacer esto funcion de provider para que usen lo mismo mostrar-telefonos.ts y el buscador
  cargar_telefonos(){
    //console.log("Cargar Telefonos:");
    var longitud : any;
    
    this.items = [];

    ///+++ Convierte a JSON los datos que se le quiere enviar al php

    var datos_consulta = JSON.stringify({
      "localidad": this.provider.Localidad_id,
      "categoria": this.provider.Categoria_id,
      "tipo_localidad": this.provider.Tipo_localidad,
      "busqueda":"false",
      "buscando": "false"
    });
    console.log("Datos Consulta: " +datos_consulta);
    var ip_gettelefonos = this.provider.ip_carpeta+"get_telefonos.php"; //Direccion del php
    ///+++ post subscribe que manda y recibe del php, 
    console.log(ip_gettelefonos);
    this.provider.ShowLoader();
    this.http.post<string>(ip_gettelefonos,datos_consulta) // (direccion php,JSON)
    .subscribe((data : any) => //data: informacion de recibe del php
    {
      this.provider.loading.dismiss();
      longitud = data['lenght'];
      //console.log("lengh consulta: "+longitud);
      //console.log("Input del php"+data['json']);
      for(let i = 0; i < longitud; i++){ //Recibe cada uno de los telefonos y sus datos
        this.items.push({ 
            nombre: data[i]['nombre'],
            direccion: data[i]['direccion'],
            telefono: data[i]['telefono'],
            pagina: data[i]['pagina'],
            categoria: data[i]['categoria'],
            nombre_localidad: data[i]['nombre_localidad'],
            id: data[i]['id']
          });
      } //Fin For
      
    },
    (error : any) =>
    {
      this.provider.error_conexion();
    });
  } //Fin

  ver_detalles(item){
    //console.log(item);
    this.navCtrl.push(DetallesPage, { //Cambia a la pagina "detalles" enviando variable
      item:item
    });
  }
}
