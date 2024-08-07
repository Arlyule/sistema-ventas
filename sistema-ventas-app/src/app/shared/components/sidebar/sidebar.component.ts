import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  menus: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.generateMenu();
  }

  private generateMenu(): void {
    this.menus.push(
      ...[
        { icon: 'home', name: 'Inicio', route: '/' },
        { icon: 'manage_accounts', name: 'Usuarios', route: 'admin/usuarios' },
        { icon: 'category', name: 'Categorias', route: 'admin/categorias' },
        { icon: 'inventory_2', name: 'Productos', route: 'admin/productos' },
        { icon: 'shopping_cart', name: 'Ventas', route: 'ventas/ventas' },
        { icon: 'content_paste', name: 'Reportes', route: 'ventas/reportes' },
      ]
    );
  }
}
