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
    this.cartItems=[];
    this.cartCount=0;
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
  onEdit(id) {
    this._router.navigate(['/admin/edit/product', id]);
  }
  onDelete(id) {
    let o = this._httpService.deleteProduct(id);
    o.subscribe(res=>{
      this.getAll();
    })
  }
  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }
    return false;
  }
  onAdd(id) {
    console.log('cart items: ',this.cartItems)
    let o = this._httpService.getOneProduct(id);
    o.subscribe(res=>{
      if (!(this.containsObject(res['sample'][0], this.cartItems))) {
        this.cartItems.push(res['sample'][0]);
      } else {
        this.error = "This item has already been added to your cart";
      }
      this.cartCount = this.cartItems.length;
    })
    this.error="";
  }
  checkQuerySituation(){
    if(!this.colorQueryChk){
      this.querySituation = 2;
    }
    if(this.colorQueryChk){
      this.querySituation = 1;
    }
  }
  checkQueryId(){
    switch(this.querySituation){
      case 1:
        this.id = 1;
        break;
      case 2:
        this.id = 2;
        break;
    }
  }
  onSearch(){
    this.checkQuerySituation();
    this.checkQueryId();
    let o = this._httpService.searchBarResult(this.id, this.query);
  //  console.log("o is ", o)
    o.subscribe(res => {
      console.log("switch query case res is ", res)
    })
  }
  colorQuery(){
      this.showColor = !this.showColor;
      this.colorQueryChk = !this.colorQueryChk;
      if(!this.colorQueryChk){
        this.query = {styleNo:"", season:""};
      }
  }
  removeFromCart(index) {
    this.error="";
    this.cartItems.splice(index, 1);
    this.getAll()
  }
}

@Component({
selector: 'admin-cart-confirm-dialog',
templateUrl: 'admin-cart-confirm-dialog.html',
})
export class AdminCartConfirmDialog implements OnInit {
cartItems;
cartCount;
users;
selected;
orderType;
orderId;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router){
    this.cartItems = data.cartItems;
    this.cartCount = data.cartCount;
    this.orderType="Borrow";
    this.orderId = "";
  }
  ngOnInit() {
    this._httpService.getUsers()
      .subscribe(res=>{
        // sort the user objects by alphabetical order
        this.users=res;
      })
  }
  onConfirm() {
    // create new order!
    console.log('creating order: selected user (userFK) is ',this.selected, 'will have these items: ', this.cartItems, 'type of order: ', this.orderType);

    let obj={users_id: this.selected, type:this.orderType};
    this._httpService.createOrder(obj)
      .subscribe(res=>{
        this.orderId = res['insertId'];
        for (var i = 0; i < this.cartItems.length; i++) {
          let sampleOrderObj = {orders_id: this.orderId, samples_id: this.cartItems[i].id};
          console.log('testing ', sampleOrderObj)
          this._httpService.createSampleOrder(sampleOrderObj)
          .subscribe(res=>{
                console.log('created sample order ', res);
              })
          this._httpService.changeStatus(this.cartItems[i].id, {status:"Unavailable"})
              .subscribe(res=>{
                console.log('changed status, ', res)
              })
        }
      });
    this.cartItems=[];
    this.cartCount=0;
    this._router.navigate(['/admin/dash']);
  }
}
