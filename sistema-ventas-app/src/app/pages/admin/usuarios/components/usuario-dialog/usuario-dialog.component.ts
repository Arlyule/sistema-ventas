import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../../../../shared/models/usuario.interface';
import Swal from 'sweetalert2';
import { Rol } from '../../../../../shared/models/rol.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  titleButton = 'Guardar';
  actionTodo = Action.NEW;

  roles: Rol[] = [];

  userForm = this.fb.group({
    cveUsuario: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    cverol: ['', [Validators.required]],
    password: ['', [Validators.required,]],
    confirmPassword: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private userService: UserService,
    public dialogRef: MatDialogRef<UsuarioDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.userService.listarRoles()
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles: Rol[]) => {
        this.roles = roles;
        this.patchData();
      });
  }

  patchData(): void {
    if (this.data?.user?.cveusuario) {
      // Actualizar
      this.titleButton = 'Actualizar';
      this.actionTodo = Action.EDIT;
      this.userForm.patchValue({
        cveUsuario: this.data?.user.cveusuario,
        nombre: this.data?.user.nombre,
        apellidos: this.data?.user.apellidos,
        username: this.data?.user.username,
        cverol: this.data?.user.cverol,
      })

      this.userForm.get('username')?.disable();
      this.userForm.get('username')?.clearValidators();
      this.userForm.get('username')?.updateValueAndValidity();
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();

    } else {
      this.titleButton = 'Guardar';
      this.actionTodo = Action.NEW;
      console.log(this.userForm);
      this.userForm.get('cveusuario')?.disable();
    }
  }


  onSave() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.getRawValue();

    if (this.actionTodo === Action.NEW) {
      const newUser = {
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        username: formValue.username!,
        password: formValue.password!,
        cverol: parseInt(formValue.cverol!)
      };

      this.userService.createUser(newUser).pipe(takeUntil(this.destroy$)).subscribe(
        (data: Usuario) => {
          this.dialogRef.close(data);
          Swal.fire({
            title: 'Usuario creado',
            text: 'El usuario ha sido creado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      const updateUser = {
        cveusuario: parseInt(formValue.cveUsuario!),
        nombre: formValue.nombre!,
        apellidos: formValue.apellidos!,
        cverol: parseInt(formValue.cverol!)
      };

      this.userService.updateUser(updateUser).pipe(takeUntil(this.destroy$)).subscribe(
        (data: Usuario) => {
          this.dialogRef.close(data);
          Swal.fire({
            title: 'Usuario actualizado',
            text: 'El usuario ha sido actualizado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
