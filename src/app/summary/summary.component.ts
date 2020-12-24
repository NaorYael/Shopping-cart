import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private service: ProductsService) {
  }

  ngOnInit(): void {
    this.products$ = this.service.products;
  }

  getTotalPrice() {
    return this.service.totalPrice;
  }

  isMoreThatForProductsInCart() {
    return this.service.isMoreThatForProductsInCart;
  }

  onRemove(product: Product) {
    this.service.removeFromCart(product)
  }
}
