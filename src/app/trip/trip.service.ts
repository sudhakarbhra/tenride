import { Injectable } from "@angular/core";
import { TripList, TripView, BitUpdate } from "./trip.modal";
import { User } from "../auth/register/user.modal";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class TripService {
  private url = "http://tencompass.com/development/driver_api/api";

  constructor(private http: HttpClient) {}

  getAllTripLists(user: User): Observable<TripList[]> {
    return this.http.post<TripList[]>(`${this.url}/triplist.php`, {
      user_id: user.user_id,
    });
  }

  getTripDetails(trip_id: string, user: User): Observable<TripView> {
    return this.http.post<TripView>(`${this.url}/trip_detail.php`, {
      trip_id: trip_id,
      user_id: user.user_id,
    });
  }

  sendBit(
    trip_id: string,
    user: User,
    bit_amount: string
  ): Observable<BitUpdate> {
    return this.http.post<BitUpdate>(`${this.url}/sendbit.php`, {
      trip_id: trip_id,
      user_id: user.user_id,
      bit_amount: bit_amount,
    });
  }
}
