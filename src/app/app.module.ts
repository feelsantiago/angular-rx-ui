import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { ShopModule } from './shop/shop.module';

@NgModule({
    declarations: [AppComponent, HeaderComponent, CartComponent],
    imports: [BrowserModule, AppRoutingModule, ShopModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
