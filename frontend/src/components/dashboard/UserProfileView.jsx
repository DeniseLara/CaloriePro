const UserProfileView = ({ userData, dailyGoal, handleEditToggle }) => {
  
  return (
    <div className="userprofile-info">
            <h2 className="userprofile-title">Your profile</h2>
            <ul className="userprofile-list">
              <li className="userprofile-description">
                <p>Age</p> {userData.age || "N/A"}
              </li>
              <li className="userprofile-description">
                <p>Gender</p> {userData.gender || "N/A"}
              </li>
              <li className="userprofile-description">
                <p>Goal</p> {userData.goal || "N/A"}
              </li>
              <li className="userprofile-description">
                <p>Weight</p> {userData.weight || "N/A"} kg
              </li>
              <li className="userprofile-description">
                <p>Height</p> {userData.height || "N/A"} cm
              </li>
              <li className="userprofile-description">
                <p>Activity level</p> {userData.activityLevel || "N/A"}
              </li>
              <li className="userprofile-description">
                <p>Required calories</p> {dailyGoal || "N/A"} calories.
              </li>
            </ul>
            <button className="userprofile-btn edit" aria-label="Edit your profile" onClick={handleEditToggle}>Edit</button>
        </div>
  );
}

export default UserProfileView;