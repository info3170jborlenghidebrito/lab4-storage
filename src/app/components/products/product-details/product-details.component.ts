import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products: Product[];
  product: Product;
  secondParameter: number;

  constructor(
    private _productsService: ProductsService,
    private _cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {}

  addToCart(product: Product) {
    this._cartService.addItem(product, 1);
    window.alert('Your product has been added to the cart!');
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    console.log(this.route.title);
    // Part 1.1 - Research how to have a second argument to the product details route
    const productIdFromRoute = Number(routeParams.get('productId'));
    // Part 1.4 - In the product details, retrieve the argument value
    const rate = Number(routeParams.get('rate'));
    this.secondParameter = rate;

    this.products = this._productsService.getProducts();
    this.product = this.products.find(
      (product) => product.id === productIdFromRoute
    );
  }
}
