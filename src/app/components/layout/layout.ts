import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Control de Gastos</span>
    </mat-toolbar>
    <mat-drawer-container>
      <mat-drawer #drawer mode="push">
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard">
            <mat-icon matListItemIcon>dashboard</mat-icon> Resumen
          </a>
          <a mat-list-item routerLink="/transactions">
            <mat-icon matListItemIcon>receipt</mat-icon> Movimientos
          </a>
          <a mat-list-item routerLink="/categories">
            <mat-icon matListItemIcon>category</mat-icon> Categorías
          </a>
          <a mat-list-item routerLink="/settings">
            <mat-icon matListItemIcon>settings</mat-icon> Ajustes
          </a>
        </mat-nav-list>
      </mat-drawer>
      <mat-drawer-content>
        <div class="content">
          <router-outlet />
        </div>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [`
    mat-toolbar { position: sticky; top: 0; z-index: 10; }
    mat-drawer-container { height: calc(100vh - 64px); }
    mat-drawer { width: 250px; }
    .content { padding: 16px; max-width: 800px; margin: 0 auto; }
  `]
})
export class Layout {}
