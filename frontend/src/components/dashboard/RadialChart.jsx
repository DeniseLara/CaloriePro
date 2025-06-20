import './RadialChart.css'
import PropTypes from 'prop-types';
import { useMemo } from 'react';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

// Colores personalizados para el gráfico
const COLORS = {
  over: '#FF5722',
  /*achieved: '#66BB6A',*/
  achieved: '#4FA94D',
  inProgress: '#81C784',
  remaining: '#E0E0E0'
};

// Utilidades
const getStatus = (goal, consumed) => {
  if (consumed > goal) return 'over';
  if (consumed === goal) return 'achieved';
  return 'inProgress';
};

const getMessage = (status, percent) => {
  switch (status) {
    case 'over':
      return "¡You've exceeded your limit!";
    case 'achieved':
      return '¡Goal achieved!';
    default:
      return `${percent.toFixed(1)}% Completed`;
  }
};


function RadialChart({ caloriesConsumed, dailyGoal }) {
  const status = getStatus(dailyGoal, caloriesConsumed);
  const remaining = Math.max(dailyGoal - caloriesConsumed, 0);
  const percentage = (caloriesConsumed / dailyGoal) * 100;

   // Si aún no hay datos, mostrar gráfico predeterminado
  const chartData = useMemo(() => {
  if (!dailyGoal || dailyGoal <= 0) {
    return {
        labels: ['No data'],
        datasets: [
          {
            label: 'Calories',
            data: [1],
            backgroundColor: [COLORS.remaining],
            borderWidth: 0.5,
            cutout: '70%',
          },
        ],
      };
    }
    
    return {
      labels: ['Calories Consumed', 'Calories Left'],
      datasets: [
        {
          label: 'Calories',
          data: status === 'over' ? [caloriesConsumed, 0] : [caloriesConsumed, remaining],
          backgroundColor: [
          status === 'over' 
            ? COLORS.over 
            : status === 'achieved'
            ? COLORS.achieved
            : COLORS.inProgress,
          COLORS.remaining,
          ],
          borderColor: [
            status === 'over' 
            ? COLORS.over
            : status === 'achieved' 
            ? COLORS.achieved
            : COLORS.inProgress,
          COLORS.remaining,
          ],
          borderWidth: 0.5,
          cutout: '70%',
        },
      ],
    };
  }, [dailyGoal, caloriesConsumed, status, remaining]);

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
     plugins: {
      legend: { display: false },
      title: { display: false },
      datalabels: { display: false },
      tooltip: {
        enabled: dailyGoal > 0,
        callbacks: {
          label: (tooltipItem) => {
            const { raw, label } = tooltipItem;
            return label === 'Calories Consumed'
              ? `Consumed: ${raw} kcal`
              : `${label}: ${raw} kcal`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        bodyFont: { size: 14, color: '#4F4F4F' },
        titleFont: { size: 16, weight: 'light', color: '#4F4F4F' },
      },
    },
  };

   return (
    <section className="radial-chart-container">
      <h2 className="radial-title">Progress of the Day</h2>

      {dailyGoal > 0 && (
        <figure className="radial-chart-wrapper">
          <figcaption className="radial-chart-legend">
            <ul>
              <li className="legend-item">
                <span
                  className="legend-color"
                  style={{ backgroundColor: 
                    status === 'over' 
                    ? COLORS.over 
                    : status === 'achieved'
                    ? COLORS.achieved
                    : COLORS.inProgress }}
                />
                <span className="legend-label">Calories Consumed</span>
              </li>
              <li className="legend-item">
                <span className="legend-color" style={{ backgroundColor: COLORS.remaining }} />
                <span className="legend-label">Calories Left</span>
              </li>
            </ul>
          </figcaption>
        </figure>
      )}

      <div className="radial-chart">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="radial-chart-text">
          {dailyGoal > 0 ? (
      <p
        className={`radial-chart-goal ${
          status === 'over' ? 'exced' : status === 'achieved' ? 'archived' : ''
        }`}
      >
        {getMessage(status, percentage)}
      </p>
    ) : (
      <p className="radial-chart-goal no-data">Please complete your profile to start tracking.</p>
    )}
        </div>
      </div>
    </section>
  );
}

RadialChart.propTypes = {
  caloriesConsumed:PropTypes.number.isRequired,
  dailyGoal:PropTypes.number.isRequired,
};

export default RadialChart;