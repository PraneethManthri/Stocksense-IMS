import { useState } from 'react';
import Layout from '../components/Layout';
import './MoveHistory.css';

const TYPE_STYLES = {
  Receipt:    { bg: '#dcfce7', color: '#16a34a' },
  Delivery:   { bg: '#fee2e2', color: '#dc2626' },
  Transfer:   { bg: '#eff6ff', color: '#2563eb' },
  Adjustment: { bg: '#f5f3ff', color: '#7c3aed' },
};

const ALL_RECORDS = [
  { id: 1,  date: '2026-09-10', type: 'Receipt',    docNo: 'RC001', ref: '-', product: 'Steel Rods (SR001)',    qty: +50,  from: '-',              to: 'Main Warehouse',   status: 'Done', remarks: 'Incoming stock from ABC Suppliers' },
  { id: 2,  date: '2026-09-11', type: 'Delivery',   docNo: 'DO001', ref: '-', product: 'Chair (CH001)',          qty: -10,  from: 'Main WH',        to: 'Customer A',       status: 'Done', remarks: 'Delivered to Customer A' },
  { id: 3,  date: '2026-09-12', type: 'Transfer',   docNo: 'TR001', ref: '-', product: 'Steel Rods (SR001)',    qty: -20,  from: 'Main WH',        to: 'Production Rack',  status: 'Done', remarks: 'Internal transfer for production' },
  { id: 4,  date: '2026-09-12', type: 'Transfer',   docNo: 'TR001', ref: '-', product: 'Steel Rods (SR001)',    qty: +20,  from: 'Production Rack',to: 'Main WH',          status: 'Done', remarks: 'Return transfer' },
  { id: 5,  date: '2026-09-14', type: 'Adjustment', docNo: 'ADJ001',ref: '-', product: 'Steel Rods (SR001)',    qty: -3,   from: 'Main WH',        to: '',                 status: 'Done', remarks: 'Damaged items' },
  { id: 6,  date: '2026-09-15', type: 'Receipt',    docNo: 'RC002', ref: '-', product: 'Cement Bags (CB001)',   qty: +100, from: '-',              to: 'Main Warehouse',   status: 'Done', remarks: 'Purchase from Metal Corp' },
  { id: 7,  date: '2026-09-16', type: 'Delivery',   docNo: 'DO002', ref: '-', product: 'Table (TB001)',          qty: -5,   from: 'Main WH',        to: 'Customer B',       status: 'Done', remarks: 'Delivered to Customer B' },
  { id: 8,  date: '2026-09-17', type: 'Transfer',   docNo: 'TR002', ref: '-', product: 'Chair (CH001)',          qty: -10,  from: 'Main WH',        to: 'Rack B',           status: 'Done', remarks: 'Internal transfer' },
  { id: 9,  date: '2026-09-19', type: 'Adjustment', docNo: 'ADJ002',ref: '-', product: 'Wood Planks (WP001)',   qty: -5,   from: 'Rack A',         to: '',                 status: 'Done', remarks: 'Counting error' },
  { id: 10, date: '2026-09-21', type: 'Receipt',    docNo: 'RC003', ref: '-', product: 'Screws (SC001)',         qty: +200, from: '-',              to: 'Main Warehouse',   status: 'Done', remarks: 'Purchase from BuildMart' },
  { id: 11, date: '2026-09-21', type: 'Delivery',   docNo: 'DO003', ref: '-', product: 'Steel Rods (SR001)',    qty: -15,  from: 'Main WH',        to: 'Customer C',       status: 'Done', remarks: 'Delivered to Customer C' },
  { id: 12, date: '2026-09-21', type: 'Transfer',   docNo: 'TR003', ref: '-', product: 'Nails (NL001)',          qty: -30,  from: 'Main WH',        to: 'Production Rack',  status: 'Done', remarks: 'Production use' },
  { id: 13, date: '2026-09-20', type: 'Receipt',    docNo: 'RC004', ref: '-', product: 'Paint (PT001)',          qty: +20,  from: '-',              to: 'Main Warehouse',   status: 'Done', remarks: 'Purchase from Prime Supplies' },
  { id: 14, date: '2026-09-20', type: 'Adjustment', docNo: 'ADJ003',ref: '-', product: 'Cement Bags (CB001)',   qty: -20,  from: 'Main WH',        to: '',                 status: 'Done', remarks: 'Damaged bags' },
  { id: 15, date: '2026-09-19', type: 'Delivery',   docNo: 'DO004', ref: '-', product: 'Plywood (PW001)',        qty: -8,   from: 'Main WH',        to: 'Customer D',       status: 'Done', remarks: 'Delivered to Customer D' },
  { id: 16, date: '2026-09-18', type: 'Transfer',   docNo: 'TR004', ref: '-', product: 'Carton Box (CB002)',     qty: +50,  from: 'Rack A',         to: 'Main WH',          status: 'Done', remarks: 'Restock from rack' },
  { id: 17, date: '2026-09-18', type: 'Receipt',    docNo: 'RC005', ref: '-', product: 'Bolts (BL001)',          qty: +100, from: '-',              to: 'Main Warehouse',   status: 'Done', remarks: 'Purchase from National Hardware' },
  { id: 18, date: '2026-09-17', type: 'Adjustment', docNo: 'ADJ004',ref: '-', product: 'Wood Planks (WP001)',   qty: -2,   from: 'Rack B',         to: '',                 status: 'Done', remarks: 'Quality check removal' },
  { id: 19, date: '2026-09-16', type: 'Delivery',   docNo: 'DO005', ref: '-', product: 'Chair (CH001)',          qty: -6,   from: 'Main WH',        to: 'Customer E',       status: 'Done', remarks: 'Bulk order delivery' },
  { id: 20, date: '2026-09-15', type: 'Transfer',   docNo: 'TR005', ref: '-', product: 'Paint (PT001)',          qty: -10,  from: 'Main WH',        to: 'Rack B',           status: 'Done', remarks: 'Transfer to rack' },
  { id: 21, date: '2026-09-14', type: 'Receipt',    docNo: 'RC006', ref: '-', product: 'Packing Tape (PT002)',   qty: +150, from: '-',              to: 'Main Warehouse',   status: 'Done', remarks: 'Purchase from Universal Traders' },
  { id: 22, date: '2026-09-13', type: 'Delivery',   docNo: 'DO006', ref: '-', product: 'Table (TB001)',          qty: -3,   from: 'Main WH',        to: 'Customer F',       status: 'Done', remarks: 'Delivered to Customer F' },
  { id: 23, date: '2026-09-12', type: 'Adjustment', docNo: 'ADJ005',ref: '-', product: 'Screws (SC001)',         qty: -5,   from: 'Production Rack',to: '',                 status: 'Done', remarks: 'Used in maintenance' },
  { id: 24, date: '2026-09-10', type: 'Transfer',   docNo: 'TR006', ref: '-', product: 'Cement Bags (CB001)',   qty: +30,  from: 'Warehouse 2',    to: 'Main WH',          status: 'Done', remarks: 'Restock transfer' },
];

