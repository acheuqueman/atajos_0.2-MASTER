import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarTelefonosPage } from './mostrar-telefonos';

@NgModule({
  declarations: [
    MostrarTelefonosPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarTelefonosPage),
  ],
})
export class MostrarTelefonosPageModule {}
