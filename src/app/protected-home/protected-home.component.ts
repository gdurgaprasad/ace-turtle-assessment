import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-protected-home',
  templateUrl: './protected-home.component.html',
  styleUrls: ['./protected-home.component.scss']
})
export class ProtectedHomeComponent {
currentCartCount:number = 0

  constructor(private productService:ProductService){
    this.productService.cartSubject.subscribe(response=>{
     this.currentCartCount = response
    })
  }

}
