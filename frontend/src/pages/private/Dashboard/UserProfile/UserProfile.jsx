import { useState, useEffect } from "react";
import './UserProfile.css';
import SuccessModal from '../SuccessModal/SuccessModal'
import PropTypes from "prop-types";
import { ClipLoader } from 'react-spinners';
import { saveUserProfileToFirestore } from "../../../../firebaseconfig/firebase";
import { useAuth } from "../../../../context/authContext";
import UserProfileView from "./UserProfileView";
import UserProfileForm from "./UserProfileForm";

function UserProfile({
  userData,
  isEditing,
  handleEditToggle,
  editedData,
  setEditedData, 
  setIsSaving,
  dailyGoal,
  isSaving,
  setIsEditing,
  setUserData  
}) {
  const [saveError, setSaveError] = useState(null);
  const [showModalUser, setShowModalUser] = useState(false);  // Estado para controlar la visibilidad del modal
  const { user } = useAuth();

  // Usamos useEffect para sincronizar los datos de userData con el estado editedData
  useEffect(() => {
    if (userData) {
      setEditedData({
        age: userData.age || '',
        gender: userData.gender || 'male',
        goal: userData.goal || 'lose',
        weight: userData.weight || '',
        height: userData.height || '',
        activityLevel: userData.activityLevel || 'sedentary',
        calorieAdjustment: userData.calorieAdjustment || ''
      });
    }
  }, [userData, setEditedData]);

    // Maneja el cambio de valores en el formulario
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleProfileSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
  
      try {
        // Guardar los datos en Firestore
        await saveUserProfileToFirestore(editedData, user.uid);
        
        // Actualizar el estado en el componente principal
        setUserData(editedData);

        setShowModalUser(true)
        
        setIsSaving(false);
        setIsEditing(false);
      } catch (error) {
        setIsSaving(false);
        setSaveError("Error al guardar perfil. Intenta nuevamente.");
      }
    };
  

  // Si los datos no están disponibles, mostrar un mensaje de carga
  if (!userData) {
    return <div className="userprofile-container"><ClipLoader color="#000" loading={true} size={50} /></div>;
  }

  
  return (
    <section className="userprofile-container">
      <article className="userprofile-content">
        {!isEditing ? (
          <UserProfileView
          userData={userData}
          dailyGoal={dailyGoal}
          handleEditToggle={handleEditToggle}/>
        ) : (
          <UserProfileForm
          editedData={editedData}
          handleInputChange={handleInputChange}
          handleProfileSubmit={handleProfileSubmit}
          isSaving={isSaving}
          handleEditToggle={handleEditToggle}/>
        )}
        {saveError && <p className="error-message" role="alert" aria-live="assertive">{saveError}</p>}

         {showModalUser && <SuccessModal message="Profile updated successfully" role="dialog" aria-modal="true" onClose={() => setShowModalUser(false)} />}
      </article>
    </section>
  );
}

UserProfile.propTypes = {
  userData:PropTypes.object.isRequired,
  isEditing:PropTypes.bool.isRequired,
  handleEditToggle:PropTypes.func.isRequired,
  setEditedData:PropTypes.func.isRequired,
  setIsSaving:PropTypes.func.isRequired,
  dailyGoal:PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isSaving:PropTypes.bool.isRequired,
  setIsEditing:PropTypes.func.isRequired,
  setUserData:PropTypes.func.isRequired,
  editedData:PropTypes.object.isRequired,
};

export default UserProfile;