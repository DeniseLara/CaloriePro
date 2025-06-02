import { ClipLoader } from 'react-spinners';


function UserProfileForm({
  editedData,
  handleInputChange,
  handleProfileSubmit,
  isSaving,
  handleEditToggle
}) {
  return (
    <form className="userprofile-form" onSubmit={handleProfileSubmit}>
        <h2 className="userprofile-title">Edit your profile</h2>
            <label className="userprofile-label" htmlFor="age">
              Age
            <input
              className="userprofile-input"
              type="number"
              name="age"
              id="age"
              value={editedData.age}
              onChange={handleInputChange}
              required
            />
            </label>
    
            <label className="userprofile-label" htmlFor="gender">
              Gender
            <select
              className="userprofile-select"
              name="gender"
              id="gender"
              value={editedData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            </label>
    
            <label className="userprofile-label" htmlFor="goal">
              Goal
            <select
              className="userprofile-select"
              name="goal"
              id="goal"
              value={editedData.goal}
              onChange={handleInputChange}
              required
            >
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain weight</option>
              <option value="gain">Gain muscle mass</option>
            </select>
            </label>
    
            <label className="userprofile-label" htmlFor="weight">
              Weight (kg)
            <input
              className="userprofile-input"
              type="number"
              name="weight"
              id="weight"
              value={editedData.weight}
              onChange={handleInputChange}
              required
            />
            </label>
    
            <label className="userprofile-label" htmlFor="height">
              Height (cm)
            <input
              className="userprofile-input"
              type="number"
              name="height"
              id="height"
              value={editedData.height}
              onChange={handleInputChange}
              required
            />
            </label>
    
            <label className="userprofile-label" htmlFor="activitylevel">
              Activity level
            <select
              className="userprofile-select"
              name="activityLevel"
              id="activitylevel"
              value={editedData.activityLevel}
              onChange={handleInputChange}
              required
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="intense">Intense</option>
              <option value="veryIntense">Very intense</option>
            </select>
            </label>
    
            {editedData.goal === "lose" || editedData.goal === "gain" ? (
              <label className="userprofile-label" htmlFor="calorieAdjustment">
                {editedData.goal === "lose" ? "Déficit calórico" : "Superávit calórico"} (200-500 calorías):
              <input
                type="number"
                name="calorieAdjustment"
                id="calorieAdjustment"
                min="200"
                max="500"
                value={editedData.calorieAdjustment}
                onChange={handleInputChange}
                required
              />
              </label>
              ) : null}
    
              <div className="userprofile-buttons" aria-label="Profile actions">
                <button className="userprofile-btn save" type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <ClipLoader color="#fff" loading={true} size={20} />
                    ) : (
                      "Save changes"
                    )}
                  </button>
                  <button className="userprofile-btn cancel" aria-label="Cancel editing profile" type="button" onClick={handleEditToggle}>Cancel</button>
                </div>
          </form>
  );
}

export default UserProfileForm;