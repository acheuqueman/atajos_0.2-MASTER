import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ROGallegosPage } from '../r-ogallegos/r-ogallegos';
import { MostrarTelefonosPage } from '../mostrar-telefonos/mostrar-telefonos';

import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-r-ogallegos',
  templateUrl: 'r-ogallegos.html'
})
export class ROGallegosPage {
  nombre : string;
  array_cantidad2 : any[];
  cat1 : any;
  cat2 : any;
  cat3 : any;
  cat4 : any;
  cat5 : any;
  cat6 : any;

  constructor(public navCtrl: NavController, private provider:AbstractItemsProvider,public http: HttpClient) {
    console.log("ROGallegosPage");
    this.nombre = provider.Localidad_Nombre;
    //Para que ande el post
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': ''
      })
    };

    this.ver_categorias();

  }// Fin constructor

  asign_cat(id_cat){
    /*
    this.provider.setCategoria(id_cat);
    console.log(this.provider.getCategoria())
    */
    this.provider.Categoria_id = id_cat;
    console.log(this.provider.Categoria_id);
    this.navCtrl.push(MostrarTelefonosPage);

  }
  /*
  goToROGallegos(params){
    if (!params) params = {};
    this.navCtrl.push(ROGallegosPage);
  }
  */

  ver_categorias(){
    var datos_consulta_cat = JSON.stringify({
      "localidad": this.provider.Localidad_id,
      
    }); //"tipo_localidad": this.provider.Tipo_localidad,

    var ip_categoria = this.provider.ip_carpeta+"consulta_categoria.php";
    console.log(ip_categoria);
    var array_cantidad = [];
    this.provider.ShowLoader();
    this.http
    .post<string>(ip_categoria,datos_consulta_cat) // (direccion php,JSON)
    .subscribe((data : any) => //data: informacion de recibe de los echos del php
    {
      console.log("Cantidad: "+data);
      this.provider.loading.dismiss();
      for(let i = 0; i < 7; i++){ ///+++ Recibe cada uno de los telefonos y sus datos
          //console.log(data[i]);
          array_cantidad.push({ 
              cant: data[i],
            });
            //console.log(array_cantidad[i]['cant']);
            if (array_cantidad[i]['cant'] >= 1)
            {
              var id_cat: string | null | undefined;
              id_cat = "cat_"+i;
              //console.log(id_cat);
              document.getElementById(id_cat).style.visibility = "visible";
            }
        }
        /*
        document.getElementById("espiner").style.visibility = "hidden";
        document.getElementById("espiner").style.position = "absolute";
        */
        //console.log(array_cantidad);
        this.array_cantidad2 = array_cantidad;
        this.array_cantidad2["uno"] = array_cantidad[1];
        //console.log(this.array_cantidad2);
        this.cat1 = array_cantidad[1]['cant'];
        this.cat2 = array_cantidad[2]['cant'];
        this.cat3 = array_cantidad[3]['cant'];
        this.cat4 = array_cantidad[4]['cant'];
        this.cat5 = array_cantidad[5]['cant'];
        this.cat6 = array_cantidad[6]['cant'];
    },
    (error : any) =>
    {
      this.provider.error_conexion();
    });
  }
}
