import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

import { UserResponse, User } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tarea, TareaResponse } from '@app/shared/models/tarea.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private router: Router) {}

  getTareasUsuario(usuarioId: number): Observable<TareaResponse[]> {
    return this.http
      .get<TareaResponse[]>(
        `${environment.API_URL}/tareas/tareasUsuario/${usuarioId}`
      )
      .pipe(
        map((tareas: TareaResponse[]) => {
          return tareas;
        }),
        catchError((error) => {
          window.alert(error.error.message);
          return [];
        })
      );
  }

  newTareasUsuario(tarea: Tarea): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/tareas`, tarea).pipe(
      catchError((err) => {
        return 'ok';
      })
    );
  }

  updateTareasUsuario(tareaId: number, tarea: User): Observable<any> {
    return this.http
      .patch<any>(`${environment.API_URL}/tareas/${tareaId}`, tarea)
      .pipe(
        catchError((err) => {
          return 'ok';
        })
      );
  }

  deleteTareasUsuario(tareaId: number): Observable<{}> {
    return this.http
      .delete<User>(`${environment.API_URL}/tareas/${tareaId}`)
      .pipe(
        catchError((err) => {
          return 'ok';
        })
      );
  }
}
