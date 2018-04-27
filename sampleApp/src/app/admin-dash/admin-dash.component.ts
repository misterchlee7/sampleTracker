import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
selector: 'app-admin-dash',
templateUrl: './admin-dash.component.html',
styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  samples;
  selectFilter;
  cartItems;
  cartCount;
  querySituation;
  id;
  queryId;
  query;
  colorQueryChk;
  showColor;
  error;

constructor(public dialog: MatDialog, private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
  this.cartItems=[];
  this.cartCount=0;
  this.query = {styleNo:"", color:"", season:""};
}

  ngOnInit() {
    this.getAll();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(AdminCartConfirmDialog, {
      height: '400px',
      width: '600px',
      data: { cartItems: this.cartItems, cartCount: this.cartCount }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAll() {
    this._httpService.getProducts()
      .subscribe(res=>{
        this.samples = res['samples'];
        console.log(this.samples)
      })
  }
