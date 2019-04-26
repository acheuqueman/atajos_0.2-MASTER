import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ROGallegosPage } from '../r-ogallegos/r-ogallegos';
import { MunicipiosPage } from '../municipios/municipios';
import { ComisionesDeFomentosPage } from '../comisiones-de-fomentos/comisiones-de-fomentos';
import { ParajesPage } from '../parajes/parajes';
import { UrgenciasPage } from '../urgencias/urgencias';
import { CloudTabDefaultPagePage } from '../cloud-tab-default-page/cloud-tab-default-page';
import {CartTabDefaultPagePage} from '../cart-tab-default-page/cart-tab-default-page';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = HomePage;
  tab2Root: any = CloudTabDefaultPagePage;
  tab3Root: any = CartTabDefaultPagePage;
  constructor(public navCtrl: NavController) {
    console.log("Pagina: tab-controller");
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }goToROGallegos(params){
    if (!params) params = {};
    this.navCtrl.push(ROGallegosPage);
  }goToMunicipios(params){
    if (!params) params = {};
    this.navCtrl.push(MunicipiosPage);
  }goToComisionesDeFomentos(params){
    if (!params) params = {};
    this.navCtrl.push(ComisionesDeFomentosPage);
  }goToParajes(params){
    if (!params) params = {};
    this.navCtrl.push(ParajesPage);
  }goToUrgencias(params){
    if (!params) params = {};
    this.navCtrl.push(UrgenciasPage);
  }
}
