import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';

import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { MostrarTelefonosPage } from '../mostrar-telefonos/mostrar-telefonos';

@Component({
  selector: 'page-cloud-tab-default-page',
  templateUrl: 'cloud-tab-default-page.html'
})
/*
@ViewChild('searchbox')({
  searchbox_html: ElementRef
})
*/
export class CloudTabDefaultPagePage {

  items: any[];
  constructor(public navCtrl: NavController, public http: HttpClient, private provider:AbstractItemsProvider) {
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };
  }

  //++ Hacer esto funcion de provider para que usen lo mismo mostrar-telefonos.ts y el buscador
  buscar_contacto(busqueda_text){
    //console.log(this.searchbox_html.nativeElement.innerText);
    var longitud : any;
    this.items = [];
    ///+++ Convierte a JSON los datos que se le quiere enviar al php
    var datos_consulta = JSON.stringify({
      "localidad": "false",
      "categoria": "false",
      "tipo_localidad": "false",
      "busqueda": busqueda_text,
      "buscando": "true"
    });
    console.log(datos_consulta);
    var ip_gettelefonos = this.provider.ip_carpeta+"get_telefonos.php"; //Direccion del 
    console.log(ip_gettelefonos);
    ///+++ post subscribe que manda y recibe del php, 
    this.provider.ShowLoader();
    this.http
    .post<string>(ip_gettelefonos,datos_consulta) // (direccion php,JSON)
    .subscribe((data : any) => //data: informacion de recibe de los echos del php
    {
      longitud = data['lenght'];
      console.log("lengh consulta: "+longitud);
      for(let i = 0; i < longitud; i++){ ///+++ Recibe cada uno de los telefonos y sus datos
        //console.log(data[i]);
        this.items.push({ 
            nombre: data[i]['nombre'],
            direccion: data[i]['direccion'],
            telefono: data[i]['telefono'],
            pagina: data[i]['pagina'],
            categoria: data[i]['categoria'],
            nombre_localidad: data[i]['nombre_localidad'],
            id: i
          });
      } //Fin For
      console.log(this.items);
      this.provider.items = this.items; 
      this.navCtrl.push(MostrarTelefonosPage, { //Que vaya a pagina detalles
        busqueda : true
      });
    },
    (error : any) =>
    {

    });
  }

  
}