const DOC_TYPES   = ['All', 'Receipt', 'Delivery', 'Transfer', 'Adjustment'];
const STATUSES    = ['All', 'Done', 'Pending', 'Draft'];
const WAREHOUSES  = ['All', 'Main Warehouse', 'Warehouse 1', 'Warehouse 2', 'Rack A', 'Rack B', 'Production Rack'];
const CATEGORIES  = ['All', 'Raw Materials', 'Finished Goods', 'Components', 'Packaging'];

const PER_PAGE = 10;

export default function MoveHistory() {
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [sortDir, setSortDir]   = useState('asc');

  /* filter state */
  const [filters, setFilters] = useState({ type: 'All', status: 'All', warehouse: 'All', category: 'All', dateFrom: '2026-09-01', dateTo: '2026-09-21' });
  const [applied, setApplied] = useState({ ...filters });

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleApply = () => { setApplied({ ...filters }); setPage(1); };

  /* filter + search + sort */
  const filtered = ALL_RECORDS
    .filter((r) => {
      if (applied.type !== 'All' && r.type !== applied.type) return false;
      if (applied.status !== 'All' && r.status !== applied.status) return false;
      if (r.date < applied.dateFrom || r.date > applied.dateTo) return false;
      if (search && !r.product.toLowerCase().includes(search.toLowerCase()) &&
          !r.docNo.toLowerCase().includes(search.toLowerCase()) &&
          !r.remarks.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => sortDir === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <Layout pageTitle="Move History (Stock Ledger)" pageSubtitle="Track all stock movements in your inventory.">
      <div className="history-page">
        {/* Export button */}
        <div className="history-topbar">
          <button className="export-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        {/* Filter bar */}
        <div className="filter-bar">
          <div className="filter-group">
            <label>Document Type</label>
            <div className="select-wrap">
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                {DOC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <svg className="select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <div className="select-wrap">
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <svg className="select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="filter-group">
            <label>Warehouse</label>
            <div className="select-wrap">
              <select name="warehouse" value={filters.warehouse} onChange={handleFilterChange}>
                {WAREHOUSES.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
              <svg className="select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <div className="select-wrap">
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <svg className="select-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="filter-group date-range">
            <label>Date Range</label>
            <div className="date-inputs">
              <div className="date-input-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
              </div>
              <span className="date-sep">to</span>
              <div className="date-input-wrap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
              </div>
            </div>
          </div>
          <button className="apply-btn" onClick={handleApply}>Apply</button>
        </div>

        {/* Search */}
        <div className="history-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Search by product, reference, document number..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="history-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="sortable" onClick={() => setSortDir((d) => d === 'asc' ? 'desc' : 'asc')}>
                    Date
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                      {sortDir === 'asc' ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                    </svg>
                  </th>
                  <th>Type</th>
                  <th>Document No.</th>
                  <th>Reference</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>From → To</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((r, i) => {
                  const ts = TYPE_STYLES[r.type] || { bg: '#f1f5f9', color: '#64748b' };
                  const fromTo = r.from && r.to ? `${r.from} → ${r.to}` : r.from ? `${r.from}` : `→ ${r.to}`;
                  return (
                    <tr key={r.id}>
                      <td className="col-num">{(page - 1) * PER_PAGE + i + 1}</td>
                      <td>{r.date}</td>
                      <td>
                        <span className="type-badge" style={{ background: ts.bg, color: ts.color }}>{r.type}</span>
                      </td>
                      <td className="col-mono">{r.docNo}</td>
                      <td className="col-ref">{r.ref}</td>
                      <td>{r.product}</td>
                      <td className={r.qty > 0 ? 'qty-pos' : 'qty-neg'}>
                        {r.qty > 0 ? `+${r.qty}` : r.qty}
                      </td>
                      <td className="col-route">{fromTo}</td>
                      <td>
                        <span className="status-badge done">{r.status}</span>
                      </td>
                      <td className="col-remarks">{r.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-row">
            <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} records</span>
            <div className="pagination-btns">
              <button className="pg-arrow first" onClick={() => setPage(1)} disabled={page === 1}>«</button>
              <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page === 1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map((n) => (
                <button key={n} className={`pg-num${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page === totalPages}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <button className="pg-arrow last" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
