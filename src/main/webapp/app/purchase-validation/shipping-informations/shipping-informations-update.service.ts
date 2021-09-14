import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShippingInformationsUpdateService {
  constructor(private http: HttpClient) {}
}
