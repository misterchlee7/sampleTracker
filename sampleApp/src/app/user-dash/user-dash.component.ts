import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
  samples;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
    this.samples = [];
  }

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this._httpService.getProducts()
      .subscribe(res=>{
        this.samples = res['samples'];
        console.log(this.samples)
      })
  }
}
