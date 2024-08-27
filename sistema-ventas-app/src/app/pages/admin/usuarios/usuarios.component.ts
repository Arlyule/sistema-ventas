import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../shared/models/usuario.interface';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UserService } from './services/user.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  private destroy$ = new Subject<any>();
  usuarios: Usuario[] = [];

  dataSource = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayColumns: string[] = ['nombre', 'apellidos', 'username', 'rol', 'acciones'];

  constructor(private dialog: MatDialog, private userService: UserService) {
    this.loadUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUsuarios(): void {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(
      (usuarios: Usuario[]) => {
        this.dataSource.data = usuarios
      }
    )
  }

  onOpenModal(user: Usuario | {} = {}): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      maxWidth: '100%',
      width: '80%',
      data: { user },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }

  onDelete(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.loadUsuarios();
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado con éxito.',
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
