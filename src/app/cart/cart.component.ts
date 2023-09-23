import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { SnackbarService } from '../shared/services/snackbar.service';
import { Product } from '../shared/interfaces/product';
import { RESPONSES, SNACKBAR_MESSAGES } from '../shared/const';
import { MatDialog } from '@angular/material/dialog';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  emptyCartText = 'CART IS EMPTY. TRY ADDING SOME PRODUCTS TO MAKE YOUR CART FEEL GOOD'
  cartTotalValue: number = 0
  cartProducts: Product[] = []

  constructor(private productService: ProductService, private dialog: MatDialog,
    private snackbar: SnackbarService) {
    this.fetchCartProducts()
  }

  fetchCartProducts(): void {
    this.cartProducts = this.productService.getProductsInCart()
    this.cartTotalValue = this.calculateTotalCartValue()
  }

  calculateTotalCartValue(): number {
    return this.cartProducts.reduce((total, product) => {
      return (total += product.discount_price);
    }, 0)
  }


  deleteProductFormCart(product: Product): void {
    const { id, name } = product;
    this.productService.deleteProductFromCart(id);
    this.snackbar.show(
      `${name} ${SNACKBAR_MESSAGES.REMOVE_PRODUCT_FROM_CART}`,
      RESPONSES.SUCCESS
    );
    this.fetchCartProducts();
  }

  addAddress(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      disableClose: true,
      data: { cartTotalValue: this.cartTotalValue },
      width: '50%',
    })
    dialogRef.afterClosed().subscribe(response => {
      if (response === RESPONSES.SUCCESS) {
        this.productService.placeOrder()
        this.snackbar.show(SNACKBAR_MESSAGES.ORDER_SUCCESS, RESPONSES.SUCCESS)
        this.fetchCartProducts();
      }
    })
  }
}
