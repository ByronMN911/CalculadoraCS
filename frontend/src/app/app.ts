import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  pantalla: string = '0'; 
  numeroA: number | null = null;
  operacionActual: string | null = null;
  esperandoSegundoNumero: boolean = false;

  cargando: boolean = false;
  errorBackend: string | null = null;
  advertencia: string | null = null; // Nueva variable para el mensaje

  constructor(private apiService: Api) {}

  agregarNumero(num: string) {
    this.advertencia = null; // Limpiamos la advertencia si empieza a escribir de nuevo

    // NUEVA VALIDACIÓN DE CALIDAD: 
    // Si el usuario quiere poner un punto, y la pantalla YA tiene un punto, cancelamos la acción.
    if (num === '.' && this.pantalla.includes('.')) {
      return; 
    }

    if (this.esperandoSegundoNumero) {
      // Si el segundo número empieza directamente con un punto, ponemos "0." por estética
      this.pantalla = num === '.' ? '0.' : num; 
      this.esperandoSegundoNumero = false;
    } else {
      // Si la pantalla tiene un 0 y presiona un número (que no sea punto), lo reemplaza.
      // Si presiona un punto, se lo pega al cero (0.)
      if (this.pantalla === '0' && num !== '.') {
        this.pantalla = num;
      } else {
        this.pantalla += num;
      }
    }
  }

  seleccionarOperacion(op: string) {
    // Validamos si el usuario intenta encadenar una tercera operación
    if (this.numeroA !== null && !this.esperandoSegundoNumero) {
      this.advertencia = 'Solo puedes hacer operaciones de 2 en 2. Presiona "=" para calcular primero.';
      return; // Detenemos la ejecución aquí
    }

    this.advertencia = null;
    this.numeroA = parseFloat(this.pantalla);
    this.operacionActual = op;
    this.esperandoSegundoNumero = true;
  }

  limpiar() {
    this.pantalla = '0';
    this.numeroA = null;
    this.operacionActual = null;
    this.esperandoSegundoNumero = false;
    this.errorBackend = null;
    this.advertencia = null; // Limpiamos la advertencia al reiniciar
  }

  calcular() {
    if (this.numeroA !== null && this.operacionActual !== null) {
      const numeroB = parseFloat(this.pantalla);
      
      this.cargando = true;
      this.errorBackend = null;
      this.advertencia = null; // Limpiamos la advertencia al calcular

      this.apiService.calcularOperacion(this.numeroA, numeroB, this.operacionActual)
        .subscribe({
          next: (data: any) => {
            this.pantalla = data.resultado.toString();
            this.cargando = false;
            
            this.numeroA = null; 
            this.operacionActual = null;
          },
          error: (err) => {
            this.errorBackend = err.error.error || 'Error de conexión';
            this.pantalla = 'Error';
            this.cargando = false;
          }
        });
    }
  }
}