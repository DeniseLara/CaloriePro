import './UserProfile.css';

import SuccessModal from '../../ui/Messages/SuccessModal'
import UserProfileView from "./UserProfileView";
import UserProfileForm from "./UserProfileForm";
import LoadingOverlay from '../../ui/Loader/LoadingOverlay'


function UserProfile({
  userData,
  isEditing,
  handleEditToggle,
  editedData,
  dailyGoal,
  isSaving,
  saveError,
  handleChange,       
  handleSubmit,
  showModalUser,
  onCloseModal   
}) {

  if (!userData) {
    return <LoadingOverlay color="#000"/>;
  }

  
  return (
    <section className="userprofile-container">
      <article className="userprofile-content">
        {!isEditing ? (
          <UserProfileView
            userData={userData}
            dailyGoal={dailyGoal}
            handleEditToggle={handleEditToggle}
          />
        ) : (
          <UserProfileForm
            editedData={editedData}
            handleInputChange={handleChange}
            handleProfileSubmit={handleSubmit}
            isSaving={isSaving}
            handleEditToggle={handleEditToggle}
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
            onClose={onCloseModal} 
          />}
      </article>
    </section>
  );
}

export default UserProfile;