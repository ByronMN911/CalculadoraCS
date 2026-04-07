// Importamos Injectable, una herramienta que permite usar este archivo en todo el proyecto
import { Injectable } from '@angular/core';
// Importamos HttpClient, que es el motor que Angular usa para enviar y recibir datos por internet
import { HttpClient } from '@angular/common/http';

// Esta etiqueta le dice a Angular que este servicio está disponible desde la raíz del proyecto
@Injectable({
  providedIn: 'root',
})
export class Api {
  // Definimos la dirección web exacta donde nuestro servidor Django está esperando la información
  private url = 'http://127.0.0.1:8000/api/calculadora/';

  // Preparamos nuestro "cartero" HTTP para que esté listo al momento de enviar datos
  constructor(private http: HttpClient) { }

  // Esta función se activa cuando el usuario presiona el botón "=" en la calculadora
  // Recibe los dos números y la palabra de la operación que el usuario eligió
  calcularOperacion(a: number, b: number, operacion: string) {
    // Empaquetamos los datos sueltos en un solo bloque organizado (formato JSON)
    const datos = {
      a: a,
      b: b,
      operacion: operacion
    };
    // Utilizamos el método POST para enviar nuestro paquete de datos a la dirección de Django.
    // Usamos POST en lugar de GET porque estamos enviando información para que el servidor la procese.
    return this.http.post(this.url, datos);
  }
}