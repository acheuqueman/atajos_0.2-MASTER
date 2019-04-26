import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'; //// Para que tome al php
//import { HttpHeaders } from '@angular/common/http';
import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';
import { ROGallegosPage } from '../r-ogallegos/r-ogallegos';
import { MostrarTelefonosPage } from '../mostrar-telefonos/mostrar-telefonos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-municipios',
  templateUrl: 'municipios.html'
})
export class MunicipiosPage {
  items: any[];
  longitud : any;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    private provider:AbstractItemsProvider,
    public loadingCtrl: LoadingController) {
    if (this.provider.Tipo_localidad >= 3){
      this.provider.Categoria_id = 0;
    }
   
    this.items = [];
    var ip_getmunicipios = this.provider.ip_carpeta+"get_municipios.php";
    var longitud : any;
    var datos_consulta = JSON.stringify({
    "tipo_localidad": this.provider.Tipo_localidad, //municipo, paraje, etc
    });
    console.log("Datos consulta municipio:" + datos_consulta );
    this.provider.ShowLoader();
    this.http
    .post<string>(ip_getmunicipios,datos_consulta)
    .subscribe((data : any) =>
    {
      this.provider.loading.dismiss();
      this.longitud = data['lenght'];
      for(let i = 0; i < this.longitud; i++){
        //console.log(data[i][0]);
          this.items.push({
            nombre: data[i]['nombre_municipio'],
            id_municipio: data[i]['id_municipio'],
            id: i
          });  
      } //Fin For
      /*
      document.getElementById("espiner3").style.visibility = "hidden";
      document.getElementById("espiner3").style.position = "absolute";
      */
    },
    (error : any) =>
    {
      this.provider.error_conexion();
    });

  } //Fin constructor

  ver_municipio(municipio,nombre){
    console.log("ID municipio seleccionado: "+municipio);
    this.provider.Localidad_id = municipio;
    this.provider.Localidad_id = +this.provider.Localidad_id;
    this.provider.Localidad_Nombre = nombre;
    if (this.provider.Tipo_localidad == 1 || this.provider.Tipo_localidad == 2 )
    {
      this.navCtrl.push(ROGallegosPage);
    }else{
      this.navCtrl.push(MostrarTelefonosPage);
    }
  }
  
}
