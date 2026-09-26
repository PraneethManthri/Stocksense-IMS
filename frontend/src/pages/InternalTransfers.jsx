import { useState } from 'react';
import Layout from '../components/Layout';
import './InternalTransfers.css';

const STATUS_STYLES = {
  Done:       { bg: '#dcfce7', color: '#16a34a' },
  Waiting:    { bg: '#fef9c3', color: '#ca8a04' },
  Draft:      { bg: '#f1f5f9', color: '#64748b' },
  'In Transit': { bg: '#eff6ff', color: '#2563eb' },
};

const INITIAL_TRANSFERS = [
  { id: 1,  transferNo: 'TR001', date: '2026-09-12', from: 'Main Warehouse',  to: 'Production Rack', status: 'Done',       },
  { id: 2,  transferNo: 'TR002', date: '2026-09-14', from: 'Rack A',          to: 'Rack B',           status: 'Waiting',    },
  { id: 3,  transferNo: 'TR003', date: '2026-09-15', from: 'Warehouse 1',     to: 'Warehouse 2',      status: 'Draft',      },
  { id: 4,  transferNo: 'TR004', date: '2026-09-16', from: 'Main Warehouse',  to: 'Quality Check',    status: 'Done',       },
  { id: 5,  transferNo: 'TR005', date: '2026-09-17', from: 'Rack B',          to: 'Production Rack',  status: 'In Transit', },
  { id: 6,  transferNo: 'TR006', date: '2026-09-18', from: 'Warehouse 2',     to: 'Main Warehouse',   status: 'Done',       },
  { id: 7,  transferNo: 'TR007', date: '2026-09-19', from: 'Rack A',          to: 'Warehouse 1',      status: 'Waiting',    },
  { id: 8,  transferNo: 'TR008', date: '2026-09-20', from: 'Quality Check',   to: 'Main Warehouse',   status: 'Draft',      },
  { id: 9,  transferNo: 'TR009', date: '2026-09-21', from: 'Production Rack', to: 'Rack A',           status: 'Done',       },
  { id: 10, transferNo: 'TR010', date: '2026-09-21', from: 'Warehouse 1',     to: 'Rack B',           status: 'In Transit', },
];

const LOCATIONS = ['Main Warehouse', 'Warehouse 1', 'Warehouse 2', 'Rack A', 'Rack B', 'Production Rack', 'Quality Check'];
const PRODUCTS  = ['Steel Rods (SR001)', 'Cement Bags (CB001)', 'Chair (CH001)', 'Table (TB001)', 'Screws (SC001)', 'Wood Planks (WP001)', 'Paint (PT001)', 'Nails (NL001)'];

const PER_PAGE   = 10;
const EMPTY_FORM = { from: '', to: '', products: [{ product: 'Steel Rods (SR001)', qty: 20 }, { product: 'Cement Bags (CB001)', qty: 50 }], date: '2026-09-21', notes: '' };

