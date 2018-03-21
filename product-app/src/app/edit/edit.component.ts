import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productName: any
  error = ""
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.productName = {title: "", price: Number, imageurl: ""}
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params)=>{
      this.getOneProduct(params['id'])
    })
  }
  getOneProduct(id){
    let observable = this._httpService.getOneProduct(id)
    observable.subscribe(data=>{
      this.productName = data['data']
    })
  }
  getHome(){
    this._router.navigate(['/list'])
  }
  deleteProduct(id){
    let observable = this._httpService.deleteProduct(id);
    observable.subscribe(data =>{

    })
    this.getHome();
  }
  addProduct(){
    if(this.productName.title.length <=4){
      this.error = "Title must be more than 4 characters long"
    }
    else{
      let observable = this._httpService.editProduct(this.productName)
      observable.subscribe(data =>{
        this.productName = {title: "", price: Number, imageurl: ""}
        console.log("Ive been updated")
        this.getHome();
      })
      
    }
    
  }
  
}
