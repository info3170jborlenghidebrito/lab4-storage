import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './components/services/shopping-cart.service';
import { Observable, Observer, Subscription } from 'rxjs';
import { Product } from './components/models/product';
import { CartItem } from './components/models/cart-item';
import { ShoppingCart } from './components/models/shopping-cart';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public cart: Observable<ShoppingCart>;
  public cartItems: CartItem[];
  // itemCount hold the number of items in the Shopping Cart
  public itemCount: number;
  // hold the quantity of different products in the shopping Cart
  public sumDifferentProducts: number;

  // subscription 1 from the observable ShoppingCart that update the badge
  private _cartSubscription: Subscription;
  // subscription 2 from the observable ShoppingCart that count the sum of different products
  private _sumSubscription: Subscription;

  //injection of the cart service where we can access the observable
  constructor(private _cartService: ShoppingCartService) {}

  // initialize the component - ready to start the subscription
  public ngOnInit(): void {
    // get the cart updated
    this.cart = this._cartService.get();

    // update of the itemCount using the _cartSubscription
    this._cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items
        .map((x) => x.quantity)
        .reduce((p, n) => p + n, 0);
    });

    // new subscription - Part 2 - Exercise 1:
    this._sumSubscription = this.cart.subscribe((cart) => {
      // array to store the productIds
      let productIds = [];
      productIds = cart.items.map((x) => x.productId);

      // get just the unique productIds
      let uniqueProductIds = [...new Set(productIds)];

      // sum of unique productIds
      this.sumDifferentProducts = uniqueProductIds.length;
      console.log('sum', this.sumDifferentProducts);
    });
  }

  public ngOnDestroy(): void {}
}
