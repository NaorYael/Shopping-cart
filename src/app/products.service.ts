import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "./models/product";
import {switchMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products$ = new BehaviorSubject<Product[]>([]);

  get products() {
    if (!this.hasProduct()) {
      if (this.getProductsFromLocalStorage()) {
        this.products$.next(JSON.parse(this.getProductsFromLocalStorage()) as Product[]);
        return this.products$;
      }
      return this.getProducts().pipe(take(1)).pipe(
        switchMap(response => {
          this.products$.next(response);
          return this.products$;
        }));
    }
    return this.products$.asObservable();
  }

  constructor(private http: HttpClient) {
  }

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../assets/products.json');
  }

  private hasProduct(): boolean {
    return this.products$.getValue().length > 0;
  }

  public removeFromCart(product: Product) {
    const prod: Product[] = this.products$.getValue();
    const index = prod.indexOf(product, 0);
    if (index > -1) {
      prod.splice(index, 1);
      this.products$.next(prod);
      this.setProductsInLocalStorage(this.products);
    }
  }

  public decreaseProductAmount(product: Product) {
    const prod: Product[] = this.products$.getValue();
    const index = prod.indexOf(product, 0);
    if (index > -1) {
      if ((prod[index].amount > 0)) {
        prod[index].amount--;
        this.products$.next([...prod]);
        this.setProductsInLocalStorage(this.products);
      }
    }

  }

  public increaseProductAmount(product: Product) {
    const prod: Product[] = this.products$.getValue();
    const index = prod.indexOf(product, 0);
    if (index > -1) {
      prod[index].amount++;
      this.products$.next([...prod]);
      this.setProductsInLocalStorage(this.products);
    }

  }

  get totalPrice() {
    let sum = 0;
    this.products$.getValue().forEach(p => sum += (p.amount * p.price))
    return sum;
  }

  get isMoreThatForProductsInCart(): boolean {
    return this.products$.getValue().length > 4;
  }


  public setProductsInLocalStorage(products$: Observable<Product[]>) {
    localStorage.setItem('products', JSON.stringify(this.products$.getValue()));
  }

  public getProductsFromLocalStorage() {
    return localStorage.getItem('products');
  }


}
