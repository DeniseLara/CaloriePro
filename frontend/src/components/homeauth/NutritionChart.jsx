import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function NutritionChart({ totalNutrients }) {
  
  const chartData = {
    labels: ['Proteins', 'Fats', 'Carbohydrates', 'Others'],
    datasets: [{
      data: [
        (totalNutrients?.PROCNT?.quantity || 0).toFixed(1),
        (totalNutrients?.FAT?.quantity || 0).toFixed(1),
        (totalNutrients?.CHOCDF?.quantity || 0).toFixed(1),
        (
          (totalNutrients?.ENERC_KCAL?.quantity || 0) -
          (totalNutrients?.PROCNT?.quantity || 0 +
           totalNutrients?.FAT?.quantity || 0 +
           totalNutrients?.CHOCDF?.quantity || 0)
        ).toFixed(1),
      ],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#FF9F40'],
      hoverOffset: 4
    }]
  };

  return (
    <div className="chart-container">
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.label}: ${ctx.raw}`
              }
            }
          }
        }}
      />
    </div>
  );
}

export default NutritionChart; 