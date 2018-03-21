import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProducts: any;
  error = '';

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newProducts = {title: "", price: Number, imageurl: ""}
  }
  addProduct(){
    let observable = this._httpService.addProduct(this.newProducts);
    observable.subscribe(data =>{
      if(data['error']){
        this.error = data['error']['errors']['title']['message']
      }
     
      else{
        console.log("A product was added", data)
        this.newProducts = {title: "", price: Number, imageurl: ""}
        this.getHome()
      }
    })
  }
    getHome(){
      this._router.navigate(['/list'])
    
  }
}
