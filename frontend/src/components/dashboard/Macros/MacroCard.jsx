import styles from "./MacroCard.module.css";

export default function MacroCard({name, amount, unit, icon, color}) {
  return (
    <li className={styles.card} style={{ '--macro-color': color }}>      
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <div className={styles.iconCircle}>
          <span className={styles.icon}>{icon}</span>
        </div>
      </div>
      
      <div className={styles.valueSection}>
        <span className={styles.amount}>{amount}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
    </li>
  );
}
