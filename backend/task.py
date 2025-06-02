import os
#from google.cloud import storage
import json
from firebase_admin import credentials, firestore, initialize_app
from google.cloud.exceptions import NotFound

# Obtén la ruta absoluta del archivo caloriepro.json
current_dir = os.path.dirname(os.path.abspath(__file__))
firebase_creds_json = os.getenv('GOOGLE_APPLICATION_CREDENTIALS_JSON')

if not firebase_creds_json:
    raise Exception("No se encontró la variable de entorno FIREBASE_CREDENTIALS")

# Parsear el string JSON a diccionario
cred_dict = json.loads(firebase_creds_json)

# Inicializa Firebase con las credenciales
cred = credentials.Certificate(cred_dict)
initialize_app(cred)
db = firestore.client()


# Función que resetea las calorías y limpia el historial
def reset_calories():
    """Función HTTP para resetear calorías y limpiar historial."""
    try:
        users_ref = db.collection('users')
        for user in users_ref.stream():            
            user_data = user.to_dict()
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
