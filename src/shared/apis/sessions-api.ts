import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@shared/models/user';

@Injectable({ providedIn: 'root' })
export class SessionsApi {
  private http = inject(HttpClient);

  get(): Observable<User[]> {
    return this.http.get<User[]>(`sessions`);
  }

  kick(id: string): Observable<void> {
    return this.http.post<void>(`sessions/kick`, { id });
  }

  clear(): Observable<void> {
    return this.http.post<void>(`sessions/clear`, {});
  }
}
