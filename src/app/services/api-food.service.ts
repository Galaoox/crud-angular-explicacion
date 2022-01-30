import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiFoodService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get(environment.api + 'food');
  }

  crear(datos: any){
    return this.http.post(environment.api + 'food/add', datos);
  }

  eliminar(_id: string){
    return this.http.delete(environment.api + 'food/delete/' + _id);
  }

  editar(datos: any, _id: string){
    return this.http.put(environment.api + 'food/edit/' + _id, datos);
  }

}
