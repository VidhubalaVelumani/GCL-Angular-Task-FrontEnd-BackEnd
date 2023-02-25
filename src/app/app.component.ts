import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import{Product} from './model/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'methods';
  allProducts:Product[]=[];
  isFetching :boolean=false;

  constructor(private http: HttpClient){

  }
  ngOnInit(){
    this.fetchProducts();


  }

  onProductsFetch(){
    this.fetchProducts();
  }

  onEmployeeCreate(products :{eName: string, add:string,salary:bigint, domain:string}){
    console.log(products);
    const headers=new HttpHeaders({'myHeader' : 'procademy'});
    this.http.post<{name:String}>
    ('https://angularproject-2f916-default-rtdb.firebaseio.com//products.json',
    products,{headers : headers})
    .subscribe((res)=>{
    console.log(res);
    }
    );
}
private fetchProducts(){
  this.isFetching=true;
  this.http.get<{[key:string]:Product}>('https://angularproject-2f916-default-rtdb.firebaseio.com//products.json')
  .pipe(map((res:{[key:string]: Product})=>{
    const products =[];

    for(const key in res){ 
      if(res.hasOwnProperty(key)){
      products.push({...res[key],id:key})

    }

  }
  return products;
}))
  .subscribe((products)=>{
    console.log(products);
    this.allProducts=products ;
    this.isFetching=false;
  })
 
}
onDeleteProduct(id:String){
this.http.delete('https://angularproject-2f916-default-rtdb.firebaseio.com//products/'+id+'.json')
.subscribe();    
}

onDeleteAllProduct(){
  this.http.delete('https://angularproject-2f916-default-rtdb.firebaseio.com//products/.json')
  .subscribe();    
  }
}


