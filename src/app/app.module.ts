import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProtectedHomeComponent } from './protected-home/protected-home.component';
import { HttpClientModule } from '@angular/common/http';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    ProtectedHomeComponent,
    AddressDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
