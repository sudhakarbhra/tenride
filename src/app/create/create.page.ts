import { Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-create",
  templateUrl: "./create.page.html",
  styleUrls: ["./create.page.scss"],
})
export class CreatePage {
  constructor(private http: HttpClient) {}

  onCreate() {
    const token = localStorage.getItem("token"),
      url = "http://tencompass.com/development/driver_api/api",
      headers = new HttpHeaders({
        Authodication: "Bearer " + token,
      });

    this.http
      .post(`${url}/create`, "body", {
        headers,
      })
      .subscribe(console.log);
  }
}
