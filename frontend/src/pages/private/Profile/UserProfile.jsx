import './UserProfile.css';
import { useCallback } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useUserData } from '../../../hooks/useUserData';

import SuccessModal from '../../../components/ui/Messages/SuccessModal'
import UserProfileView from '../../../components/userprofile/UserProfileView'
import UserProfileForm from '../../../components/userprofile/UserProfileForm';
import Loader from '../../../components/ui/Loader/LoaderSearch';

function UserProfile() {
  const { user } = useAuth();
  const {
    userData,
    isEditing,
    editedData,
    toggleEditing,
    closeModal,
    dailyGoal,
    saveUserProfile,
    showModalUser,
    saveError,
    setSaveError,
    isSaving,  
  } = useUserData(); 

  // Manejo del envío del perfil editado
  const handleProfileSubmit = useCallback(async (formData) => {
    setSaveError(null);
        
    try {
      await saveUserProfile(formData, user.uid); 
    } catch (error) {
      setSaveError("No se pudo guardar el perfil. Intenta nuevamente")
    }
  }, [saveUserProfile, setSaveError, user.uid]);
  

  if (!userData) {
    return <Loader/>;
  }

  return (
    <section className="userprofile-container section">
      <div className="userprofile-content container">
        {!isEditing ? (
          <UserProfileView
            userData={userData}
            dailyGoal={dailyGoal}
            handleEditToggle={toggleEditing}
          />
        ) : (
          <UserProfileForm
            editedData={editedData}
            onSubmit={handleProfileSubmit}
            isSaving={isSaving}
            handleEditToggle={toggleEditing}
          />
        )}
        {saveError && 
          <p className="error-message" role="alert" aria-live="assertive">
            {saveError}
          </p>}

        {showModalUser && 
          <SuccessModal 
            message="Profile updated successfully" 
            role="dialog" 
            aria-modal="true" 
            onClose={closeModal} 
          />}
      </div>
    </section>
  );
}

export default UserProfile;