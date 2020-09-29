import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TripRemove } from "./trip-remove.modal";

@Injectable({
  providedIn: "root",
})
export class TripRemoveService {
  private url = "http://tencompass.com/development/driver_api/api";

  constructor(private http: HttpClient) {}

  trip_delete(tripRemove: TripRemove): Observable<any> {
    return this.http.post<any>(`${this.url}/trip_delete.php`, tripRemove);
  }
}
