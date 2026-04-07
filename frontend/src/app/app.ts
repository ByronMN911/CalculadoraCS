// Importamos las herramientas principales de Angular para crear el componente
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos el servicio Api que creamos para comunicarnos con Django
import { Api } from './api';

// El decorador @Component define la estructura básica de esta parte de la interfaz
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Variables que representan la memoria de la calculadora y lo que se ve en pantalla
  pantalla: string = '0'; 
  numeroA: number | null = null;
  operacionActual: string | null = null;
  esperandoSegundoNumero: boolean = false;

  // Variables para gestionar la comunicación con el servidor y mostrar mensajes
  cargando: boolean = false;
  errorBackend: string | null = null;
  advertencia: string | null = null;

  // Inyectamos el servicio Api para poder usarlo dentro de esta clase
  constructor(private apiService: Api) {}

  // Función que se ejecuta cada vez que el usuario presiona un dígito o el punto
  agregarNumero(num: string) {
    // Se limpia cualquier advertencia previa al empezar a escribir
    this.advertencia = null; 

    // Validación de calidad: impide que el usuario ingrese más de un punto decimal en un mismo número
    if (num === '.' && this.pantalla.includes('.')) {
      return; 
    }

    // Si ya se ingresó el operador, el nuevo número reemplaza al anterior en la pantalla
    if (this.esperandoSegundoNumero) {
      this.pantalla = num === '.' ? '0.' : num; 
      this.esperandoSegundoNumero = false;
    } else {
      // Si la pantalla tiene un cero inicial, se reemplaza por el nuevo número a menos que sea un punto
      if (this.pantalla === '0' && num !== '.') {
        this.pantalla = num;
      } else {
        this.pantalla += num;
      }
    }
  }

  // Función que registra la operación matemática seleccionada
  seleccionarOperacion(op: string) {
    // Validación de calidad: verifica si el usuario intenta encadenar operaciones sin calcular primero
    if (this.numeroA !== null && !this.esperandoSegundoNumero) {
      this.advertencia = 'Solo puedes hacer operaciones de 2 en 2. Presiona "=" para calcular primero.';
      return; 
    }

    // Se guarda el primer número y la operación para usarlos posteriormente
    this.advertencia = null;
    this.numeroA = parseFloat(this.pantalla);
    this.operacionActual = op;
    this.esperandoSegundoNumero = true;
  }

  // Función que reinicia todas las variables a su estado original
  limpiar() {
    this.pantalla = '0';
    this.numeroA = null;
    this.operacionActual = null;
    this.esperandoSegundoNumero = false;
    this.errorBackend = null;
    this.advertencia = null; 
  }

  // Función que envía los datos al backend para realizar el cálculo
  calcular() {
    // Solo procede si existen el primer número y la operación seleccionada
    if (this.numeroA !== null && this.operacionActual !== null) {
      const numeroB = parseFloat(this.pantalla);
      
      // Activa el estado de carga y limpia mensajes de error previos
      this.cargando = true;
      this.errorBackend = null;
      this.advertencia = null; 

      // Llama al servicio Api y se suscribe para esperar la respuesta de Django
      this.apiService.calcularOperacion(this.numeroA, numeroB, this.operacionActual)
        .subscribe({
          // Si la petición es exitosa, muestra el resultado y reinicia la memoria
          next: (data: any) => {
            this.pantalla = data.resultado.toString();
            this.cargando = false;
            
            this.numeroA = null; 
            this.operacionActual = null;
          },
          // Si ocurre un error en el servidor, captura el mensaje y lo muestra en pantalla
          error: (err) => {
            this.errorBackend = err.error.error || 'Error de conexión';
            this.pantalla = 'Error';
            this.cargando = false;
          }
        });
    }
  }
}