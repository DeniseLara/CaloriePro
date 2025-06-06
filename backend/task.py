import os
from firebase_admin import credentials, firestore, initialize_app, get_app
from google.cloud.exceptions import NotFound

db = None

try:
    # Intentamos obtener la app ya inicializada
    app = get_app()
except ValueError:
    # Si no está inicializada, la inicializamos con las credenciales desde archivo
    cred_path = "/etc/secrets/caloriepro.json"
    cred = credentials.Certificate(cred_path)
    initialize_app(cred)

db = firestore.client()


# Función que resetea las calorías y limpia el historial
def reset_calories():
    if not db:
        raise Exception("No hay conexión a Firebase. No se encontraron credenciales.")
    """Función HTTP para resetear calorías y limpiar historial."""
    try:
        users_ref = db.collection('users')
        for user in users_ref.stream():            
            user_ref = users_ref.document(user.id)
            user_ref.update({
                'caloriesConsumed': 0,
                'foodHistory': [],
            })
        return "Calorías reseteadas y historial limpio con éxito.", 200
    except NotFound:
        return "No se encontró la colección de usuarios.", 404
    except Exception as e:
        return f"Error al resetear las calorías: {e}", 500

if __name__ == "__main__":
    result, status_code = reset_calories()
    print(result)



