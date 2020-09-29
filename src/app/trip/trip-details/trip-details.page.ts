import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../trip.service';
import { TripView } from '../trip.modal';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/register/user.modal';
import { TripRemove } from 'src/app/common/trip-remove/trip-remove.modal';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {

  loadTrip: TripView;
  user_details : User;
  trip_remove: TripRemove;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tripService: TripService,
    private alertCtrl: AlertController,
    private authService: AuthService

    ) { }

  ngOnInit() {
    this.user_details = this.authService.getUser();
    console.log( this.user_details );
    this.activatedRoute.paramMap.subscribe( paramMap => {
      if(!paramMap.has('trip_id')){
        return;
      }
      
      const trip_id = paramMap.get('trip_id');
      
      this.tripService.getTripDetails( trip_id, this.user_details ).subscribe( res => {
        console.log(res);
        this.loadTrip = res;
      });

      this.trip_remove = {
        trip_id : parseInt(trip_id) || 0,
        user_id : parseInt(this.user_details.user_id) || 0
      }

    });
  }

  async bitAmountAlert() {

    
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Bit Amount',
      message: 'Min Amount Enter'+ this.loadTrip.bit_amount,
      inputs: [
        {
          name: 'bit',
          type: 'text',
          placeholder: 'BIT Amount'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async data => {

              await this.tripService.sendBit(  
                  this.loadTrip.trip_id.toString(), 
                  this.user_details, 
                  data.bit
                )
                .subscribe( res => {
                  console.log('hello', res);
                });
          }
        }
      ]
    });

    await alert.present();
  }

}
