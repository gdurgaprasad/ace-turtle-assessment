import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Product } from '../shared/interfaces/product';
import { SnackbarService } from '../shared/services/snackbar.service';
import { RESPONSES, SNACKBAR_MESSAGES } from '../shared/const';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  loading: boolean = false
  allProducts: Product[] = []

  constructor(private productService: ProductService, private snackbar: SnackbarService) {
    this.fetchAllProducts()
  }

  fetchAllProducts(): void {
    this.loading = true
    this.productService.fetchAllProducts().subscribe({
      next: (result) => {
        this.allProducts = result;
        console.log(result)
      },
      error: (e) => this.snackbar.show(e, RESPONSES.FAILED),
      complete: () => this.loading = false
    })
  }

  addToCart(product: Product): void {
    this.productService.addProductToCart(product)
    this.snackbar.show(`${product.name} ${SNACKBAR_MESSAGES.ADD_TO_CART_SUCCESS}`, RESPONSES.SUCCESS)
  }
}
