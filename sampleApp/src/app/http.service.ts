import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class HttpService {

  constructor(private _http: HttpClient) { }

  // products
  getProducts() {
    return this._http.get('/api/samples');
  }
  getOneProduct(id) {
    return this._http.get(`/api/samples/${id}`);
  }
  createProduct(newObj) {
    return this._http.post('/api/samples', newObj);
  }
  deleteProduct(id) {
    return this._http.delete(`/api/samples/${id}`);
  }
  updateProduct(id, newObj) {
    return this._http.put(`/api/samples/${id}`, newObj)
  }
  searchBarResult(id, newObj) {
    return this._http.post(`/search/${id}`, newObj);
  } 
  // users
  getUsers() {
    return this._http.get('/api/users');
  }
  getOneUser(id) {
    return this._http.get(`/api/users/${id}`);
  }
  createUser(newObj) {
    return this._http.post('/api/users', newObj);
  }
  deleteUser(id) {
    return this._http.delete(`/api/users/${id}`);
  }
  updateUser(id, newObj) {
    return this._http.put(`/api/users/${id}`, newObj)
  }
  // orders
  getOrders() {
    return this._http.get('/api/orders');
  }
  getOneOrder(id) {
    return this._http.get(`/api/orders/${id}`);
  }
  getLastOrder() {
    return this._http.get(`/api/orders/last`);
  }
  createOrder(newObj) {
    return this._http.post('/api/orders', newObj);
  }
  updateOrder(id, newObj) {
    return this._http.put(`/api/orders/${id}`, newObj)
  }
  // sample-orders
  getSampleOrders() {
    return this._http.get('/api/sampleorders');
  }
  getOneSampleOrder(id) {
    return this._http.get(`/api/sampleorders/${id}`);
  }
  createSampleOrder(newObj) {
    return this._http.post('/api/sampleorders', newObj);
  }
  updateSampleOrder(id, newObj) {
    return this._http.put(`/api/sampleorders/${id}`, newObj)
  }
}

