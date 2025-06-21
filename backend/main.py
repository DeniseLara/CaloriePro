from fastapi import FastAPI
from task import reset_calories
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uvicorn
import logging
import os

logging.basicConfig(level=logging.DEBUG)


app = FastAPI()

# Configurar CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://caloriepro.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/reset_calories")
async def scheduled_task():
    """
    Endpoint HTTP para ejecutar la tarea de reseteo.
    """
    try:
        reset_calories()  
        return {"message": "Reseteo de calorías completado"}
    except Exception as e:
        logging.error(f"Error en el reseteo de calorías: {e}")
        return {"error": f"Error al ejecutar el reseteo de calorías: {e}"}



if __name__ == "__main__":
    port = os.getenv("PORT", 8080)  # Usar el puerto proporcionado por Render
    uvicorn.run(app, host="0.0.0.0", port=int(port))

