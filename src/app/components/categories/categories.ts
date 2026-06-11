import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../services/storage.service';
import { Category } from '../../models/transaction';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  template: `
    <h2>Categorías</h2>
    <mat-card *ngFor="let c of categories" class="cat-card">
      <mat-card-content>
        <div class="cat-row">
          <mat-icon [style.color]="c.color">{{ c.icon }}</mat-icon>
          <span class="cat-name">{{ c.name }}</span>
          <mat-form-field class="budget-field">
            <mat-label>Presupuesto mensual</mat-label>
            <input matInput type="number" [(ngModel)]="c.budget" (change)="save()" placeholder="0">
          </mat-form-field>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .cat-card { margin-top: 8px; }
    .cat-row { display: flex; align-items: center; gap: 16px; }
    .cat-name { flex: 1; font-size: 1.1rem; }
    .budget-field { width: 180px; }
  `]
})
export class Categories implements OnInit {
  categories: Category[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.categories = this.storage.getCategories();
  }

  save(): void {
    this.storage.saveCategories(this.categories);
  }
}
