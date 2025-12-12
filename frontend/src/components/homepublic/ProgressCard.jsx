import styles from "./ProgressCard.module.css";
import { Target, TrendingUp } from "lucide-react";

export default function ProgressCard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={`${styles.card}`}>
          <div className={styles.header}>
            <h3>Today</h3>
            <span>Oct 30, 2025</span>
          </div>

          <div className={styles.circleWrapper}>
            <svg className={styles.circleSvg} viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="88" stroke="#e5e7eb" strokeWidth="12" fill="none" />
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray="553"
                strokeDashoffset={553 - (1800 / 2000) * 553}
                strokeLinecap="round"
                className={styles.progressCircle}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
              </defs>
            </svg>

            <div className={styles.circleContent}>
              <span className={styles.calories}>1800</span>
              <span className={styles.subtext}>of 2,000 kcal</span>
              <div className={styles.percent}>
                {Math.round((1800 / 2000) * 100)}% completed
              </div>
            </div>
          </div>

          <div className={styles.macros}>
            <div className={styles.macroCard + " " + styles.protein}>
              <p>Protein</p>
              <p className={styles.macroValue}>65g</p>
              <div className={styles.bar}>
              <div className={styles.proteinBar}></div>
            </div>
          </div>

          <div className={styles.macroCard + " " + styles.carbs}>
            <p>Carbs</p>
            <p className={styles.macroValue}>180g</p>
            <div className={styles.bar}>
              <div className={styles.carbsBar}></div>
            </div>
          </div>

          <div className={styles.macroCard + " " + styles.fat}>
            <p>Fats</p>
            <p className={styles.macroValue}>45g</p>
            <div className={styles.bar}>
              <div className={styles.fatBar}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.floatCard} ${styles.floatRight}`}>
        <Target className={styles.icon} />
        <p className={styles.floatLabel}>Daily Goal</p>
        <p className={styles.floatValue}>2,000 kcal</p>
      </div>

      <div className={`${styles.floatCard} ${styles.floatLeft}`}>
        <TrendingUp className={styles.icon} />
        <p className={styles.floatLabel}>This Week</p>
        <p className={styles.floatValueGreen}>-2.5 kg</p>
      </div>
      </div>
    </div>
  );
}
