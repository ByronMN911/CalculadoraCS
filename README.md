Proyecto Fullstack: Django + Angular 
Materia: Calidad de Software

Desarrollador: Byron Melo

Este proyecto integra un backend robusto en Django REST Framework con un frontend dinámico en Angular.

Tecnologías Usadas
Backend: Python 3.13.7, Django 6.0.3, Django REST Framework 3.17.1.

Frontend: Angular 19+, TypeScript.

Base de Datos: SQLite (Desarrollo).

Guía de Despliegue 

1. Configuración del Backend (Terminal 1)

# 1. Crear el entorno virtual
python -m venv venv

# 2. Activar el entorno
# Windows:
.\venv\Scripts\activate

# 3. Instalar librerías
pip install -r requirements.txt

# 4. Crear la base de datos local
python manage.py migrate

# 5. Iniciar servidor
python manage.py runserver
El backend correrá en: http://127.0.0.1:8000/

2. Configuración del Frontend (Terminal 2)

# 1. Entrar a la carpeta
cd frontend

# 2. Instalar dependencias de Node
npm install

# 3. Iniciar servidor de desarrollo
ng serve
El frontend correrá en: http://localhost:4200/
