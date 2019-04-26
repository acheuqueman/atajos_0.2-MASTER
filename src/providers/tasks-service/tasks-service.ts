import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';

//PUTO EL QUE LEE
/*
  Generated class for the TasksServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksServiceProvider {

  db: SQLiteObject = null;

  constructor(
    public http: HttpClient,
    public AlertController: AlertController) {
    //console.log('Hello TasksServiceProvider Provider');
  }

  //Elige Database creada
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  prueba_borrartabla(){
    let sql2 = 'DROP TABLE numeros_local';
    this.db.executeSql(sql2, [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
    let sql = 'DROP TABLE contactos_local';
    return this.db.executeSql(sql, [])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
;
  }

  createTable_contactos(){
    //let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    let sql = 'CREATE TABLE IF NOT EXISTS contactos_local(id INTEGER PRIMARY KEY, nombre_localidad TEXT, nombre TEXT, direccion TEXT, pagina TEXT, categoria INTERGER)';
    return this.db.executeSql(sql, [])
      .then(() => console.log('Creada tabla contactos_local'))
      .catch(e => console.log(e));

  }

  createTable_numeros(){
    //let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    let sql = 'CREATE TABLE IF NOT EXISTS numeros_local(id_numero INTEGER PRIMARY KEY AUTOINCREMENT, id_contacto INTERGER, numero_numero INTERGER)';
    return this.db.executeSql(sql, [])
      .then(() => console.log('Creada tabla numeros_local'))
      .catch(e => console.log(e));

  }

  getAll(){
    let sql = 'SELECT * FROM contactos_local'; //Consulta obtener todos contactos de favoritos
    return this.db.executeSql(sql, [])  //Ejecuta consulta
    .then(response_contacto => {
      //console.log("contactos lenght "+response.rows.length);
      let tasks = [];
      for (let index = 0; index < response_contacto.rows.length; index++) { 
        tasks[index] = response_contacto.rows.item(index); //Contacto guardado en array
        tasks[index]['telefono'] = [];
        //console.log(tasks[index]['id']);
        let sql_gettelefonos = 'SELECT * FROM numeros_local WHERE id_contacto=?'; //Obtener telefonos de contacto de index actual
        this.db.executeSql(sql_gettelefonos, [tasks[index]['id']])
          .then(response_num => {
            //console.log("Response lenght: "+response.rows.length);
            let numeros = [];
            for (let i =0;i<response_num.rows.length;i++){
              numeros[i] = response_num.rows.item(i);
              console.log("id_contacto: "+numeros[i]['id_contacto']);
              console.log("numero_numero: "+numeros[i]['numero_numero']);
              tasks[index]['telefono'].push(numeros[i]['numero_numero']);
              //console.log("Response rows: "+numeros[i]['numero_numero']);
            }
          })
          .catch(error => Promise.reject(error));
      }
      return Promise.resolve( tasks );
    })
  
    .catch(error => Promise.reject(error));
  }

  insert(task: any){
    let sql = 'INSERT INTO tasks(title, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [task.title, task.completed])
      .then(() => console.log('Executed SQL'))
      .catch(e => console.log(e));
}

  
  InsertFavorito(item){
    //console.log("Entro InsertFavorito");
    var flag:any;
    let sql_select = 'SELECT * FROM contactos_local WHERE id=?';
    this.db.executeSql(sql_select,item['id']).then((data) => {
          //console.log("Lenght: "+data.rows.length);
          //console.log("Exito select"); //Si existe que lo elimine
          if (data.rows.length >= 1){
            /*
            const alert = this.AlertController.create({
              title: 'Favorito repetido',
              subTitle: '',
              buttons: ['OK']
            });
            alert.present();
            let sql_delete = 'DELETE FROM contactos_local WHERE id=?';
            return this.db.executeSql(sql_delete, item['id']);
            */
          } else {
              let sql = 'INSERT INTO contactos_local(id,nombre_localidad,nombre,direccion,pagina,categoria) VALUES(?,?,?,?,?,?)';
              /*
              console.log(
                item['id'] + " - " +
                item['nombre_localidad'] + " - " +
                item['nombre'] + " - " +
                item['direccion'] + " - " +
                item['pagina'] + " - " +
                item['categoria']
              );
              */
              return this.db.executeSql(sql, [item['id'],item['nombre_localidad'],item['nombre'],item['direccion'],item['pagina'],item['categoria']])
                .then(() => {
                  console.log('Insertado Favorito');
                  const alert = this.AlertController.create({
                    title: 'Favorito guardado',
                    subTitle: '',
                    buttons: ['OK']
                  });
                  alert.present();
                  { //inserta telefonos
                  //console.log("Lenght telefono: "+item['telefono'].length);
                  for (let i = 0; i<item['telefono'].length;i++)
                  {
                    let sql_telefono = 'INSERT INTO numeros_local(id_contacto,numero_numero) VALUES (?,?)';
                    this.db.executeSql(sql_telefono,[item['id'],item['telefono'][i]])
                    .then(() => {
                      console.log("Telefono insertado " +item['telefono'][i]);
                      })
                    .catch(e => {
                      console.log("Error telefono");
                    });
                  }
                  }
                  })
                .catch(e => {
                  const alert = this.AlertController.create({
                    title: 'Ya existe en favoritos',
                    subTitle: '',
                    buttons: ['OK']
                  });
                  alert.present();
                });
                    }
          }) //Fin then
          .catch(e => {
              console.log("Error select"); //Si no existe que lo agrege
          }); 
  }
  
  /*
  update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

  delete(task: any){
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

  */

}
