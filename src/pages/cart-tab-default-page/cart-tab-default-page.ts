import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {TasksServiceProvider } from '../../providers/tasks-service/tasks-service';

import {DetallesPage} from '../detalles/detalles';

@Component({
  selector: 'page-cart-tab-default-page',
  templateUrl: 'cart-tab-default-page.html'
})
export class CartTabDefaultPagePage {

  contactos: any[];

  constructor(
    public navCtrl: NavController,
    public tasksService: TasksServiceProvider) {
    //console.log("Pagina: cart-tab");
  }

  //Recibe el contenido de la tabla utilizando funcion de provider
  getAllTasks(){
    this.tasksService.getAll()
    .then(tasks => {
      this.contactos = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }

  /*
  ionViewDidLoad(){ 
    //this.tasksService.insert_prueba();
    this.getAllTasks();
  }
  */

  ionViewDidEnter() {
    this.getAllTasks();
  }

  ver_detalles(item){
    //console.log(item);
    
    this.navCtrl.push(DetallesPage, {
      item:item
    });
  }
}
