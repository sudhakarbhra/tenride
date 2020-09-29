import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }
  emailRegEx = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  form = new FormGroup({
    first_name: new FormControl('',  [ 
        Validators.required,
        Validators.minLength(3)
    ]),
    last_name: new FormControl('', [ 
        Validators.required,
        Validators.minLength(3)
    ]),
    email: new FormControl('', [ 
        Validators.required,
        Validators.pattern(this.emailRegEx)
    ]),
    password: new FormControl('', [ 
        Validators.required,
        Validators.minLength(3)
    ]),
  })

  async onSubmit(){
    const loading = await this.loadingCtrl.create({
      message: 'Registering...'
    });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      async (result) => {
        
        const toast = await this.toastCtrl.create({
          message: 'User Created',
          duration: 2000,
          color: 'dark'
        });
        await toast.present();
        this.form.reset();
        loading.dismiss();
      },
      async (result) => {
        console.log(result);
        const alert = await this.alertCtrl.create({
          message: 'This is an error',
          buttons: ['OK']
        });
        await alert.present();
        loading.dismiss();
      }
    ); 
  }

}
