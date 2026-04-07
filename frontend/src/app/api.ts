import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private url = 'http://127.0.0.1:8000/api/calculadora/';

  constructor(private http: HttpClient) { }

  calcularOperacion(a: number, b: number, operacion: string) {
    const datos = {
      a: a,
      b: b,
      operacion: operacion
    };
    return this.http.post(this.url, datos);
  }
}