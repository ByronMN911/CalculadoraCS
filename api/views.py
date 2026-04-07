# Importamos herramientas de Django REST Framework necesarias para crear la API
# api_view permite definir qué tipo de peticiones (como GET o POST) acepta nuestra función
from rest_framework.decorators import api_view
# Response sirve para empaquetar nuestra contestación y enviarla de vuelta al Frontend en formato JSON
from rest_framework.response import Response
# status contiene los códigos de error estándar de internet (como el 400 para errores de usuario)
from rest_framework import status

# Definimos las operaciones matemáticas básicas como funciones independientes
# Esto aplica el concepto de modularidad: cada función hace una sola cosa específica
def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    # Validación de calidad: evitamos que el programa colapse matemáticamente al dividir por cero
    if b == 0:
        raise ValueError("No se puede dividir para cero")
    return a / b

# El decorador @api_view(['POST']) protege esta ruta específica
# Significa que la calculadora solo aceptará datos enviados de forma empaquetada y segura
@api_view(['POST'])
def calcular(request):
    # Usamos un bloque try-except como una red de seguridad para atrapar cualquier error
    try:
        # Extraemos los datos que Angular nos envió dentro de la petición (request.data)
        # Convertimos los valores de texto a números decimales (float) para poder operar con ellos
        a = float(request.data.get('a', 0))
        b = float(request.data.get('b', 0))
        operacion = request.data.get('operacion')

        # Evaluamos qué operación pidió el usuario y llamamos a la función modular correspondiente
        if operacion == 'sumar':
            resultado = sumar(a, b)
        elif operacion == 'restar':
            resultado = restar(a, b)
        elif operacion == 'multiplicar':
            resultado = multiplicar(a, b)
        elif operacion == 'dividir':
            resultado = dividir(a, b)
        else:
            # Si Angular envía una operación que no existe, devolvemos un error 400 (Mala Petición)
            return Response({"error": "Operación no válida"}, status=status.HTTP_400_BAD_REQUEST)

        # Si todo sale bien, empaquetamos el resultado en un diccionario JSON y lo enviamos de vuelta
        return Response({"resultado": resultado})

    # Si ocurrió el error específico de la división para cero, lo atrapamos aquí y le avisamos a Angular
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    # Si ocurre cualquier otro error inesperado (como que envíen letras), el servidor no se apaga, solo avisa
    except Exception:
        return Response({"error": "Verifique los datos enviados"}, status=status.HTTP_400_BAD_REQUEST)