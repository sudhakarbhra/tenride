import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripRemove } from './trip-remove.modal';

@Injectable({
  providedIn: 'root'
})
export class TripRemoveService {
  private url = 'http://localhost/ragu/ionic_tenride/api';
  
  constructor(
    private http: HttpClient
  ) { }


  trip_delete( tripRemove: TripRemove ): Observable<any>{
    return this.http.post<any>( `${this.url}/trip_delete.php`, tripRemove)
  }

}
