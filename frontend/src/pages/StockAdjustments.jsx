import { useState } from 'react';
import Layout from '../components/Layout';
import './StockAdjustments.css';

const STATUS_STYLES = {
  Done:    { bg: '#dcfce7', color: '#16a34a' },
  Pending: { bg: '#fef9c3', color: '#ca8a04' },
  Draft:   { bg: '#f1f5f9', color: '#64748b' },
};

const INITIAL_ADJUSTMENTS = [
  { id: 1,  adjNo: 'ADJ001', date: '2026-09-14', product: 'Steel Rods (SR001)',     location: 'Main Warehouse',  oldQty: 100, newQty: 97,  reason: 'Damaged Items',    status: 'Done'    },
  { id: 2,  adjNo: 'ADJ002', date: '2026-09-15', product: 'Chair (CH001)',           location: 'Rack A',          oldQty: 50,  newQty: 52,  reason: 'Counting Error',   status: 'Done'    },
  { id: 3,  adjNo: 'ADJ003', date: '2026-09-16', product: 'Screws (SC001)',          location: 'Production Rack', oldQty: 500, newQty: 495, reason: 'Used in Maintenance', status: 'Done' },
  { id: 4,  adjNo: 'ADJ004', date: '2026-09-17', product: 'Cement Bags (CB001)',     location: 'Main Warehouse',  oldQty: 200, newQty: 180, reason: 'Damaged Bags',     status: 'Done'    },
  { id: 5,  adjNo: 'ADJ005', date: '2026-09-18', product: 'Wood Planks (WP001)',     location: 'Rack B',          oldQty: 70,  newQty: 68,  reason: 'Quality Check',    status: 'Pending' },
  { id: 6,  adjNo: 'ADJ006', date: '2026-09-19', product: 'Paint (PT001)',           location: 'Main Warehouse',  oldQty: 35,  newQty: 30,  reason: 'Spillage',         status: 'Done'    },
  { id: 7,  adjNo: 'ADJ007', date: '2026-09-20', product: 'Nails (NL001)',           location: 'Rack A',          oldQty: 300, newQty: 310, reason: 'Stock Count',      status: 'Done'    },
  { id: 8,  adjNo: 'ADJ008', date: '2026-09-21', product: 'Plywood (PW001)',         location: 'Rack B',          oldQty: 60,  newQty: 55,  reason: 'Damaged Items',    status: 'Draft'   },
  { id: 9,  adjNo: 'ADJ009', date: '2026-09-21', product: 'Carton Box (CB002)',      location: 'Main Warehouse',  oldQty: 150, newQty: 145, reason: 'Torn Boxes',       status: 'Done'    },
  { id: 10, adjNo: 'ADJ010', date: '2026-09-21', product: 'Packing Tape (PT002)',    location: 'Rack A',          oldQty: 400, newQty: 398, reason: 'Counting Error',   status: 'Done'    },
];

const PRODUCT_STOCK = {
  'Steel Rods (SR001)':   100,
  'Chair (CH001)':        50,
  'Screws (SC001)':       500,
  'Cement Bags (CB001)':  200,
  'Wood Planks (WP001)':  70,
  'Paint (PT001)':        35,
  'Nails (NL001)':        300,
  'Plywood (PW001)':      60,
  'Carton Box (CB002)':   150,
  'Packing Tape (PT002)': 400,
};

const PRODUCTS  = Object.keys(PRODUCT_STOCK);
const LOCATIONS = ['Main Warehouse', 'Warehouse 1', 'Warehouse 2', 'Rack A', 'Rack B', 'Production Rack', 'Quality Check'];
const REASONS   = ['Damaged Items', 'Counting Error', 'Used in Maintenance', 'Damaged Bags', 'Quality Check', 'Spillage', 'Stock Count', 'Torn Boxes', 'Expired Stock', 'Other'];

const PER_PAGE   = 10;
const EMPTY_FORM = { product: 'Steel Rods (SR001)', location: 'Main Warehouse', newQty: '97', reason: 'Damaged Items', notes: '' };

