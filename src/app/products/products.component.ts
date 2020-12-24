import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ProductsService} from "../products.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(private service: ProductsService) {
  }

  ngOnInit(): void {
    this.products$ = this.service.products;
  }

  onRemove(product) {
    this.service.removeFromCart(product);
  }

  onIncrease(product) {
    this.service.increaseProductAmount(product);
  }

  onDecrease(product) {
    this.service.decreaseProductAmount(product);
  }
}

