import { Component, Input } from '@angular/core';
import { TripRemove } from './trip-remove.modal';
import { AlertController } from '@ionic/angular';
import { TripRemoveService } from './trip-remove.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-remove',
  templateUrl: './trip-remove.component.html',
  styleUrls: ['./trip-remove.component.scss'],
})
export class TripRemoveComponent {

  @Input() remove_details: TripRemove; 

  constructor(
    private alertCtrl: AlertController,
    private tripRemoveService: TripRemoveService,
    private router: Router
  ) { }

  async bitDeleteAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: async () => {
            await this.tripRemoveService.trip_delete(
              this.remove_details
            ).subscribe( () => {
              this.router.navigateByUrl('/trip');
            });
          }
        }
      ]
    });

    await alert.present();
  }


}
