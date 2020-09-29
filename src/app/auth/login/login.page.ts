import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  
  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit (){
    if(!this.authService.getUser() ){
        this.router.navigateByUrl('/trip');
    }
  }

  emailRegEx = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

  form = new FormGroup({    
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
      message: 'Login in ...'
    });
    await loading.present();
    this.authService.login(this.form.value).subscribe(
      async () => {
        loading.dismiss();
        this.router.navigateByUrl('/trip');
      },
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Login in Faild',
          buttons: ['OK']
        });
        await alert.present();
        loading.dismiss();
      }
    ); 
  }
}
