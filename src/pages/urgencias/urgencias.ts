import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CallNumber} from '@ionic-native/call-number';

import {AbstractItemsProvider} from '../../providers/abstract-items/abstract-items';

@Component({
  selector: 'page-urgencias',
  templateUrl: 'urgencias.html'
})
export class UrgenciasPage {

  constructor(public navCtrl: NavController, private CallNumber:CallNumber, private provider:AbstractItemsProvider) {
  }

  Llamar(numero){
    /*
    this.CallNumber.callNumber(numero,true)
    .then(res => console.log("Funco",res))
    .catch(err => console.log("No Funco",err))
    */
   this.provider.Llamar(numero);
  }
  
}
