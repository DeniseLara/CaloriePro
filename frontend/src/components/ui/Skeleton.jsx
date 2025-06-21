import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Skeleton.css';

function SkeletonDashboard() {
  return (
    <section className="skeleton-dashboard">
      {/* Caja 1: Bienvenida + calorías */}
      <div className="skeleton-box welcome-box">
        <Skeleton height={60} width="60%" className='skeleton-item'/>
        <div className="skeleton-side">
        <Skeleton height={30} width="30%" className='skeleton-item'/>
        <Skeleton height={30} width="30%" className='skeleton-item'/>
        </div>
      </div>

      {/* Caja 2: Gráfico */}
      <div className="skeleton-box chart-box">
        <Skeleton height={150} className='skeleton-item'/>
        <Skeleton height={20} width="40%" className='skeleton-item'/>
      </div>

      {/* Caja 3: Datos del usuario */}
      <div className="skeleton-box user-box">
        <Skeleton height={30} width="60%" className='skeleton-title'/>
        <Skeleton height={20} width="80%" className='skeleton-item'/>
        <Skeleton height={20} width="80%" className='skeleton-item'/>
        <Skeleton height={20} width="80%" className='skeleton-item'/>
      </div>

      {/* Caja 4: Historial */}
      <div className="skeleton-box history-box">
        <Skeleton height={30} width="40%" className='skeleton-item'/>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height={40} className="skeleton-history-item" />
        ))}
      </div>
    </section>
  );
}

export default SkeletonDashboard;
