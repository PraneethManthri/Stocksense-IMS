import { useState } from 'react';
import Layout from '../components/Layout';
import './Warehouses.css';

const INITIAL_WAREHOUSES = [
  { id: 1,  name: 'Main Warehouse',   code: 'WH001', location: 'Hyderabad',     capacity: 10000, stock: 6320, status: 'Active'   },
  { id: 2,  name: 'Production Rack',  code: 'WH002', location: 'Production Unit',capacity: 5000,  stock: 3210, status: 'Active'   },
  { id: 3,  name: 'Rack A',           code: 'WH003', location: 'Block A',        capacity: 2000,  stock: 1450, status: 'Active'   },
  { id: 4,  name: 'Rack B',           code: 'WH004', location: 'Block B',        capacity: 2000,  stock: 1120, status: 'Active'   },
  { id: 5,  name: 'Warehouse 1',      code: 'WH005', location: 'Secunderabad',   capacity: 8000,  stock: 5600, status: 'Active'   },
  { id: 6,  name: 'Warehouse 2',      code: 'WH006', location: 'Vijayawada',     capacity: 6000,  stock: 4320, status: 'Active'   },
  { id: 7,  name: 'Quality Check',    code: 'WH007', location: 'QC Area',        capacity: 1000,  stock: 420,  status: 'Active'   },
  { id: 8,  name: 'Dispatch Area',    code: 'WH008', location: 'Loading Bay',    capacity: 3000,  stock: 1980, status: 'Active'   },
  { id: 9,  name: 'Returns Section',  code: 'WH009', location: 'Returns Unit',   capacity: 1500,  stock: 320,  status: 'Inactive' },
  { id: 10, name: 'Spare Storage',    code: 'WH010', location: 'Maintenance',    capacity: 2500,  stock: 870,  status: 'Active'   },
];

const PER_PAGE   = 10;
const EMPTY_FORM = { name: '', code: '', location: '', capacity: '', status: 'Active' };

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES);
  const [search, setSearch]         = useState('');
  const [page, setPage]             = useState(1);
  const [panelOpen, setPanelOpen]   = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);

  /* ── filter ── */
  const filtered   = warehouses.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.code.toLowerCase().includes(search.toLowerCase()) ||
    w.location.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ── panel ── */
  const openAdd  = () => { setEditItem(null); setForm(EMPTY_FORM); setPanelOpen(true); };
  const openEdit = (w) => { setEditItem(w); setForm({ name: w.name, code: w.code, location: w.location, capacity: String(w.capacity), status: w.status }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditItem(null); };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (editItem) {
      setWarehouses((prev) => prev.map((w) =>
        w.id === editItem.id
          ? { ...w, name: form.name, code: form.code, location: form.location, capacity: Number(form.capacity), status: form.status }
          : w
      ));
    } else {
      const newId = Math.max(...warehouses.map((w) => w.id)) + 1;
      setWarehouses((prev) => [...prev, { id: newId, name: form.name, code: form.code, location: form.location, capacity: Number(form.capacity), stock: 0, status: form.status }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setWarehouses((prev) => prev.filter((w) => w.id !== id));

  return (
    <Layout pageTitle="Warehouses" pageSubtitle="Manage all warehouses and storage locations.">
      <div className="warehouses-page">
        {/* Toolbar */}
        <div className="wh-toolbar">
          <div className="wh-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Search warehouses..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="new-wh-btn" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Warehouse
          </button>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-wrap">
            <table className="wh-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Warehouse Name</th>
                  <th>Code</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((w, i) => (
                  <tr key={w.id}>
                    <td className="col-num">{(page - 1) * PER_PAGE + i + 1}</td>
                    <td>
                      <div className="wh-name-cell">
                        <div className="wh-thumb">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                        </div>
                        <span>{w.name}</span>
                      </div>
                    </td>
                    <td className="col-mono">{w.code}</td>
                    <td>{w.location}</td>
                    <td>{w.capacity.toLocaleString()}</td>
                    <td>{w.stock.toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${w.status === 'Active' ? 'active' : 'inactive'}`}>
                        {w.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="act-view" aria-label="View">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button className="act-edit" onClick={() => openEdit(w)} aria-label="Edit">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button className="act-delete" onClick={() => handleDelete(w.id)} aria-label="Delete">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-row">
            <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1, filtered.length)}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} warehouses</span>
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

      {/* ── Add / Edit Panel ── */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editItem ? 'Edit Warehouse' : 'New Warehouse'}</h3>
              <button className="panel-close" onClick={closePanel} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                {/* Warehouse Name */}
                <div className="pf-group">
                  <label>Warehouse Name <span className="req">*</span></label>
                  <input name="name" type="text" placeholder="Enter warehouse name" value={form.name} onChange={handleFormChange} required className="input-field" />
                </div>

                {/* Warehouse Code */}
                <div className="pf-group">
                  <label>Warehouse Code <span className="req">*</span></label>
                  <input name="code" type="text" placeholder="Enter warehouse code (e.g. WH001)" value={form.code} onChange={handleFormChange} required className="input-field" />
                </div>

                {/* Location */}
                <div className="pf-group">
                  <label>Location <span className="req">*</span></label>
                  <input name="location" type="text" placeholder="Enter location" value={form.location} onChange={handleFormChange} required className="input-field" />
                </div>

                {/* Capacity */}
                <div className="pf-group">
                  <label>Capacity (Units) <span className="req">*</span></label>
                  <input name="capacity" type="number" min="1" placeholder="Enter capacity" value={form.capacity} onChange={handleFormChange} required className="input-field" />
                </div>

                {/* Status */}
                <div className="pf-group">
                  <label>Status <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="status" value={form.status} onChange={handleFormChange} required>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* Image upload */}
                <div className="pf-group">
                  <label>Image (Optional)</label>
                  <div className="upload-area">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span className="upload-label">Click to upload image</span>
                    <span className="upload-hint">PNG, JPG (Max 2MB)</span>
                  </div>
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