export default function InternalTransfers() {
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [sortDir, setSortDir]     = useState('asc');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);

  /* ── filter + sort ── */
  const filtered = transfers
    .filter((t) =>
      t.transferNo.toLowerCase().includes(search.toLowerCase()) ||
      t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortDir === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── panel helpers ── */
  const openAdd  = () => { setEditItem(null); setForm({ ...EMPTY_FORM, products: [{ product: 'Steel Rods (SR001)', qty: 20 }, { product: 'Cement Bags (CB001)', qty: 50 }] }); setPanelOpen(true); };
  const openEdit = (t) => { setEditItem(t); setForm({ from: t.from, to: t.to, products: [{ product: PRODUCTS[0], qty: 10 }], date: t.date, notes: '' }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditItem(null); };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProductChange = (i, field, value) => {
    const updated = form.products.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
    setForm({ ...form, products: updated });
  };

  const addProductRow    = () => setForm({ ...form, products: [...form.products, { product: PRODUCTS[0], qty: 1 }] });
  const removeProductRow = (i) => setForm({ ...form, products: form.products.filter((_, idx) => idx !== i) });

  const handleValidate = (e) => {
    e.preventDefault();
    if (editItem) {
      setTransfers((prev) => prev.map((t) =>
        t.id === editItem.id ? { ...t, from: form.from, to: form.to, date: form.date, status: 'Done' } : t
      ));
    } else {
      const newId = Math.max(...transfers.map((t) => t.id)) + 1;
      const newNo = `TR${String(newId).padStart(3, '0')}`;
      setTransfers((prev) => [...prev, { id: newId, transferNo: newNo, date: form.date, from: form.from, to: form.to, status: 'Draft' }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setTransfers((prev) => prev.filter((t) => t.id !== id));

  return (
    <Layout pageTitle="Internal Transfers" pageSubtitle="Transfer stock between different locations within your organization.">
      <div className="transfers-page">
        {/* Toolbar */}
        <div className="transfers-toolbar">
          <div className="tr-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search transfers..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="new-transfer-btn" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Transfer
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="transfers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="sortable" onClick={() => setSortDir((d) => d === 'asc' ? 'desc' : 'asc')}>
                    Date
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                      {sortDir === 'asc' ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
                    </svg>
                  </th>
                  <th>Transfer No.</th>
                  <th>From Location</th>
                  <th>To Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((t, i) => {
                  const st = STATUS_STYLES[t.status] || STATUS_STYLES.Draft;
                  return (
                    <tr key={t.id}>
                      <td className="col-num">{(page - 1) * PER_PAGE + i + 1}</td>
                      <td>{t.date}</td>
                      <td className="col-mono">{t.transferNo}</td>
                      <td>{t.from}</td>
                      <td>{t.to}</td>
                      <td>
                        <span className="status-badge" style={{ background: st.bg, color: st.color }}>{t.status}</span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="act-view" aria-label="View">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          <button className="act-edit" onClick={() => openEdit(t)} aria-label="Edit">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button className="act-delete" onClick={() => handleDelete(t.id)} aria-label="Delete">
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
            <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} transfers</span>
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

      {/* ── New / Edit Transfer Panel ── */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editItem ? 'Edit Transfer' : 'New Internal Transfer'}</h3>
              <button className="panel-close" onClick={closePanel} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleValidate} className="panel-form">
              <div className="panel-scroll">
                {/* From Location */}
                <div className="pf-group">
                  <label>From Location <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="from" value={form.from} onChange={handleFormChange} required>
                      <option value="">Select source location</option>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* To Location */}
                <div className="pf-group">
                  <label>To Location <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="to" value={form.to} onChange={handleFormChange} required>
                      <option value="">Select destination location</option>
                      {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* Products */}
                <div className="pf-group">
                  <label>Products <span className="req">*</span></label>
                  <div className="products-rows">
                    {form.products.map((p, i) => (
                      <div key={i} className="product-row">
                        <div className="select-wrap product-select">
                          <select value={p.product} onChange={(e) => handleProductChange(i, 'product', e.target.value)}>
                            {PRODUCTS.map((pr) => <option key={pr} value={pr}>{pr}</option>)}
                          </select>
                          <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <input type="number" min="1" className="qty-input" value={p.qty} onChange={(e) => handleProductChange(i, 'qty', e.target.value)} />
                        <button type="button" className="remove-product-btn" onClick={() => removeProductRow(i)} aria-label="Remove">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button type="button" className="add-product-row-btn" onClick={addProductRow}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Product
                    </button>
                  </div>
                </div>

                {/* Transfer Date */}
                <div className="pf-group">
                  <label>Transfer Date <span className="req">*</span></label>
                  <div className="input-icon-wrap">
                    <span className="field-icon">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </span>
                    <input name="date" type="date" value={form.date} onChange={handleFormChange} required />
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
                <button type="submit" className="btn-validate">Validate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
