import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <h2>Resumen financiero</h2>
    <div class="cards">
      <mat-card class="card income">
        <mat-card-header>
          <mat-icon mat-card-avatar>arrow_upward</mat-icon>
          <mat-card-title>Ingresos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>{{ balance.totalIncome | number:'1.0-2' }} €</h3>
        </mat-card-content>
      </mat-card>
      <mat-card class="card expense">
        <mat-card-header>
          <mat-icon mat-card-avatar>arrow_downward</mat-icon>
          <mat-card-title>Gastos</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>{{ balance.totalExpense | number:'1.0-2' }} €</h3>
        </mat-card-content>
      </mat-card>
      <mat-card class="card balance" [class.negative]="balance.balance < 0">
        <mat-card-header>
          <mat-icon mat-card-avatar>account_balance</mat-icon>
          <mat-card-title>Balance</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <h3>{{ balance.balance | number:'1.0-2' }} €</h3>
        </mat-card-content>
      </mat-card>
    </div>
    <mat-card class="monthly-card">
      <mat-card-header><mat-card-title>Últimos meses</mat-card-title></mat-card-header>
      <mat-card-content>
        <table *ngIf="months.length">
          <tr><th>Mes</th><th>Ingresos</th><th>Gastos</th><th>Balance</th></tr>
          <tr *ngFor="let m of months.slice(-6)">
            <td>{{ m.month }}</td>
            <td class="income">{{ m.income | number:'1.0-0' }} €</td>
            <td class="expense">{{ m.expense | number:'1.0-0' }} €</td>
            <td [class.negative]="m.income - m.expense < 0">{{ m.income - m.expense | number:'1.0-0' }} €</td>
          </tr>
        </table>
        <p *ngIf="!months.length">Aún no hay movimientos. Añade tu primer ingreso o gasto.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px; }
    .card h3 { font-size: 1.8rem; margin: 8px 0; }
    .income { color: #4CAF50; } .expense { color: #F44336; }
    .negative { color: #F44336 !important; }
    table { width: 100%; border-collapse: collapse; }
    td, th { padding: 8px; text-align: left; border-bottom: 1px solid #e0e0e0; }
    th { font-weight: 500; color: #666; }
    .monthly-card { margin-top: 16px; }
  `]
})
export class Dashboard implements OnInit {
  balance = { totalIncome: 0, totalExpense: 0, balance: 0 };
  months: { month: string; income: number; expense: number }[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.balance = this.storage.getBalance();
    this.months = this.storage.getMonthlySummary();
  }
}
