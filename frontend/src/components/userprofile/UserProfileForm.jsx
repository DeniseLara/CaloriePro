import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';

function UserProfileForm({
  editedData,
  onSubmit,
  isSaving,
  handleEditToggle
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: editedData,
    mode: 'onChange'
  });

  const selectedGoal = watch('goal');

  // Resetear el formulario cuando cambian los datos iniciales
  useEffect(() => {
    reset(editedData);
  }, [editedData, reset]);

  // Función que se ejecuta al enviar el formulario
  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form className="userprofile-form" onSubmit={handleSubmit(onFormSubmit)}>
      <h2 className="userprofile-title">Edit your profile</h2>
      
      <div className="userprofile-field">
        <label className="userprofile-label" htmlFor="age">
          Age
          <input
            className={`userprofile-input ${errors.age ? 'error-input' : ''}`}
            type="number"
            id="age"
            {...register('age', {
              required: 'Age is required',
              min: {
                value: 13,
                message: 'Minimum age is 13'
              },
              max: {
                value: 120,
                message: 'Maximum age is 120'
            },
            valueAsNumber: true
          })}
          />
        </label>
        {errors.age && (
          <span className="profile-error-message">{errors.age.message}</span>
        )}
      </div>
      
      <div className="userprofile-field">
        <label className="userprofile-label" htmlFor="gender">
          Gender
          <select
            className={`userprofile-select ${errors.gender ? 'error-input' : ''}`}
            id="gender"
            {...register('gender', {
              required: 'Gender is required'
            })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        {errors.gender && (
          <span className="profile-error-message">{errors.gender.message}</span>
        )}
      </div>
      
      <div className="userprofile-field">
        <label className="userprofile-label" htmlFor="goal">
          Goal
          <select
            className={`userprofile-select ${errors.goal ? 'error-input' : ''}`}
            id="goal"
            {...register('goal', {
              required: 'Goal is required'
            })}
          >
            <option value="">Select goal</option>
            <option value="lose">Lose weight</option>
            <option value="maintain">Maintain weight</option>
            <option value="gain">Gain muscle mass</option>
          </select>
        </label>
        {errors.goal && (
          <span className="profile-error-message">{errors.goal.message}</span>
        )}
      </div>
      
      <div className="userprofile-field">
        <label className="userprofile-label" htmlFor="weight">
          Weight (kg)
          <input
            className={`userprofile-input ${errors.weight ? 'error-input' : ''}`}
            type="number"
            id="weight"
            step="0.1"
            {...register('weight', {
              required: 'Weight is required',
              min: {
                value: 30,
                message: 'Minimum weight is 30kg'
              },
              max: {
                value: 300,
                message: 'Maximum weight is 300kg'
              },
              valueAsNumber: true
            })}
          />
        </label>
        {errors.weight && (
          <span className="profile-error-message">{errors.weight.message}</span>
        )}
      </div>
      
      <div className="userprofile-field">
        <label className="userprofile-label" htmlFor="height">
          Height (cm)
          <input
            className={`userprofile-input ${errors.height ? 'error-input' : ''}`}
            type="number"
            id="height"
            {...register('height', {
              required: 'Height is required',
              min: {
                value: 120,
                message: 'Minimum height is 120cm'
              },
              max: {
                value: 230,
                message: 'Maximum height is 230cm'
              },
              valueAsNumber: true
            })}
          />
        </label>
        {errors.height && (
          <span className="profile-error-message">{errors.height.message}</span>
        )}
      </div>
      
      <div className="userprofile-field">
        <label className="userprofile-label" htmlFor="activitylevel">
          Activity level
          <select
            className={`userprofile-select ${errors.activityLevel ? 'error-input' : ''}`}
            id="activitylevel"
            {...register('activityLevel', {
              required: 'Activity level is required'
            })}
          >
            <option value="">Select activity level</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="intense">Intense</option>
            <option value="veryIntense">Very intense</option>
          </select>
        </label>
        {errors.activityLevel && (
          <span className="profile-error-message">{errors.activityLevel.message}</span>
        )}
      </div>
      
      <div className="userprofile-field">
        {(selectedGoal === "lose" || selectedGoal === "gain") && (
        <label className="userprofile-label" htmlFor="calorieAdjustment">
          {selectedGoal === "lose" ? "Déficit calórico" : "Superávit calórico"} (200-500 calorías):
          <input
            className={`userprofile-input ${errors.calorieAdjustment ? 'error-input' : ''}`}
            type="number"
            id="calorieAdjustment"
            min="200"
            max="500"
            {...register('calorieAdjustment', {
              required: selectedGoal !== "maintain" ? 'Calorie adjustment is required' : false,
              min: {
                value: 200,
                message: 'Minimum adjustment is 200 calories'
              },
              max: {
                value: 500,
                message: 'Maximum adjustment is 500 calories'
              },
              valueAsNumber: true
            })}
          />
        </label>
        )}
        {errors.calorieAdjustment && (
          <span className="profile-error-message">{errors.calorieAdjustment.message}</span>
        )}
      </div>
      
      <div className="userprofile-buttons" aria-label="Profile actions">
        <button 
          className="userprofile-btn save" 
          type="submit" 
          disabled={isSaving}
        >
          {isSaving ? (
            <ClipLoader color="#fff" loading={true} size={20} />
          ) : (
            "Save changes"
          )}
        </button>
        <button 
          className="userprofile-btn cancel" 
          aria-label="Cancel editing profile" 
          type="button" 
          onClick={() => {
            reset(editedData); 
            handleEditToggle();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserProfileForm;