import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  sample;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
    this.sample = {styleNo:"", status:"", color:"", season:"", description:"", location:""};
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getProduct(params['id']);
      console.log('this is id, ', params['id'])
    });
  }
  getProduct(id) {
    this._httpService.getOneProduct(id)
      .subscribe(res=>{
        this.sample = res['sample'][0];
        console.log('sample received back ', this.sample)
      })
  }
  onEdit() {
    console.log('id', this.sample.id, 'obj,', this.sample)
    let o = this._httpService.updateProduct(this.sample.id, this.sample);
    o.subscribe(res => {
    })
  }
}
