import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  panelOpenState: boolean = false;
  allOrders;
  viewUser;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
    this.allOrders = [];
    this.viewUser="";
  }

  ngOnInit() {
    this.getAllOrders();
  }
  getAllOrders() {
    this._httpService.getOrders()
      .subscribe(res=>{
        console.log('this is my res orders', res['orders']);
        this.allOrders = res['orders'];
      })
  }
  findUser(userId){
    console.log('user id is ', userId)
    this._httpService.getOneUser(userId)
      .subscribe(res=>{
        console.log('this is the user returned ', res[0].firstName)
        this.viewUser=res[0]
        console.log('view user ', this.viewUser.firstName)
      })
  }
}