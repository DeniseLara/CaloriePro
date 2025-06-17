// Calcular las calorías basadas en el perfil del usuario
export const calculateCalories = (profileData) => {
    if (!profileData || !profileData.age || !profileData.weight || !profileData.height || !profileData.activityLevel || !profileData.goal) {
      return 0;
    }

    const { age, weight, height, activityLevel, goal, calorieAdjustment } = profileData;

    let bmr = 10 * weight + 6.25 * height - 5 * age + (profileData.gender === "male" ? 5 : -161);

    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
      veryIntense: 1.9,
    };

    bmr *= activityMultiplier[activityLevel];

    if (goal === "lose") {
      const deficit = calorieAdjustment ? parseInt(calorieAdjustment) : 0;
      bmr -= deficit;
    } else if (goal === "gain") {
      const surplus = calorieAdjustment ? parseInt(calorieAdjustment) : 0;
      bmr += surplus;
    }

    return Math.floor(bmr * 100) / 100;
};
