import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  products = []

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ){}
  ngOnInit() {
    this.getProducts()
  }
  getProducts(){
    let observable = this._httpService.getProducts();
    observable.subscribe(data => {console.log("Got our Products", data)
    this.products = data['data']
  })
  }
  deleteProduct(id){
    let observable = this._httpService.deleteProduct(id);
    observable.subscribe(data =>{
      
    })
    this.getProducts()
    console.log("Author deleted successfully!")
  }
  updateProduct(id){
    this._router.navigate(['/edit/'+id])
  }
  getHome(){
    this._router.navigate(['/home'])
  }
  getCreate(){
    this._router.navigate(['/create'])
  }
}
