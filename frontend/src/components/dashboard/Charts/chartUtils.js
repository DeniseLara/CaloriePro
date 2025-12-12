export const COLORS = {
  over: '#ef4444',           
  achieved: '#10b981',       
  inProgress: '#34d399',     
  remaining: '#e5e7eb'       
};

export const getStatus = (goal, consumed) => {
  if (consumed > goal) return 'over';
  if (consumed === goal) return 'achieved';
  return 'inProgress';
};

export const getMessage = (status, percent) => {
  switch (status) {
    case 'over':
      return "¡You've exceeded your limit!";
    case 'achieved':
      return '¡Goal achieved!';
    default:
      return `${percent.toFixed(1)}% Completed`;
  }
};

export const getChartData = (caloriesConsumed, dailyGoal, status, remaining) => {
    if (!dailyGoal || dailyGoal <= 0) {
        return {
            labels: ['No data'],
            datasets: [{
                label: 'Calories',
                data: [1],
                backgroundColor: [COLORS.remaining],
                borderWidth: 0.5,
                cutout: '70%',
            }],
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
};


export const getChartOptions = (dailyGoal) => ({
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
});
