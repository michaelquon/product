import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

    getProducts(){
      console.log("got to service")
      return this._http.get('/product');
    }
    addProduct(newProduct){
      return this._http.post('/product', newProduct)
    }
    deleteProduct(id){
      console.log("An product was deleted")
      return this._http.delete('/product/'+id)
    }
    getOneProduct(id){
      console.log("got to service", id)
      return this._http.get('/product/'+id)
    }
    editProduct(product){
      console.log("edit services has been updated",product._id)
      return this._http.put('/product/'+product._id, product)
  }
}
