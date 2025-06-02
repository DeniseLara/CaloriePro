## 🔥 CaloriePro

**CaloriePro** es una aplicación web hecha para ayudarte a llevar un control diario de tus calorías consumidas y alcanzar tus objetivos personales de salud. Está construida con **React**, **Vite**, **CSS** y **FastAPI**, y utiliza **Firebase** para el manejo de usuarios y almacenamiento de datos.



## 📌 Características principales


### 🧭 Home pública:
- Página accesible para cualquier visitante. Explica cómo funciona la aplicación, sus beneficios y características. Incluye un modal para registrarse o iniciar sesión.


### 👤 Home para usuarios autenticados:
Después de iniciar sesión, los usuarios acceden a una página personalizada con una bienvenida. Allí pueden:

- Buscar alimentos usando el buscador de calorías.
- Agregar las calorías de los alimentos buscados con un botón.
Estas calorías se suman al total diario y se guardan en el historial del usuario.


### 📊 Dashboard del usuario:
- Página con información personalizada del usuario. Muestra:
- Datos del perfil (edad, peso, objetivo, etc.).
- Calorías objetivo del día.
- Calorías consumidas hasta el momento.
- Historial de alimentos agregados.


### 🕛 Tarea programada automática:
Cada día a la medianoche, una tarea programada con Python + FastAPI, desplegada en Google Cloud Functions, se encarga de:

- Resetear el total de calorías consumidas (caloriesConsumed).
- Limpiar el historial de alimentos del día (foodHistory).



## 🛠️ Tecnologías utilizadas


### Frontend
- React
- Vite
- npm
- CSS (estilos personalizados)


### Backend
- Python
- FastAPI
- Uvicorn (servidor ASGI)
- firebase-admin



## ⚙️ Funcionalidades
- Autenticación de usuarios con Firebase (registro y login).
- Perfil editable: los usuarios pueden definir sus datos (edad, peso, objetivo, etc.).
- Consumo de calorías en tiempo real: al buscar y agregar alimentos, se actualiza el total diario.
- Historial de alimentos consumidos con fecha.
- Reset automático diario del total de calorías y limpieza del historial, programado con FastAPI y Google Cloud Functions.



## 🗓️ Tarea programada
La tarea diaria de reseteo de calorías se ejecuta automáticamente usando FastAPI y está desplegada en Google Cloud Functions. Esta función accede a Firestore y:

- Resetea caloriesConsumed a 0.

- Limpia el foodHistory de cada usuario.



## 🔐 Autenticación y base de datos
**Firebase Authentication** para registrar, loguear y gestionar usuarios.

**Firebase Firestore** para guardar:

- Calorías consumidas
- Historial de alimentos
- Perfil del usuario



## 🚀 Despliegue
Este proyecto está desplegado completamente en producción usando **Render** (frontend y backend) y **Google Cloud Functions** (para tareas automatizadas).


---
✨ **Autor**  
Proyecto desarrollado por **Denise Lara** — *Frontend Developer*.  
Forma parte de mi portafolio personal. ¡Gracias por visitarlo!

