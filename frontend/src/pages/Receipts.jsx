import { useState } from 'react';
import Layout from '../components/Layout';
import './Receipts.css';

const STATUS_STYLES = {
  Done:    { bg: '#dcfce7', color: '#16a34a' },
  Waiting: { bg: '#fef9c3', color: '#ca8a04' },
  Draft:   { bg: '#f1f5f9', color: '#64748b' },
};

const INITIAL_RECEIPTS = [
  { id: 1,  date: '2026-09-10', receiptNo: 'RC001', supplier: 'ABC Suppliers',      status: 'Done',    items: 3 },
  { id: 2,  date: '2026-09-12', receiptNo: 'RC002', supplier: 'Metal Corp',          status: 'Waiting', items: 2 },
  { id: 3,  date: '2026-09-14', receiptNo: 'RC003', supplier: 'BuildMart',           status: 'Draft',   items: 5 },
  { id: 4,  date: '2026-09-15', receiptNo: 'RC004', supplier: 'Sri Lakshmi Traders', status: 'Done',    items: 4 },
  { id: 5,  date: '2026-09-16', receiptNo: 'RC005', supplier: 'National Hardware',   status: 'Done',    items: 6 },
  { id: 6,  date: '2026-09-17', receiptNo: 'RC006', supplier: 'Prime Supplies',      status: 'Waiting', items: 3 },
  { id: 7,  date: '2026-09-18', receiptNo: 'RC007', supplier: 'Shiva Enterprises',   status: 'Draft',   items: 1 },
  { id: 8,  date: '2026-09-19', receiptNo: 'RC008', supplier: 'BuildMart',           status: 'Done',    items: 4 },
  { id: 9,  date: '2026-09-20', receiptNo: 'RC009', supplier: 'ABC Suppliers',       status: 'Done',    items: 2 },
  { id: 10, date: '2026-09-21', receiptNo: 'RC010', supplier: 'Universal Traders',   status: 'Waiting', items: 5 },
];

const SUPPLIERS = ['ABC Suppliers', 'Metal Corp', 'BuildMart', 'Sri Lakshmi Traders', 'National Hardware', 'Prime Supplies', 'Shiva Enterprises', 'Universal Traders'];
const PRODUCTS  = ['Steel Rods (SR001)', 'Cement Bags (CB001)', 'Chair (CH001)', 'Screws (SC001)', 'Wood Planks (WP001)', 'Paint (PT001)', 'Nails (NL001)'];

const PER_PAGE  = 10;
const EMPTY_FORM = { date: '2026-09-21', supplier: '', products: [{ product: 'Steel Rods (SR001)', qty: 50 }, { product: 'Cement Bags (CB001)', qty: 100 }], notes: '' };

export default function Receipts() {
  const [receipts, setReceipts] = useState(INITIAL_RECEIPTS);
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);
  const [sortDir, setSortDir]   = useState('asc');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editReceipt, setEditReceipt] = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM);

  /* ── filter + sort ── */
  const filtered = receipts
    .filter((r) =>
      r.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      r.supplier.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortDir === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── panel helpers ── */
  const openAdd = () => { setEditReceipt(null); setForm({ ...EMPTY_FORM, products: [{ product: 'Steel Rods (SR001)', qty: 50 }, { product: 'Cement Bags (CB001)', qty: 100 }] }); setPanelOpen(true); };
  const openEdit = (r) => { setEditReceipt(r); setForm({ date: r.date, supplier: r.supplier, products: [{ product: PRODUCTS[0], qty: r.items }], notes: '' }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditReceipt(null); };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProductChange = (i, field, value) => {
    const updated = form.products.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
    setForm({ ...form, products: updated });
  };

  const addProductRow = () => setForm({ ...form, products: [...form.products, { product: PRODUCTS[0], qty: 1 }] });
  const removeProductRow = (i) => setForm({ ...form, products: form.products.filter((_, idx) => idx !== i) });

  const handleSave = (e) => {
    e.preventDefault();
    if (editReceipt) {
      setReceipts((prev) => prev.map((r) =>
        r.id === editReceipt.id
          ? { ...r, date: form.date, supplier: form.supplier, items: form.products.length }
          : r
      ));
    } else {
      const newId = Math.max(...receipts.map((r) => r.id)) + 1;
      const newNo = `RC${String(newId).padStart(3, '0')}`;
      setReceipts((prev) => [...prev, { id: newId, date: form.date, receiptNo: newNo, supplier: form.supplier, status: 'Draft', items: form.products.length }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setReceipts((prev) => prev.filter((r) => r.id !== id));

  return (
    <Layout pageTitle="Receipts (Incoming Stock)" pageSubtitle="Manage all incoming stock receipts from suppliers.">
      <div className="receipts-page">
        {/* Toolbar */}
        <div className="receipts-toolbar">
          <div className="rec-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search receipts..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="new-receipt-btn" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Receipt
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="receipts-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="sortable" onClick={() => setSortDir((d) => d === 'asc' ? 'desc' : 'asc')}>
                    Date
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
                      {sortDir === 'asc'
                        ? <polyline points="18 15 12 9 6 15"/>
                        : <polyline points="6 9 12 15 18 9"/>}
                    </svg>
                  </th>
                  <th>Receipt No.</th>
                  <th>Supplier</th>
                  <th>Status</th>
                  <th>Total Items</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((r, i) => {
                  const st = STATUS_STYLES[r.status] || STATUS_STYLES.Draft;
                  return (
                    <tr key={r.id}>
                      <td className="col-num">{(page - 1) * PER_PAGE + i + 1}</td>
                      <td>{r.date}</td>
                      <td className="col-mono">{r.receiptNo}</td>
                      <td>{r.supplier}</td>
                      <td>
                        <span className="status-badge" style={{ background: st.bg, color: st.color }}>
                          {r.status}
                        </span>
                      </td>
                      <td>{r.items}</td>
                      <td>
                        <div className="action-btns">
                          <button className="act-view" aria-label="View">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          <button className="act-edit" onClick={() => openEdit(r)} aria-label="Edit">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button className="act-delete" onClick={() => handleDelete(r.id)} aria-label="Delete">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/>
                              <path d="M9 6V4h6v2"/>
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
            <span className="pagination-info">
              Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} receipts
            </span>
            <div className="pagination-btns">
              <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} className={`pg-num${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── New / Edit Receipt Panel ── */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editReceipt ? 'Edit Receipt' : 'New Receipt'}</h3>
              <button className="panel-close" onClick={closePanel} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                {/* Date */}
                <div className="pf-group">
                  <label>Date <span className="req">*</span></label>
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

                {/* Supplier */}
                <div className="pf-group">
                  <label>Supplier <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="supplier" value={form.supplier} onChange={handleFormChange} required>
                      <option value="">Select supplier</option>
                      {SUPPLIERS.map((s) => <option key={s} value={s}>{s}</option>)}
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
                        <input
                          type="number"
                          min="1"
                          className="qty-input"
                          value={p.qty}
                          onChange={(e) => handleProductChange(i, 'qty', e.target.value)}
                        />
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
