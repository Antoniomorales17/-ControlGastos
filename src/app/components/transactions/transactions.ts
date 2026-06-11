import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Transaction, Category } from '../../models/transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  newTxn: Partial<Transaction> = { type: 'expense', amount: undefined, description: '', date: new Date(), category: '' };

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.transactions = this.storage.getTransactions().reverse();
    this.categories = this.storage.getCategories();
  }

  add(): void {
    if (!this.newTxn.amount || !this.newTxn.category) return;
    const t: Transaction = {
      id: crypto.randomUUID(),
      type: this.newTxn.type as 'income' | 'expense',
      amount: Number(this.newTxn.amount),
      category: this.newTxn.category,
      description: this.newTxn.description || this.newTxn.category,
      date: this.newTxn.date || new Date(),
      createdAt: new Date(),
    };
    this.storage.saveTransaction(t);
    this.transactions.unshift(t);
    this.newTxn = { type: 'expense', amount: undefined, description: '', date: new Date(), category: '' };
  }

  delete(id: string): void {
    this.storage.deleteTransaction(id);
    this.transactions = this.transactions.filter(t => t.id !== id);
  }

  getCategoryColor(name: string): string {
    return this.categories.find(c => c.name === name)?.color || '#999';
  }

  getCategoryIcon(name: string): string {
    return this.categories.find(c => c.name === name)?.icon || 'help';
  }
}
