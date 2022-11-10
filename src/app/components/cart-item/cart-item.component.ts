import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // input from the parent element (shopping cart) to show each cart item
  @Input() cart: Product | null = null;
}
