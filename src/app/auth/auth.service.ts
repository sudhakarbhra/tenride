import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, from, BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { Platform } from "@ionic/angular";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map, switchMap, take } from "rxjs/operators";
import { decode } from "punycode";
import { User } from "./register/user.modal";

const helper = new JwtHelperService();
const TOKEN_KEY = "Secret key";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
  private url = "http://tencompass.com/development/driver_api/api";

  constructor(
    private stroage: Storage,
    private http: HttpClient,
    private plt: Platform,
    private router: Router
  ) {
    this.loadStrordToken();
  }

  loadStrordToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.stroage.get(TOKEN_KEY));
      }),
      map((token) => {
        console.log("token form storage", token);
        if (token) {
          let decoded = helper.decodeToken(token);
          console.log("decode form storage", decoded);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.stroage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl("/");
      this.userData.next(null);
    });
  }

  register(user: User) {
    return this.http.post(`${this.url}/register.php`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.url}/login.php`, user).pipe(
      take(1),
      map((res) => {
        console.log(res["token"]);
        return res["token"];
      }),
      switchMap((token) => {
        let decoded = helper.decodeToken(token);
        console.log("login form storage", decoded);
        this.userData.next(decode);

        let storageObj = from(this.stroage.set(TOKEN_KEY, token));

        return storageObj;
      })
    );
  }
}
