import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import './Dashboard.css';

/* ── Stat Cards data ── */
const STATS = [
  {
    label: 'Total Products',
    value: 12,
    change: '+12%',
    sub: 'vs last month',
    color: 'blue',
    link: '/products',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    label: 'Low Stock Items',
    value: 5,
    change: '+2',
    sub: 'need attention',
    color: 'red',
    link: '/stock-adjustments',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    label: 'Pending Receipts',
    value: 3,
    change: '+1',
    sub: 'awaiting stock',
    color: 'orange',
    link: '/receipts',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    label: 'Pending Deliveries',
    value: 4,
    change: '+3',
    sub: 'to be dispatched',
    color: 'green',
    link: '/delivery-orders',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: 'Internal Transfers',
    value: 2,
    change: '+1',
    sub: 'in progress',
    color: 'purple',
    link: '/internal-transfers',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
];

/* ── Pie chart segments (conic-gradient) ── */
const PIE_CATEGORIES = [
  { label: 'Raw Materials',  count: 45, pct: 35, color: '#3b82f6' },
  { label: 'Finished Goods', count: 30, pct: 23, color: '#10b981' },
  { label: 'Components',     count: 25, pct: 19, color: '#f59e0b' },
  { label: 'Packaging',      count: 15, pct: 12, color: '#ec4899' },
  { label: 'Others',         count: 13, pct: 11, color: '#a78bfa' },
];

/* ── Recent Activities ── */
const ACTIVITIES = [
  {
    type: 'receipt',
    text: 'Receipt #RC001 validated',
    time: '2 mins ago',
    status: 'Success',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    type: 'delivery',
    text: 'Delivery #DO001 completed',
    time: '15 mins ago',
    status: 'Success',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    type: 'transfer',
    text: 'Transfer #TR001 scheduled',
    time: '1 hour ago',
    status: 'Pending',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
  {
    type: 'adjustment',
    text: 'Adjustment #ADJ001 updated',
    time: '3 hours ago',
    status: 'Success',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    type: 'product',
    text: 'New product "Steel Rods" added',
    time: '5 hours ago',
    status: 'Success',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
  },
];

/* ── Low Stock Items ── */
const LOW_STOCK = [
  { name: 'Steel Rods',   sku: 'SR001', category: 'Raw Materials',  stock: 5,  reorder: 20, status: 'Low Stock' },
  { name: 'Chair',        sku: 'CH001', category: 'Finished Goods', stock: 2,  reorder: 10, status: 'Low Stock' },
  { name: 'Screws',       sku: 'SC001', category: 'Components',     stock: 0,  reorder: 50, status: 'Out of Stock' },
  { name: 'Wood Planks',  sku: 'WP001', category: 'Raw Materials',  stock: 8,  reorder: 20, status: 'Low Stock' },
  { name: 'Table',        sku: 'TB001', category: 'Finished Goods', stock: 4,  reorder: 10, status: 'Low Stock' },
];

/* ── SVG Pie chart helper ── */
function buildPieSlices(cats) {
  const total = cats.reduce((s, c) => s + c.pct, 0);
  const R = 80;       // circle radius
  const CX = 90;      // center x
  const CY = 90;      // center y
  const LABEL_R = 54; // radius for label placement

  let cumAngle = -90; // start from top (12 o'clock)
  return cats.map((c) => {
    const sliceDeg  = (c.pct / total) * 360;
    const startAngle = cumAngle;
    const endAngle   = cumAngle + sliceDeg;
    const midAngle   = (startAngle + endAngle) / 2;
    cumAngle = endAngle;

    // Arc path
    const toRad = (d) => (d * Math.PI) / 180;
    const x1 = CX + R * Math.cos(toRad(startAngle));
    const y1 = CY + R * Math.sin(toRad(startAngle));
    const x2 = CX + R * Math.cos(toRad(endAngle));
    const y2 = CY + R * Math.sin(toRad(endAngle));
    const largeArc = sliceDeg > 180 ? 1 : 0;
    const path = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Label position at midpoint of arc
    const lx = CX + LABEL_R * Math.cos(toRad(midAngle));
    const ly = CY + LABEL_R * Math.sin(toRad(midAngle));

    return { ...c, path, lx, ly };
  });
}

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const [stocksResponse, alertsResponse] = await Promise.all([
          fetch('/api/stocks'),
          fetch('/api/alerts')
        ]);

        if (!stocksResponse.ok || !alertsResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const stocksData = await stocksResponse.json();
        const alertsData = await alertsResponse.json();

        setStocks(Array.isArray(stocksData) ? stocksData : []);
        setAlerts(Array.isArray(alertsData) ? alertsData : []);
      } catch (err) {
        console.error('Dashboard API error:', err);
        setError('Unable to connect to StockSense server');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const navigate = useNavigate();
  const stored = localStorage.getItem('ss_user');
  const user   = stored ? JSON.parse(stored) : { name: 'User' };
  const now = new Date('September 14, 2026 10:24:00');
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const dayStr  = now.toLocaleDateString('en-US', { weekday: 'long' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <Layout
      pageTitle="Dashboard"
      pageSubtitle={`Welcome back, ${user.name}! Here's your inventory overview.`}
    >
      {/* Date badge */}
      <div className="date-badge">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <div>
          <div className="date-main">{dateStr}</div>
          <div className="date-sub">{dayStr}, {timeStr}</div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="stat-cards">
        {STATS.map((s) => (
          <div
            key={s.label}
            className={`stat-card stat-card--${s.color}`}
            onClick={() => navigate(s.link)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(s.link)}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-body">
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-change">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
                <span>{s.change}</span>
                <span className="stat-sub">{s.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
<div className="dashboard-section">
  <div className="section-header">
    <h2>Live Stocks</h2>
  </div>

  {loading && <p>Loading stocks...</p>}

  {error && <p>{error}</p>}

  {!loading && !error && stocks.length === 0 && (
    <p>No stocks available yet.</p>
  )}

  {!loading && stocks.length > 0 && (
    <div className="stocks-list">
      {stocks.map((stock) => (
        <div className="stock-card" key={stock.id}>
          <div>
            <h3>{stock.symbol}</h3>
            <p>{stock.companyName}</p>
          </div>

          <div>
            <strong>
              {stock.price !== null && stock.price !== undefined
                ? `₹${stock.price}`
                : 'N/A'}
            </strong>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
      {/* ── Middle row ── */}
      <div className="middle-row">
        {/* Stock by Category */}
        <div className="card chart-card">
          <div className="card-header">
            <h2>Stock by Category</h2>
            <button className="view-link">View Details</button>
          </div>
          <div className="chart-body">
            <div className="pie-wrap">
              <svg width="180" height="180" viewBox="0 0 180 180">
                {buildPieSlices(PIE_CATEGORIES).map((s) => (
                  <g key={s.label}>
                    <path d={s.path} fill={s.color} stroke="#fff" strokeWidth="2" />
                    <text
                      x={s.lx}
                      y={s.ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#fff"
                      fontSize="11"
                      fontWeight="700"
                      style={{ pointerEvents: 'none' }}
                    >
                      {s.pct}%
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <ul className="pie-legend">
              {PIE_CATEGORIES.map((c) => (
                <li key={c.label}>
                  <span className="legend-dot" style={{ background: c.color }} />
                  <span className="legend-label">{c.label}</span>
                  <span className="legend-count">{c.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card activity-card">
          <div className="card-header">
            <h2>Recent Activities</h2>
            <button className="view-link">View All</button>
          </div>
          <ul className="activity-list">
            {ACTIVITIES.map((a, i) => (
              <li key={i} className="activity-row">
                <div className="activity-icon">{a.icon}</div>
                <span className="activity-text">{a.text}</span>
                <span className="activity-time">{a.time}</span>
                <span className={`badge badge--${a.status.toLowerCase().replace(' ', '-')}`}>
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Low Stock Table ── */}
      <div className="card table-card">
        <div className="card-header">
          <h2>Low Stock Items</h2>
          <button className="view-link">View All</button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {LOW_STOCK.map((row) => (
                <tr key={row.sku}>
                  <td>
                    <div className="product-cell">
                      <div className="product-thumb" />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td>{row.sku}</td>
                  <td>{row.category}</td>
                  <td className={row.stock === 0 ? 'stock-zero' : 'stock-low'}>
                    {row.stock}
                  </td>
                  <td>{row.reorder}</td>
                  <td>
                    <span className={`badge badge--${row.status === 'Out of Stock' ? 'out-of-stock' : 'low-stock'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" aria-label={`Edit ${row.name}`}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
