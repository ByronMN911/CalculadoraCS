# Importamos la herramienta 'path' de Django, que nos permite crear direcciones web
from django.urls import path
# Importamos nuestra función 'calcular' desde el archivo views.py (el cerebro de la app)
from .views import calcular 

# urlpatterns es el mapa de navegación de nuestro servidor. 
# Aquí definimos por cuáles "puertas" puede entrar la información.
urlpatterns = [
    # Si una petición llega a la ruta 'saludo/', se enviará a la función 'calcular'
    # (Mantenemos esta ruta por si quedaron configuraciones de la primera prueba)
    path('saludo/', calcular), 
    
    # Esta es la ruta oficial de nuestra calculadora.
    # Le dice a Django: "Cuando Angular envíe un paquete a la dirección /calculadora/, 
    # entrégaselo inmediatamente a la función calcular para que haga las matemáticas".
    path('calculadora/', calcular), 
]