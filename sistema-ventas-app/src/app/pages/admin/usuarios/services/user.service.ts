import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Usuario } from '../../../../shared/models/usuario.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from '../../../../shared/models/rol.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.API_URL}/users`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,) { }

  // Obtener todos los usuarios
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { headers: { "requireToken": "true" } })
      .pipe(
        catchError(this.handlerError)
      );
  }

  listarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${environment.API_URL}/general/roles`, { headers: { "requireToken": "true" } })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: { "requieredToken": "true" } })
      .pipe(
        catchError(this.handlerError)
      );
  }

  // Crear un nuevo usuario
  createUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, user, { headers: { "requieredToken": "true" } })
      .pipe(
        catchError(this.handlerError)
      );
  }

  // Actualizar un usuario existente
  updateUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl, user, { headers: { "requieredToken": "true" } })
      .pipe(
        catchError(this.handlerError)
      );
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: { "requieredToken": "true" } })
      .pipe(
        catchError(this.handlerError)
      );
  }

  private handlerError(error: any) {
    var errorMessage = 'Ocurrió un error';

    if (error.error) {
      if (error.error.message) errorMessage = error.error.message;
      else errorMessage = 'Ocurrió un error';
    }

    this.snackBar.open(errorMessage, '', { duration: 3000 });

    return throwError(() => {
      new Error(errorMessage);
    });
  }
}
