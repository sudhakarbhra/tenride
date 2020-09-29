import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ){}
  
  canActivate( route: ActivatedRouteSnapshot ): Observable<boolean>{
    return this.authService.user.pipe(
      take(1),
      map(user => {
        console.log('in can ativate: ', user);
        
        if(!user){
          /*this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You are not allowed to access the page',
            buttons: ['OK'],
  
          })
          .then( alert => alert.present() );*/
          this.router.navigateByUrl('/');
          
          return false;
        }
        return true;

      })
    );
  }


  
}
