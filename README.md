## CaloriePro — Complete Redesign (2025)

Esta web app fue completamente rediseñada.
Mejoré el diseño, la arquitectura del código, los colores, la experiencia de usuario y el rendimiento general.
Si deseas ver la versión anterior, está disponible en la sección Branches de este repositorio bajo el nombre v1.


## CaloriePro

**CaloriePro** es una aplicación web hecha para ayudarte a llevar un control diario de tus calorías consumidas y alcanzar tus objetivos personales de salud. Está construida con **React**, **Vite**, **CSS** y **FastAPI**, y utiliza **Firebase** para el manejo de usuarios y almacenamiento de datos.

---

## Características principales


### Home pública:
- Explica cómo funciona la aplicación, sus beneficios y características.
- Incluye un modal para registrarse o iniciar sesión.


### Home para usuarios autenticados:
- Muestra una bienvenida personalizada.
- Permite buscar alimentos mediante el buscador de calorías.
- Los usuarios pueden agregar las calorías de los alimentos y estas se suman al total diario y al historial.


### Nueva página de Profile:
- Los usuarios pueden ver y editar sus datos personales: peso, altura, edad, nivel de actividad diaria, género, objetivo y más.
- La información del perfil se utiliza para personalizar el cálculo de calorías objetivo.


### Dashboard del usuario:
Página con información personalizada del usuario. Muestra:
- Calorías objetivo del día.
- Calorías consumidas hasta el momento.
- Gramos de proteínas, grasas y carbohidratos obtenidos a partir de los alimentos agregados.
- Historial de alimentos agregados.


### Tarea programada automática:
Cada día a la medianoche, una tarea programada externa hace una petición HTTP al backend desarrollado con FastAPI (y desplegado en Render), el cual accede a Firestore para:

- Resetear el total de calorías consumidas (caloriesConsumed).
- Limpiar el historial de alimentos del día (foodHistory).

---

## Tecnologías utilizadas

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

---

## Funcionalidades
- Autenticación de usuarios con Firebase (registro y login).
- Perfil editable: los usuarios pueden definir sus datos (edad, peso, objetivo, etc.).
- Consumo de calorías en tiempo real: al buscar y agregar alimentos, se actualiza el total diario.
- Historial de alimentos consumidos con fecha.
- Reset automático diario del total de calorías y limpieza del historial, usando una tarea programada externa + FastAPI.

---

## Automatización diaria
La tarea de reseteo de calorías y limpieza del historial se ejecuta automáticamente todos los días a la medianoche gracias a:
- **cron-job.org**, que programa la ejecución periódica y hace la petición HTTP al backend.
- **FastAPI**, que gestiona la lógica.
- **Render**, donde está desplegado el backend.
- **Firebase Firestore**, donde se almacenan y actualizan los datos de los usuarios.

---

## Autenticación y base de datos
**Firebase Authentication** para registrar, loguear y gestionar usuarios.

**Firebase Firestore** para guardar:
- Calorías consumidas
- Historial de alimentos
- Perfil del usuario
- Gramos de proteínas, grasas y carbohidratos calculados por cada alimento agregado

---

## Despliegue
El frontend y backend están desplegados en producción usando **Render**.  
La tarea automática diaria es gestionada por **cron-job.org**, que invoca una ruta del backend desplegado.



---

**Autor**  
Proyecto desarrollado por **Denise Lara** — *Frontend Developer*.  
Forma parte de mi portafolio personal. ¡Gracias por visitarlo!

