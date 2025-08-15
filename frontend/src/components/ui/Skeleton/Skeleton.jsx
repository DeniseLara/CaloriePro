import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Skeleton.css';

function SkeletonDashboard() {
  return (
    <section className="skeleton-dashboard">
      <header className="skeleton-box welcome-box">
        <Skeleton height={60} width="60%" className='skeleton-item'/>
        <div className="skeleton-side">
        <Skeleton height={30} width="30%" className='skeleton-item'/>
        <Skeleton height={30} width="30%" className='skeleton-item'/>
        </div>
      </header>

      <section className="skeleton-box chart-box">
        <Skeleton height={150} className='skeleton-item'/>
        <Skeleton height={20} width="40%" className='skeleton-item'/>
      </section>

      <aside className="skeleton-box user-box">
        <Skeleton height={30} width="60%" className='skeleton-title'/>
        <Skeleton height={20} width="80%" className='skeleton-item'/>
        <Skeleton height={20} width="80%" className='skeleton-item'/>
        <Skeleton height={20} width="80%" className='skeleton-item'/>
      </aside>

      <section className="skeleton-box history-box">
        <Skeleton height={30} width="40%" className='skeleton-item'/>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height={40} className="skeleton-history-item" />
        ))}
      </section>
    </section>
  );
}

export default SkeletonDashboard;
