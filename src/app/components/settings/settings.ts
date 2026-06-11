import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.html',
})
export class Settings {
  constructor(private storage: StorageService) {}

  exportData(): void {
    const data = {
      transactions: this.storage.getTransactions(),
      categories: this.storage.getCategories(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gastos_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  clearData(): void {
    if (confirm('¿Eliminar todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.clear();
      window.location.reload();
    }
  }
}
