import styles from "./MacroPanel.module.css";
import MacroCard from "./MacroCard";
import { useNutrition } from "../../../context/NutritionContext";

export default function MacroPanel() {
  const { macros } = useNutrition();
  
  const protein = Number(macros.protein.toFixed(1));
  const carbs = Number(macros.carbs.toFixed(1));
  const fats = Number(macros.fats.toFixed(1));

  const total = Number(protein) + Number(carbs) + Number(fats);

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Macronutrients</h2>

      <div className={styles.list}>
        <MacroCard name="Protein" amount={protein} unit="g" icon="🥩"
          color="#f87171"/>
        <MacroCard name="Carbohydrates" amount={carbs} unit="g" icon="🍞"
          color="#fbbf24"/>
        <MacroCard name="Fats" amount={fats} unit="g" icon="🥑"
          color="#10b981"/>
      </div>
    </div>
  );
}
