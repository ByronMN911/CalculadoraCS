from django.urls import path
from .views import calcular # Importamos la nueva vista

urlpatterns = [
    #
    path('saludo/', calcular), 
    
    # Esta es la ruta nueva para tu calculadora
    path('calculadora/', calcular), 
]