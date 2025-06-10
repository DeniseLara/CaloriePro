import './RadialChart.css'
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels);

// Colores personalizados para el gráfico
const COLORS = {
  overGoal: '#FF5722',
  goalAchieved: '#66BB6A',
  remaining: '#E0E0E0'
};

// Funciones de cálculo de calorías
const calculateRemainingCalories = (dailyGoal, caloriesConsumed) => {
  return dailyGoal - caloriesConsumed;
};

const calculatePercentageCalories = (dailyGoal, caloriesConsumed) => {
  return (caloriesConsumed / dailyGoal) * 100;
};

const RadialChart = ({ caloriesConsumed, dailyGoal }) => {
  // Calcular las calorías restantes y el porcentaje
  const remainingCalories = calculateRemainingCalories(dailyGoal, caloriesConsumed);
  const percentageCalories = calculatePercentageCalories(dailyGoal, caloriesConsumed);

  // Determinamos si el usuario se ha pasado de calorías o si ha cumplido su objetivo
  const isOverGoal = caloriesConsumed > dailyGoal;
  const isGoalAchieved = caloriesConsumed === dailyGoal;

  // Datos para el gráfico de calorías
  const caloriesData = useMemo(() => {
    return {
      labels: ['Calories Consumed', 'Calories left'],
      datasets: [{
        label: 'Calorías',
        data: isOverGoal ? [caloriesConsumed, 0] : isGoalAchieved ? [caloriesConsumed, 0] : [caloriesConsumed, remainingCalories],
        backgroundColor: isOverGoal ? [COLORS.overGoal, COLORS.remaining] : isGoalAchieved ? [COLORS.goalAchieved, COLORS.remaining] : [COLORS.goalAchieved, COLORS.remaining],
        borderColor: isOverGoal ? [COLORS.overGoal, COLORS.remaining] : isGoalAchieved ? [COLORS.goalAchieved, COLORS.remaining] : [COLORS.goalAchieved, COLORS.remaining],
        borderWidth: 0.5,
        cutout: '70%',
      }],
    };
  }, [caloriesConsumed, dailyGoal, isOverGoal, isGoalAchieved, remainingCalories]);

  // Opciones para los gráficos
  const [chartOptions, setChartOptions] = useState( {
    responsive: true,
    maintainAspectRatio: false, // Esto evita que Chart.js controle el tamaño del canvas
    plugins: {
      title: {
        display: true,
        text: 'Progress of the Day',
        font: {
          family: 'Poppins',
          size: 24,
          weight: 'bold',
        },
      },
      legend: {
        labels: {
          font: {
            size: 14, // Ajusta el tamaño de la fuente aquí
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          weight: 'light',
          color: '#4F4F4F',
        },
        bodyFont: {
          size: 14,
          color: '#4F4F4F',
        },
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            const label = tooltipItem.label;
            if (label === 'Calories Consumed') {
              return `Consumed: ${value} kcal`;
            }
            return `${label}: ${value} kcal`;
          },
        },
      },
      datalabels: {
        display: false, 
      },
    },

  });

  

  return (
    <div className="radial-chart-container">

      {/* Gráfico Circular */}
      <div className='radial-chart'>
      <Doughnut  data={caloriesData} options={chartOptions} />
      </div>
      
      {/* Número de calorías en el centro */}
      <div className='radial-chart-text'>
        {isOverGoal ? (
          <>
            <p className='radial-chart-goal exced' >¡You've exceeded your limit!</p>
          </>
        ) : isGoalAchieved ? (
          <>
            <p className='radial-chart-goal archived' >¡Goal achieved!</p>
          </>
        ) : (
          <>
            {percentageCalories.toFixed(1)}% <p> Completed</p>
          </>
        )}
      </div>
      </div>
  );
}

RadialChart.propTypes = {
  caloriesConsumed:PropTypes.number.isRequired,
  dailyGoal:PropTypes.number.isRequired,
};

export default RadialChart;