import { useState } from 'react';
import Layout from '../components/Layout';
import './Products.css';

const CATEGORY_COLORS = {
  'Raw Materials':  { bg: '#eff6ff', color: '#2563eb' },
  'Finished Goods': { bg: '#f0fdf4', color: '#16a34a' },
  'Components':     { bg: '#fffbeb', color: '#d97706' },
  'Packaging':      { bg: '#fdf2f8', color: '#db2777' },
};

/* ── Per-product SVG icons ── */
const PRODUCT_ICONS = {
  'Steel Rods': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" y1="12" x2="22" y2="12"/>
      <line x1="2" y1="8"  x2="22" y2="8"/>
      <line x1="2" y1="16" x2="22" y2="16"/>
    </svg>
  ),
  'Chair': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 19v-7"/>
      <path d="M18 19v-7"/>
      <path d="M4 10h16"/>
      <path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/>
      <path d="M6 19h12"/>
    </svg>
  ),
  'Screws': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2"  x2="12" y2="22"/>
      <path d="M8 6h8"/>
      <path d="M9 10h6"/>
      <path d="M10 14h4"/>
      <path d="M11 18h2"/>
    </svg>
  ),
  'Wood Planks': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7"  width="20" height="4" rx="1"/>
      <rect x="2" y="13" width="20" height="4" rx="1"/>
      <line x1="7"  y1="7"  x2="7"  y2="17"/>
      <line x1="12" y1="7"  x2="12" y2="17"/>
      <line x1="17" y1="7"  x2="17" y2="17"/>
    </svg>
  ),
  'Table': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="3" rx="1"/>
      <line x1="6"  y1="10" x2="6"  y2="20"/>
      <line x1="18" y1="10" x2="18" y2="20"/>
    </svg>
  ),
  'Cement Bags': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <line x1="4"  y1="12" x2="20" y2="12"/>
      <line x1="12" y1="4"  x2="12" y2="8"/>
      <line x1="12" y1="16" x2="12" y2="20"/>
    </svg>
  ),
  'Paint': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 11c0 5-7 11-7 11S5 16 5 11a7 7 0 0 1 14 0z"/>
      <circle cx="12" cy="11" r="2"/>
    </svg>
  ),
  'Nails': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2"  x2="12" y2="18"/>
      <line x1="8"  y1="6"  x2="16" y2="6"/>
      <path d="M10 18 L12 22 L14 18"/>
    </svg>
  ),
  'Plywood': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5"  width="20" height="3" rx="0.5"/>
      <rect x="2" y="10" width="20" height="3" rx="0.5"/>
      <rect x="2" y="15" width="20" height="3" rx="0.5"/>
    </svg>
  ),
  'Carton Box': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  'Packing Tape': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="3"  x2="12" y2="8"/>
      <line x1="12" y1="16" x2="12" y2="21"/>
    </svg>
  ),
  'Bolts': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2"  x2="12" y2="20"/>
      <path d="M8 4h8l-1 4H9z"/>
      <line x1="9"  y1="12" x2="15" y2="12"/>
      <line x1="10" y1="16" x2="14" y2="16"/>
    </svg>
  ),
};

/* fallback icon for any new product */
function DefaultProductIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  );
}

const INITIAL_PRODUCTS = [
  { id: 1,  name: 'Steel Rods',   sku: 'SR001', category: 'Raw Materials',  unit: 'kg',    stock: 120, reorder: 20 },
  { id: 2,  name: 'Chair',        sku: 'CH001', category: 'Finished Goods', unit: 'pcs',   stock: 45,  reorder: 10 },
  { id: 3,  name: 'Screws',       sku: 'SC001', category: 'Components',     unit: 'pcs',   stock: 500, reorder: 100 },
  { id: 4,  name: 'Wood Planks',  sku: 'WP001', category: 'Raw Materials',  unit: 'pcs',   stock: 70,  reorder: 20 },
  { id: 5,  name: 'Table',        sku: 'TB001', category: 'Finished Goods', unit: 'pcs',   stock: 12,  reorder: 5 },
  { id: 6,  name: 'Cement Bags',  sku: 'CB001', category: 'Raw Materials',  unit: 'pcs',   stock: 200, reorder: 50 },
  { id: 7,  name: 'Paint',        sku: 'PT001', category: 'Components',     unit: 'liters',stock: 35,  reorder: 10 },
  { id: 8,  name: 'Nails',        sku: 'NL001', category: 'Components',     unit: 'kg',    stock: 300, reorder: 50 },
  { id: 9,  name: 'Plywood',      sku: 'PW001', category: 'Raw Materials',  unit: 'pcs',   stock: 60,  reorder: 15 },
  { id: 10, name: 'Carton Box',   sku: 'CB002', category: 'Packaging',      unit: 'pcs',   stock: 150, reorder: 30 },
  { id: 11, name: 'Packing Tape', sku: 'PT002', category: 'Packaging',      unit: 'pcs',   stock: 400, reorder: 80 },
  { id: 12, name: 'Bolts',        sku: 'BL001', category: 'Components',     unit: 'pcs',   stock: 250, reorder: 60 },
];

