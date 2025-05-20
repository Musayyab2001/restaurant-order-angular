import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-location-map',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.scss'],
})
export class LocationMapComponent {
  searchTerm = '';

  restaurants = [
    { id: 1, name: 'Pizza Mario', address: 'Musterstraße 1, Berlin' },
    { id: 2, name: 'Burger Queen', address: 'Testweg 3, Hamburg' },
    { id: 3, name: 'Asia Palace', address: 'Beispielallee 7, München' },
  ];

  constructor(private router: Router) {}

  filteredRestaurants() {
    const term = this.searchTerm.toLowerCase();
    return this.restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.address.toLowerCase().includes(term)
    );
  }

  selectRestaurant(restaurant: any) {
    this.router.navigate(['/products'], {
      queryParams: { restaurantId: restaurant.id },
    });
  }
}
