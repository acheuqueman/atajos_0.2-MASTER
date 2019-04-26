import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';

import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';
import {TasksServiceProvider } from '../../providers/tasks-service/tasks-service';

import {
  GoogleMaps,
  GoogleMap,
  //GoogleMapsEvent,
  Marker,
  //GoogleMapsAnimation,
  //MyLocation,
  //Environment,
  Geocoder,
  GeocoderResult,
} from '@ionic-native/google-maps';

/**
 * Generated class for the DetallesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {
  item: any;
  imagen: any;
  constructor(
    public navCtrl: NavController, 
    private provider:AbstractItemsProvider, 
    public navParams: NavParams, 
    private CallNumber:CallNumber,
    public tasksService: TasksServiceProvider) {
    this.item = navParams.get('item');
    //console.log(this.item);
    this.set_imagen();
    this.loadMap1();
    //console.log("Pagina web: " + this.item.pagina);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DetallesPage');
    if (this.item.pagina == ""){
      document.getElementById("pagina_boton").style.visibility = "hidden";
      document.getElementById("pagina_boton").style.position = "absolute";
      //angular.element( document.querySelector( '#some-id' ) );
    }
  }

  InsertarFavorito(){
    this.tasksService.InsertFavorito(this.item);
  }

  Llamar(numero){
    /*
    this.CallNumber.callNumber(numero,true)
    .then(res => console.log("Funco",res))
    .catch(err => console.log("No Funco",err))
    */
   this.provider.Llamar(numero);
  }

  set_imagen(){
    //console.log(this.provider.Categoria_id);

    //console.log("Categoria: "+this.item['categoria']);
    var categoria = this.item['categoria'];

    if(categoria == 1 ){
      this.imagen = '../../assets/imgs/categ1.png';
    }
    else if(categoria ==2){
      this.imagen = '../../assets/imgs/categ2.png';
    }
    else if(categoria ==3){
      this.imagen = '../../assets/imgs/categ3.png';
    }
    else if(categoria ==4){
      this.imagen = '../../assets/imgs/categ4.png';
    }
    else if(categoria ==5){
      this.imagen = '../../assets/imgs/categ5.png';
    }
  }

map1: GoogleMap;
search_address: any;
isRunning: boolean = false;

loadMap1() { //Funcion para crear el mapa
  //this.search_address = this.item['nombre'] + " , " + this.item['direccion'] + " , " + this.item['nombre_localidad'] + ", Santa Cruz";
  this.search_address = this.item['nombre'] + " " + this.item['direccion'] + " " + this.item['nombre_localidad'] + " Santa Cruz";
  //this.search_address = "Julia Doufour";
  //console.log("Search adress: "+this.search_address);
  this.map1 = GoogleMaps.create('map_canvas1');
  // Address -> latitude,longitude
  Geocoder.geocode({
    "address": this.search_address //Direccion ingresada
  }).then((results: GeocoderResult[]) => {
    //console.log(results);

    if (!results.length) {
      this.isRunning = false;
      return null;
    }

    // Add a marker
    let marker: Marker = this.map1.addMarkerSync({
      'position': results[0].position,
      'title':  this.item['nombre']
    });

    // Move to the position
    this.map1.animateCamera({
      'target': marker.getPosition(),
      'zoom': 16
    }).then(() => {
      marker.showInfoWindow();
      this.isRunning = false;
    });
  });

}
 
}
