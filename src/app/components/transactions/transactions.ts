import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StorageService } from '../../services/storage.service';
import { Transaction, Category } from '../../models/transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatDatepickerModule, MatNativeDateModule],
  template: `
    <h2>Movimientos</h2>
    <mat-card>
      <mat-card-content>
        <div class="form-row">
          <mat-form-field>
            <mat-label>Tipo</mat-label>
            <mat-select [(ngModel)]="newTxn.type">
              <mat-option value="income">Ingreso</mat-option>
              <mat-option value="expense">Gasto</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Importe</mat-label>
            <input matInput type="number" [(ngModel)]="newTxn.amount" placeholder="0">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Categoría</mat-label>
            <mat-select [(ngModel)]="newTxn.category">
              <mat-option *ngFor="let c of categories" [value]="c.name">{{ c.name }}</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Descripción</mat-label>
            <input matInput [(ngModel)]="newTxn.description" placeholder="Opcional">
          </mat-form-field>
          <mat-form-field>
            <mat-label>Fecha</mat-label>
            <input matInput [matDatepicker]="picker" [(ngModel)]="newTxn.date">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="add()">
            <mat-icon>add</mat-icon> Añadir
          </button>
        </div>
      </mat-card-content>
    </mat-card>
    <mat-card *ngFor="let t of transactions" class="txn-card">
      <mat-card-content>
        <div class="txn-row">
          <mat-icon [style.color]="getCategoryColor(t.category)">{{ getCategoryIcon(t.category) }}</mat-icon>
          <div class="txn-info">
            <strong>{{ t.description || t.category }}</strong>
            <small>{{ t.date | date:'dd/MM/yyyy' }} · {{ t.category }}</small>
          </div>
          <span class="txn-amount" [class.income]="t.type==='income'" [class.expense]="t.type==='expense'">
            {{ t.type === 'income' ? '+' : '-' }}{{ t.amount | number:'1.2-2' }} €
          </span>
          <button mat-icon-button (click)="delete(t.id)"><mat-icon color="warn">delete</mat-icon></button>
        </div>
      </mat-card-content>
    </mat-card>
    <p *ngIf="!transactions.length">No hay movimientos registrados.</p>
  `,
  styles: [`
    .form-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: baseline; }
    .form-row mat-form-field { flex: 1; min-width: 120px; }
    .txn-card { margin-top: 8px; }
    .txn-row { display: flex; align-items: center; gap: 12px; }
    .txn-info { flex: 1; display: flex; flex-direction: column; }
    .txn-info small { color: #666; }
    .txn-amount { font-weight: bold; font-size: 1.1rem; }
    .income { color: #4CAF50; } .expense { color: #F44336; }
  `]
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  categories: Category[] = [];
  newTxn: Partial<Transaction> = { type: 'expense', amount: 0, description: '', date: new Date(), category: '' };

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
    this.newTxn = { type: 'expense', amount: 0, description: '', date: new Date(), category: '' };
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
