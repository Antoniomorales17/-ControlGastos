import { Injectable } from '@angular/core';
import { Transaction, Category } from '../models/transaction';

const STORAGE_KEYS = {
  transactions: 'cg_transactions',
  categories: 'cg_categories',
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Nómina', icon: 'work', color: '#4CAF50', budget: 0 },
  { id: '2', name: 'Freelance', icon: 'laptop', color: '#2196F3', budget: 0 },
  { id: '3', name: 'Alquiler', icon: 'home', color: '#FF5722' },
  { id: '4', name: 'Comida', icon: 'restaurant', color: '#FF9800' },
  { id: '5', name: 'Transporte', icon: 'directions_car', color: '#9C27B0' },
  { id: '6', name: 'Luz/Gas', icon: 'bolt', color: '#F44336' },
  { id: '7', name: 'Seguros', icon: 'shield', color: '#607D8B' },
  { id: '8', name: 'Ocio', icon: 'sports_esports', color: '#E91E63' },
  { id: '9', name: 'Salud', icon: 'local_hospital', color: '#00BCD4' },
  { id: '10', name: 'Otros', icon: 'more_horiz', color: '#795548' },
];

@Injectable({ providedIn: 'root' })
export class StorageService {
  getTransactions(): Transaction[] {
    const data = localStorage.getItem(STORAGE_KEYS.transactions);
    return data ? JSON.parse(data).map((t: any) => ({ ...t, date: new Date(t.date), createdAt: new Date(t.createdAt) })) : [];
  }

  saveTransaction(t: Transaction): void {
    const list = this.getTransactions();
    list.push(t);
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(list));
  }

  deleteTransaction(id: string): void {
    const list = this.getTransactions().filter(x => x.id !== id);
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(list));
  }

  getCategories(): Category[] {
    const data = localStorage.getItem(STORAGE_KEYS.categories);
    return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
  }

  saveCategories(cats: Category[]): void {
    localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(cats));
  }

  getBalance(): { totalIncome: number; totalExpense: number; balance: number } {
    const txns = this.getTransactions();
    const totalIncome = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  }

  getMonthlySummary(): { month: string; income: number; expense: number }[] {
    const txns = this.getTransactions();
    const map = new Map<string, { income: number; expense: number }>();
    txns.forEach(t => {
      const key = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
      const curr = map.get(key) || { income: 0, expense: 0 };
      if (t.type === 'income') curr.income += t.amount;
      else curr.expense += t.amount;
      map.set(key, curr);
    });
    return Array.from(map.entries()).map(([month, v]) => ({ month, ...v })).sort((a, b) => a.month.localeCompare(b.month));
  }
}
