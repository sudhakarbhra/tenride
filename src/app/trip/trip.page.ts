import { Component, OnInit } from '@angular/core';
import { TripService } from './trip.service';
import { TripList } from './trip.modal';
import { User } from '../auth/register/user.modal';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {
  user_details : User;
  tripLists : TripList[] ;
  constructor( 
    private tripService: TripService,
    private authService: AuthService
   ) { }

  ngOnInit() {
    this.user_details = this.authService.getUser();
    this.tripService.getAllTripLists( this.user_details ).subscribe(res => {
      this.tripLists = res;
    });
  }



}
