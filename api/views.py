from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        raise ValueError("No se puede dividir para cero")
    return a / b

@api_view(['POST'])
def calcular(request):
    try:
        a = float(request.data.get('a', 0))
        b = float(request.data.get('b', 0))
        operacion = request.data.get('operacion')

        if operacion == 'sumar':
            resultado = sumar(a, b)
        elif operacion == 'restar':
            resultado = restar(a, b)
        elif operacion == 'multiplicar':
            resultado = multiplicar(a, b)
        elif operacion == 'dividir':
            resultado = dividir(a, b)
        else:
            return Response({"error": "Operación no válida"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"resultado": resultado})

    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response({"error": "Verifique los datos enviados"}, status=status.HTTP_400_BAD_REQUEST)