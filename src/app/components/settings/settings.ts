import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <h2>Ajustes</h2>
    <mat-card>
      <mat-card-header><mat-card-title>Datos</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>Tus datos se guardan localmente en este dispositivo (navegador).</p>
        <p>Puedes exportarlos o eliminarlos:</p>
        <div class="actions">
          <button mat-raised-button color="primary" (click)="exportData()">
            Exportar datos (JSON)
          </button>
          <button mat-raised-button color="warn" (click)="clearData()">
            Eliminar todos los datos
          </button>
        </div>
      </mat-card-content>
    </mat-card>
    <mat-card style="margin-top:16px">
      <mat-card-header><mat-card-title>App instalable</mat-card-title></mat-card-header>
      <mat-card-content>
        <p>En tu navegador móvil, usa "Añadir a pantalla de inicio" para usar esta app sin conexión.</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .actions { display: flex; gap: 12px; flex-wrap: wrap; }
  `]
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
