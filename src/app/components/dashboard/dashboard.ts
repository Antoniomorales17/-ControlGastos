import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  balance = { totalIncome: 0, totalExpense: 0, balance: 0 };
  months: { month: string; income: number; expense: number }[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.refresh();
  }

  private refresh(): void {
    this.balance = this.storage.getBalance();
    this.months = this.storage.getMonthlySummary();
  }
}
