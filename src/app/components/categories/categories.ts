import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Category } from '../../models/transaction';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
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