const CATEGORIES = ['Raw Materials', 'Finished Goods', 'Components', 'Packaging'];
const UNITS      = ['kg', 'pcs', 'liters', 'meters', 'boxes'];
const PER_PAGE   = 12;

const EMPTY_FORM = { name: '', sku: '', category: '', unit: '', stock: '0', reorder: '0', description: '' };

export default function Products() {
  const [products, setProducts]     = useState(INITIAL_PRODUCTS);
  const [search, setSearch]         = useState('');
  const [page, setPage]             = useState(1);
  const [panelOpen, setPanelOpen]   = useState(false);
  const [editProduct, setEditProduct] = useState(null); // null = add mode
  const [form, setForm]             = useState(EMPTY_FORM);

  /* ── filtering ── */
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── panel helpers ── */
  const openAdd = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setPanelOpen(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, sku: p.sku, category: p.category, unit: p.unit, stock: String(p.stock), reorder: String(p.reorder), description: '' });
    setPanelOpen(true);
  };

  const closePanel = () => { setPanelOpen(false); setEditProduct(null); };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (editProduct) {
      setProducts((prev) => prev.map((p) =>
        p.id === editProduct.id
          ? { ...p, name: form.name, sku: form.sku, category: form.category, unit: form.unit, stock: Number(form.stock), reorder: Number(form.reorder) }
          : p
      ));
    } else {
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts((prev) => [...prev, { id: newId, name: form.name, sku: form.sku, category: form.category, unit: form.unit, stock: Number(form.stock), reorder: Number(form.reorder) }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  return (
    <Layout pageTitle="Products" pageSubtitle="Manage all inventory products in your system.">
      <div className={`products-page${panelOpen ? ' panel-open' : ''}`}>
        {/* ── Toolbar ── */}
        <div className="products-toolbar">
          <div className="prod-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button className="add-product-btn" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Product
          </button>
        </div>

        {/* ── Table ── */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="products-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Unit</th>
                  <th>Current Stock</th>
                  <th>Reorder Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((p, i) => {
                  const cat = CATEGORY_COLORS[p.category] || { bg: '#f1f5f9', color: '#64748b' };
                  return (
                    <tr key={p.id}>
                      <td className="col-num">{(page - 1) * PER_PAGE + i + 1}</td>
                      <td>
                        <div className="product-name-cell">
                          <div className="product-thumb">
                            {PRODUCT_ICONS[p.name] || <DefaultProductIcon />}
                          </div>
                          <span>{p.name}</span>
                        </div>
                      </td>
                      <td className="col-sku">{p.sku}</td>
                      <td>
                        <span className="cat-badge" style={{ background: cat.bg, color: cat.color }}>
                          {p.category}
                        </span>
                      </td>
                      <td>{p.unit}</td>
                      <td>{p.stock}</td>
                      <td>{p.reorder}</td>
                      <td>
                        <div className="action-btns">
                          <button className="act-edit" onClick={() => openEdit(p)} aria-label="Edit">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button className="act-delete" onClick={() => handleDelete(p.id)} aria-label="Delete">
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
              Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} products
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

      {/* ── Add/Edit Panel ── */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button className="panel-close" onClick={closePanel} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                <div className="pf-group">
                  <label>Name <span className="req">*</span></label>
                  <input name="name" type="text" placeholder="Enter product name" value={form.name} onChange={handleFormChange} required />
                </div>

                <div className="pf-group">
                  <label>SKU / Code <span className="req">*</span></label>
                  <input name="sku" type="text" placeholder="Enter SKU" value={form.sku} onChange={handleFormChange} required />
                </div>

                <div className="pf-group">
                  <label>Category <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="category" value={form.category} onChange={handleFormChange} required>
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                <div className="pf-group">
                  <label>Unit of Measure <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="unit" value={form.unit} onChange={handleFormChange} required>
                      <option value="">Select unit</option>
                      {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                <div className="pf-row">
                  <div className="pf-group">
                    <label>Initial Stock (Optional)</label>
                    <input name="stock" type="number" min="0" value={form.stock} onChange={handleFormChange} />
                  </div>
                  <div className="pf-group">
                    <label>Reorder Level</label>
                    <input name="reorder" type="number" min="0" value={form.reorder} onChange={handleFormChange} />
                  </div>
                </div>

                <div className="pf-group">
                  <label>Description (Optional)</label>
                  <textarea name="description" placeholder="Enter product description..." value={form.description} onChange={handleFormChange} rows={3} />
                </div>

                <div className="upload-area">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span className="upload-label">Upload Product Image</span>
                  <span className="upload-hint">PNG, JPG up to 2MB</span>
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