export default function StockAdjustments() {
  const [adjustments, setAdjustments] = useState(INITIAL_ADJUSTMENTS);
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [sortDir, setSortDir]   = useState('asc');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);

  /* ── filter + sort ── */
  const filtered = adjustments
    .filter((a) =>
      a.adjNo.toLowerCase().includes(search.toLowerCase()) ||
      a.product.toLowerCase().includes(search.toLowerCase()) ||
      a.reason.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortDir === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── panel helpers ── */
  const openAdd  = () => { setEditItem(null); setForm(EMPTY_FORM); setPanelOpen(true); };
  const openEdit = (a) => { setEditItem(a); setForm({ product: a.product, location: a.location, newQty: String(a.newQty), reason: a.reason, notes: '' }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditItem(null); };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const currentQty = PRODUCT_STOCK[form.product] ?? 0;

  const handleSave = (e) => {
    e.preventDefault();
    if (editItem) {
      setAdjustments((prev) => prev.map((a) =>
        a.id === editItem.id
          ? { ...a, product: form.product, location: form.location, oldQty: currentQty, newQty: Number(form.newQty), reason: form.reason }
          : a
      ));
    } else {
      const newId = Math.max(...adjustments.map((a) => a.id)) + 1;
      const newNo = `ADJ${String(newId).padStart(3, '0')}`;
      setAdjustments((prev) => [...prev, {
        id: newId, adjNo: newNo,
        date: new Date().toISOString().slice(0, 10),
        product: form.product, location: form.location,
        oldQty: currentQty, newQty: Number(form.newQty),
        reason: form.reason, status: 'Draft',
      }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setAdjustments((prev) => prev.filter((a) => a.id !== id));

  return (
    <Layout pageTitle="Stock Adjustments" pageSubtitle="Adjust stock quantities due to damage, loss, or other reasons.">
      <div className="adjustments-page">
        {/* Toolbar */}
        <div className="adj-toolbar">
          <div className="adj-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search adjustments..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="new-adj-btn" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Adjustment
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="adj-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="sortable" onClick={() => setSortDir((d) => d === 'asc' ? 'desc' : 'asc')}>
                    Date
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                      {sortDir === 'asc' ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                    </svg>
                  </th>
                  <th>Adjustment No.</th>
                  <th>Product</th>
                  <th>Location</th>
                  <th>Old Qty</th>
                  <th>New Qty</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((a, i) => {
                  const st = STATUS_STYLES[a.status] || STATUS_STYLES.Draft;
                  return (
                    <tr key={a.id}>
                      <td className="col-num">{(page - 1) * PER_PAGE + i + 1}</td>
                      <td>{a.date}</td>
                      <td className="col-mono">{a.adjNo}</td>
                      <td>{a.product}</td>
                      <td>{a.location}</td>
                      <td>{a.oldQty}</td>
                      <td className={a.newQty < a.oldQty ? 'qty-down' : 'qty-up'}>{a.newQty}</td>
                      <td className="col-reason">{a.reason}</td>
                      <td>
                        <span className="status-badge" style={{ background: st.bg, color: st.color }}>{a.status}</span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="act-edit" onClick={() => openEdit(a)} aria-label="Edit">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button className="act-delete" onClick={() => handleDelete(a.id)} aria-label="Delete">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-row">
            <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} adjustments</span>
            <div className="pagination-btns">
              <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page === 1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map((n) => (
                <button key={n} className={`pg-num${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page === totalPages}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Panel ── */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editItem ? 'Edit Adjustment' : 'New Adjustment'}</h3>
              <button className="panel-close" onClick={closePanel} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                {/* Product */}
                <div className="pf-group">
                  <label>Product <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="product" value={form.product} onChange={handleFormChange} required>
                      {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* Location */}
                <div className="pf-group">
                  <label>Location <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="location" value={form.location} onChange={handleFormChange} required>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* Current Qty (read-only) */}
                <div className="pf-group">
                  <label>Current Quantity</label>
                  <input type="number" value={currentQty} readOnly className="input-readonly" />
                </div>

                {/* New Qty */}
                <div className="pf-group">
                  <label>New Quantity <span className="req">*</span></label>
                  <input name="newQty" type="number" min="0" value={form.newQty} onChange={handleFormChange} required className="input-field" />
                </div>

                {/* Reason */}
                <div className="pf-group">
                  <label>Reason <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="reason" value={form.reason} onChange={handleFormChange} required>
                      {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* Notes */}
                <div className="pf-group">
                  <label>Notes (Optional)</label>
                  <textarea name="notes" placeholder="Enter any notes..." value={form.notes} onChange={handleFormChange} rows={4} />
                </div>
              </div>

              <div className="panel-footer">
                <button type="button" className="btn-cancel" onClick={closePanel}>Cancel</button>
                <button type="submit" className="btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
