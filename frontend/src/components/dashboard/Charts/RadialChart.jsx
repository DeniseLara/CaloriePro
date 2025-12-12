import './RadialChart.css'
import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { 
  COLORS, 
  getStatus, 
  getMessage, 
  getChartData, 
  getChartOptions 
} from './chartUtils';
import { 
  Chart as ChartJS, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale, 
  LinearScale 
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  CategoryScale, 
  LinearScale, 
  ChartDataLabels
);

function RadialChart({ caloriesConsumed, dailyGoal }) {
  const status = getStatus(dailyGoal, caloriesConsumed);
  const remaining = Math.max(dailyGoal - caloriesConsumed, 0);
  const percentage = (caloriesConsumed / dailyGoal) * 100;

  const chartData = useMemo(
    () => getChartData(caloriesConsumed, dailyGoal, status, remaining),
    [caloriesConsumed, dailyGoal, status, remaining]
  );

  const chartOptions = useMemo(
    () => getChartOptions(dailyGoal),
    [dailyGoal]
  );

  return (
    <section className="radial-chart-container">
      <h2 className="radial-title">Progress of the Day</h2>

      {dailyGoal > 0 && (
        <figure className="radial-chart-wrapper">
          <figcaption className="radial-chart-legend">
            <ul className='legend-list'>
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
                <span className="legend-color" style={{ backgroundColor: COLORS.remaining }}/>
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
          <p className="radial-chart-goal no-data">
            Please complete your profile to start tracking.
          </p>
        )}
      </div>
    </div>
  </section>
  );
}

export default RadialChart;