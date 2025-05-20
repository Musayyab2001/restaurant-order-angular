import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  cartService = inject(CartService);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ data: Product[] }>('http://localhost:1337/api/products?populate=*')
      .subscribe((response) => {
        this.products = response.data.map((p: Product) => {
          const firstImage = p.image?.[0]; // first image from array
          const imageUrl = firstImage
            ? 'http://localhost:1337' +
              (firstImage.formats?.small?.url || firstImage.url)
            : null;

          return {
            ...p,
            imageUrl,
          };
        });
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl ?? '',
      quantity: 1,
    });
  }
}
