import { useState } from 'react';
import Layout from '../components/Layout';
import './Settings.css';

const TABS = [
  { id: 'general',     label: 'General',       icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { id: 'users',       label: 'Users & Roles',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'categories',  label: 'Categories',     icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { id: 'units',       label: 'Units',           icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
  { id: 'suppliers',   label: 'Suppliers',       icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: 'notifications', label: 'Notifications', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { id: 'backup',      label: 'Backup & Data',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg> },
];

const INITIAL = {
  // Org — blank defaults
  companyName: '',
  address: '',
  email: '',
  phone: '',
  // System — blank defaults
  defaultWarehouse: '',
  defaultPageSize: '',
  dateFormat: '',
  timeZone: '',
  currency: '',
  lowStockAlerts: false,
  emailNotifications: false,
  // Security
  sessionTimeout: '',
  passwordExpiry: '',
  twoFactorAuth: false,
  // Appearance
  theme: '',
  primaryColor: '#2563eb',
  language: '',
};

/* ── All world timezones ── */
const TIMEZONES = [
  '(UTC-12:00) International Date Line West',
  '(UTC-11:00) Coordinated Universal Time-11',
  '(UTC-10:00) Hawaii',
  '(UTC-09:30) Marquesas Islands',
  '(UTC-09:00) Alaska',
  '(UTC-08:00) Pacific Time (US & Canada)',
  '(UTC-08:00) Baja California',
  '(UTC-07:00) Mountain Time (US & Canada)',
  '(UTC-07:00) Chihuahua, La Paz, Mazatlan',
  '(UTC-07:00) Arizona',
  '(UTC-06:00) Central Time (US & Canada)',
  '(UTC-06:00) Saskatchewan',
  '(UTC-06:00) Guadalajara, Mexico City, Monterrey',
  '(UTC-06:00) Central America',
  '(UTC-05:00) Eastern Time (US & Canada)',
  '(UTC-05:00) Bogota, Lima, Quito',
  '(UTC-05:00) Indiana (East)',
  '(UTC-04:30) Caracas',
  '(UTC-04:00) Atlantic Time (Canada)',
  '(UTC-04:00) Cuiaba',
  '(UTC-04:00) Georgetown, La Paz, Manaus, San Juan',
  '(UTC-04:00) Santiago',
  '(UTC-03:30) Newfoundland',
  '(UTC-03:00) Brasilia',
  '(UTC-03:00) Buenos Aires',
  '(UTC-03:00) Cayenne, Fortaleza',
  '(UTC-03:00) Greenland',
  '(UTC-03:00) Montevideo',
  '(UTC-03:00) Salvador',
  '(UTC-02:00) Coordinated Universal Time-02',
  '(UTC-01:00) Azores',
  '(UTC-01:00) Cape Verde Is.',
  '(UTC+00:00) Casablanca',
  '(UTC+00:00) Coordinated Universal Time',
  '(UTC+00:00) Dublin, Edinburgh, Lisbon, London',
  '(UTC+00:00) Monrovia, Reykjavik',
  '(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
  '(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
  '(UTC+01:00) Brussels, Copenhagen, Madrid, Paris',
  '(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb',
  '(UTC+01:00) West Central Africa',
  '(UTC+01:00) Windhoek',
  '(UTC+02:00) Amman',
  '(UTC+02:00) Athens, Bucharest',
  '(UTC+02:00) Beirut',
  '(UTC+02:00) Cairo',
  '(UTC+02:00) Damascus',
  '(UTC+02:00) E. Europe',
  '(UTC+02:00) Harare, Pretoria',
  '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
  '(UTC+02:00) Istanbul',
  '(UTC+02:00) Jerusalem',
  '(UTC+02:00) Kaliningrad',
  '(UTC+02:00) Nicosia',
  '(UTC+02:00) Tripoli',
  '(UTC+03:00) Baghdad',
  '(UTC+03:00) Kuwait, Riyadh',
  '(UTC+03:00) Minsk',
  '(UTC+03:00) Moscow, St. Petersburg, Volgograd',
  '(UTC+03:00) Nairobi',
  '(UTC+03:30) Tehran',
  '(UTC+04:00) Abu Dhabi, Muscat',
  '(UTC+04:00) Baku',
  '(UTC+04:00) Izhevsk, Samara',
  '(UTC+04:00) Port Louis',
  '(UTC+04:00) Tbilisi',
  '(UTC+04:00) Yerevan',
  '(UTC+04:30) Kabul',
  '(UTC+05:00) Ashgabat, Tashkent',
  '(UTC+05:00) Ekaterinburg',
  '(UTC+05:00) Islamabad, Karachi',
  '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
  '(UTC+05:30) Asia/Kolkata',
  '(UTC+05:30) Sri Jayawardenepura',
  '(UTC+05:45) Kathmandu',
  '(UTC+06:00) Astana',
  '(UTC+06:00) Dhaka',
  '(UTC+06:00) Novosibirsk',
  '(UTC+06:30) Yangon (Rangoon)',
  '(UTC+07:00) Bangkok, Hanoi, Jakarta',
  '(UTC+07:00) Krasnoyarsk',
  '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
  '(UTC+08:00) Irkutsk',
  '(UTC+08:00) Kuala Lumpur, Singapore',
  '(UTC+08:00) Perth',
  '(UTC+08:00) Taipei',
  '(UTC+08:00) Ulaanbaatar',
  '(UTC+08:30) Pyongyang',
  '(UTC+09:00) Osaka, Sapporo, Tokyo',
  '(UTC+09:00) Seoul',
  '(UTC+09:00) Yakutsk',
  '(UTC+09:30) Adelaide',
  '(UTC+09:30) Darwin',
  '(UTC+10:00) Brisbane',
  '(UTC+10:00) Canberra, Melbourne, Sydney',
  '(UTC+10:00) Guam, Port Moresby',
  '(UTC+10:00) Hobart',
  '(UTC+10:00) Vladivostok',
  '(UTC+11:00) Chokurdakh',
  '(UTC+11:00) Magadan',
  '(UTC+11:00) Solomon Is., New Caledonia',
  '(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky',
  '(UTC+12:00) Auckland, Wellington',
  '(UTC+12:00) Coordinated Universal Time+12',
  '(UTC+12:00) Fiji',
  '(UTC+13:00) Nuku\'alofa',
  '(UTC+13:00) Samoa',
  '(UTC+14:00) Kiritimati Island',
];

/* ── All world currencies ── */
const CURRENCIES = [
  'AED - UAE Dirham (د.إ)',
  'AFN - Afghan Afghani (؋)',
  'ALL - Albanian Lek (L)',
  'AMD - Armenian Dram (֏)',
  'ANG - Netherlands Antillean Guilder (ƒ)',
  'AOA - Angolan Kwanza (Kz)',
  'ARS - Argentine Peso ($)',
  'AUD - Australian Dollar (A$)',
  'AWG - Aruban Florin (ƒ)',
  'AZN - Azerbaijani Manat (₼)',
  'BAM - Bosnia-Herzegovina Convertible Mark (KM)',
  'BBD - Barbadian Dollar (Bds$)',
  'BDT - Bangladeshi Taka (৳)',
  'BGN - Bulgarian Lev (лв)',
  'BHD - Bahraini Dinar (BD)',
  'BIF - Burundian Franc (Fr)',
  'BMD - Bermudan Dollar ($)',
  'BND - Brunei Dollar (B$)',
  'BOB - Bolivian Boliviano (Bs.)',
  'BRL - Brazilian Real (R$)',
  'BSD - Bahamian Dollar (B$)',
  'BTN - Bhutanese Ngultrum (Nu)',
  'BWP - Botswanan Pula (P)',
  'BYN - Belarusian Ruble (Br)',
  'BZD - Belize Dollar (BZ$)',
  'CAD - Canadian Dollar (CA$)',
  'CDF - Congolese Franc (Fr)',
  'CHF - Swiss Franc (Fr)',
  'CLP - Chilean Peso ($)',
  'CNY - Chinese Yuan (¥)',
  'COP - Colombian Peso ($)',
  'CRC - Costa Rican Colón (₡)',
  'CUP - Cuban Peso ($)',
  'CVE - Cape Verdean Escudo ($)',
  'CZK - Czech Koruna (Kč)',
  'DJF - Djiboutian Franc (Fr)',
  'DKK - Danish Krone (kr)',
  'DOP - Dominican Peso ($)',
  'DZD - Algerian Dinar (دج)',
  'EGP - Egyptian Pound (£)',
  'ERN - Eritrean Nakfa (Nfk)',
  'ETB - Ethiopian Birr (Br)',
  'EUR - Euro (€)',
  'FJD - Fijian Dollar (FJ$)',
  'FKP - Falkland Islands Pound (£)',
  'GBP - British Pound Sterling (£)',
  'GEL - Georgian Lari (₾)',
  'GHS - Ghanaian Cedi (₵)',
  'GIP - Gibraltar Pound (£)',
  'GMD - Gambian Dalasi (D)',
  'GNF - Guinean Franc (Fr)',
  'GTQ - Guatemalan Quetzal (Q)',
  'GYD - Guyanaese Dollar ($)',
  'HKD - Hong Kong Dollar (HK$)',
  'HNL - Honduran Lempira (L)',
  'HRK - Croatian Kuna (kn)',
  'HTG - Haitian Gourde (G)',
  'HUF - Hungarian Forint (Ft)',
  'IDR - Indonesian Rupiah (Rp)',
  'ILS - Israeli New Shekel (₪)',
  'INR - Indian Rupee (₹)',
  'IQD - Iraqi Dinar (ع.د)',
  'IRR - Iranian Rial (﷼)',
  'ISK - Icelandic Króna (kr)',
  'JMD - Jamaican Dollar (J$)',
  'JOD - Jordanian Dinar (JD)',
  'JPY - Japanese Yen (¥)',
  'KES - Kenyan Shilling (KSh)',
  'KGS - Kyrgystani Som (с)',
  'KHR - Cambodian Riel (៛)',
  'KMF - Comorian Franc (Fr)',
  'KPW - North Korean Won (₩)',
  'KRW - South Korean Won (₩)',
  'KWD - Kuwaiti Dinar (KD)',
  'KYD - Cayman Islands Dollar ($)',
  'KZT - Kazakhstani Tenge (₸)',
  'LAK - Laotian Kip (₭)',
  'LBP - Lebanese Pound (£)',
  'LKR - Sri Lankan Rupee (Rs)',
  'LRD - Liberian Dollar ($)',
  'LSL - Lesotho Loti (L)',
  'LYD - Libyan Dinar (LD)',
  'MAD - Moroccan Dirham (MAD)',
  'MDL - Moldovan Leu (L)',
  'MGA - Malagasy Ariary (Ar)',
  'MKD - Macedonian Denar (ден)',
  'MMK - Myanma Kyat (K)',
  'MNT - Mongolian Tugrik (₮)',
  'MOP - Macanese Pataca (P)',
  'MRO - Mauritanian Ouguiya (UM)',
  'MUR - Mauritian Rupee (Rs)',
  'MVR - Maldivian Rufiyaa (Rf)',
  'MWK - Malawian Kwacha (MK)',
  'MXN - Mexican Peso ($)',
  'MYR - Malaysian Ringgit (RM)',
  'MZN - Mozambican Metical (MT)',
  'NAD - Namibian Dollar ($)',
  'NGN - Nigerian Naira (₦)',
  'NIO - Nicaraguan Córdoba (C$)',
  'NOK - Norwegian Krone (kr)',
  'NPR - Nepalese Rupee (Rs)',
  'NZD - New Zealand Dollar (NZ$)',
  'OMR - Omani Rial (﷼)',
  'PAB - Panamanian Balboa (B/.)',
  'PEN - Peruvian Sol (S/.)',
  'PGK - Papua New Guinean Kina (K)',
  'PHP - Philippine Peso (₱)',
  'PKR - Pakistani Rupee (Rs)',
  'PLN - Polish Zloty (zł)',
  'PYG - Paraguayan Guarani (₲)',
  'QAR - Qatari Rial (﷼)',
  'RON - Romanian Leu (lei)',
  'RSD - Serbian Dinar (din)',
  'RUB - Russian Ruble (₽)',
  'RWF - Rwandan Franc (Fr)',
  'SAR - Saudi Riyal (﷼)',
  'SBD - Solomon Islands Dollar ($)',
  'SCR - Seychellois Rupee (Rs)',
  'SDG - Sudanese Pound (ج.س.)',
  'SEK - Swedish Krona (kr)',
  'SGD - Singapore Dollar (S$)',
  'SHP - Saint Helena Pound (£)',
  'SLL - Sierra Leonean Leone (Le)',
  'SOS - Somali Shilling (Sh)',
  'SRD - Surinamese Dollar ($)',
  'STD - São Tomé and Príncipe Dobra (Db)',
  'SVC - Salvadoran Colón (₡)',
  'SYP - Syrian Pound (£)',
  'SZL - Swazi Lilangeni (L)',
  'THB - Thai Baht (฿)',
  'TJS - Tajikistani Somoni (SM)',
  'TMT - Turkmenistani Manat (T)',
  'TND - Tunisian Dinar (DT)',
  'TOP - Tongan Pa\'anga (T$)',
  'TRY - Turkish Lira (₺)',
  'TTD - Trinidad and Tobago Dollar (TT$)',
  'TWD - New Taiwan Dollar (NT$)',
  'TZS - Tanzanian Shilling (Sh)',
  'UAH - Ukrainian Hryvnia (₴)',
  'UGX - Ugandan Shilling (Sh)',
  'USD - United States Dollar ($)',
  'UYU - Uruguayan Peso ($)',
  'UZS - Uzbekistan Som (so\'m)',
  'VEF - Venezuelan Bolívar (Bs.F)',
  'VND - Vietnamese Dong (₫)',
  'VUV - Vanuatu Vatu (Vt)',
  'WST - Samoan Tala (T)',
  'XAF - CFA Franc BEAC (Fr)',
  'XCD - East Caribbean Dollar ($)',
  'XOF - CFA Franc BCEAO (Fr)',
  'XPF - CFP Franc (Fr)',
  'YER - Yemeni Rial (﷼)',
  'ZAR - South African Rand (R)',
  'ZMW - Zambian Kwacha (ZK)',
  'ZWL - Zimbabwean Dollar ($)',
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`toggle${checked ? ' on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-thumb" />
    </button>
  );
}

/* ══════════════════════════════════════════════
   Users & Roles Tab
══════════════════════════════════════════════ */
const ROLE_STYLES = {
  'Admin':           { bg: '#fee2e2', color: '#dc2626' },
  'Manager':         { bg: '#dbeafe', color: '#2563eb' },
  'Inventory Staff': { bg: '#f3e8ff', color: '#7c3aed' },
  'Purchase Staff':  { bg: '#fef9c3', color: '#ca8a04' },
  'Sales Staff':     { bg: '#dcfce7', color: '#16a34a' },
  'Viewer':          { bg: '#f1f5f9', color: '#64748b' },
};

const AVATAR_COLORS = ['#2563eb','#7c3aed','#db2777','#ca8a04','#16a34a','#0284c7','#dc2626','#9333ea','#059669','#d97706'];

const INITIAL_USERS = [
  { id:1,  name:'Sathvik',      email:'sathvik@stocksense.com',  role:'Admin',           status:'Active',   lastLogin:'2026-09-21 10:30' },
  { id:2,  name:'Ravi Kumar',   email:'ravi@stocksense.com',     role:'Manager',         status:'Active',   lastLogin:'2026-09-21 09:15' },
  { id:3,  name:'Priya Sharma', email:'priya@stocksense.com',    role:'Inventory Staff', status:'Active',   lastLogin:'2026-09-20 18:42' },
  { id:4,  name:'Arjun Reddy',  email:'arjun@stocksense.com',    role:'Inventory Staff', status:'Active',   lastLogin:'2026-09-20 16:10' },
  { id:5,  name:'Neha Verma',   email:'neha@stocksense.com',     role:'Purchase Staff',  status:'Active',   lastLogin:'2026-09-19 14:22' },
  { id:6,  name:'Kiran',        email:'kiran@stocksense.com',    role:'Sales Staff',     status:'Active',   lastLogin:'2026-09-19 11:05' },
  { id:7,  name:'Manoj',        email:'manoj@stocksense.com',    role:'Viewer',          status:'Active',   lastLogin:'2026-09-18 20:18' },
  { id:8,  name:'Sneha',        email:'sneha@stocksense.com',    role:'Inventory Staff', status:'Active',   lastLogin:'2026-09-18 17:45' },
  { id:9,  name:'Vikram',       email:'vikram@stocksense.com',   role:'Manager',         status:'Inactive', lastLogin:'2026-09-15 12:30' },
  { id:10, name:'Anil',         email:'anil@stocksense.com',     role:'Viewer',          status:'Active',   lastLogin:'2026-09-14 09:12' },
];

const ROLES = ['Admin','Manager','Inventory Staff','Purchase Staff','Sales Staff','Viewer'];

const ALL_PERMISSIONS = [
  'View Products','View Reports','Create Receipts','Manage Users',
  'Create Delivery Orders','Manage Warehouses','Stock Adjustments','System Settings',
];

const ROLE_PERMISSIONS = {
  'Admin':           ALL_PERMISSIONS,
  'Manager':         ['View Products','View Reports','Create Receipts','Create Delivery Orders','Manage Warehouses','Stock Adjustments'],
  'Inventory Staff': ['View Products','Create Receipts','Stock Adjustments'],
  'Purchase Staff':  ['View Products','Create Receipts'],
  'Sales Staff':     ['View Products','Create Delivery Orders'],
  'Viewer':          ['View Products','View Reports'],
};

const EMPTY_USER_FORM = { name:'', email:'', password:'', role:'Inventory Staff', status:'Active', permissions: ROLE_PERMISSIONS['Inventory Staff'] };

function UsersRolesTab() {
  const [users, setUsers]         = useState(INITIAL_USERS);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editUser, setEditUser]   = useState(null);
  const [form, setForm]           = useState(EMPTY_USER_FORM);
  const [showPwd, setShowPwd]     = useState(false);

  const PER_PAGE = 10;
  const filtered   = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const openAdd  = () => { setEditUser(null); setForm(EMPTY_USER_FORM); setPanelOpen(true); };
  const openEdit = (u) => { setEditUser(u); setForm({ name:u.name, email:u.email, password:'', role:u.role, status:u.status, permissions: ROLE_PERMISSIONS[u.role] || [] }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditUser(null); };

  const handleRoleChange = (role) => {
    setForm((f) => ({ ...f, role, permissions: ROLE_PERMISSIONS[role] || [] }));
  };

  const togglePermission = (perm) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(perm)
        ? f.permissions.filter((p) => p !== perm)
        : [...f.permissions, perm],
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editUser) {
      setUsers((prev) => prev.map((u) => u.id === editUser.id ? { ...u, name:form.name, email:form.email, role:form.role, status:form.status } : u));
    } else {
      const newId = Math.max(...users.map((u) => u.id)) + 1;
      setUsers((prev) => [...prev, { id:newId, name:form.name, email:form.email, role:form.role, status:form.status, lastLogin:'—' }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="users-tab">
      {/* Header row */}
      <div className="users-header">
        <div className="users-title-row">
          <div className="users-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <h3>Users &amp; Roles</h3>
            <p>Manage system users and their access permissions.</p>
          </div>
        </div>
        <div className="users-actions">
          <div className="usr-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="add-user-btn" onClick={openAdd}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u, i) => {
              const rs = ROLE_STYLES[u.role] || { bg:'#f1f5f9', color:'#64748b' };
              const avatarColor = AVATAR_COLORS[u.id % AVATAR_COLORS.length];
              return (
                <tr key={u.id}>
                  <td className="col-num">{(page-1)*PER_PAGE+i+1}</td>
                  <td>
                    <div className="user-name-cell">
                      <div className="user-avatar" style={{ background: avatarColor }}>
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{u.name}</span>
                    </div>
                  </td>
                  <td className="col-email">{u.email}</td>
                  <td><span className="role-badge" style={{ background:rs.bg, color:rs.color }}>{u.role}</span></td>
                  <td><span className={`status-badge ${u.status === 'Active' ? 'active' : 'inactive'}`}>{u.status}</span></td>
                  <td className="col-login">{u.lastLogin}</td>
                  <td>
                    <div className="action-btns">
                      <button className="act-edit" onClick={() => openEdit(u)} aria-label="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="act-delete" onClick={() => handleDelete(u.id)} aria-label="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
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
        <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} users</span>
        <div className="pagination-btns">
          <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map((n) => (
            <button key={n} className={`pg-num${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
          ))}
          <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Add/Edit Panel */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editUser ? 'Edit User' : 'Add New User'}</h3>
              <button className="panel-close" onClick={closePanel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                <div className="pf-group">
                  <label>Full Name <span className="req">*</span></label>
                  <input type="text" placeholder="Enter full name" value={form.name} onChange={(e) => setForm({...form, name:e.target.value})} required className="pf-input" />
                </div>
                <div className="pf-group">
                  <label>Email <span className="req">*</span></label>
                  <input type="email" placeholder="Enter email address" value={form.email} onChange={(e) => setForm({...form, email:e.target.value})} required className="pf-input" />
                </div>
                <div className="pf-group">
                  <label>Password <span className="req">*</span></label>
                  <div className="pf-input-icon-wrap">
                    <input type={showPwd ? 'text' : 'password'} placeholder="Enter password" value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} required={!editUser} className="pf-input" />
                    <button type="button" className="eye-toggle" onClick={() => setShowPwd(!showPwd)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {showPwd ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="pf-group">
                  <label>Role <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select value={form.role} onChange={(e) => handleRoleChange(e.target.value)} required>
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="pf-group">
                  <label>Status <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select value={form.status} onChange={(e) => setForm({...form, status:e.target.value})} required>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                {/* Permissions */}
                <div className="pf-group">
                  <label>Permissions</label>
                  <p className="perm-sub">Permissions will be set based on the selected role.</p>
                  <div className="permissions-grid">
                    {ALL_PERMISSIONS.map((perm) => (
                      <label key={perm} className="perm-check">
                        <input
                          type="checkbox"
                          checked={form.permissions.includes(perm)}
                          onChange={() => togglePermission(perm)}
                        />
                        <span>{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel-footer">
                <button type="button" className="btn-cancel" onClick={closePanel}>Cancel</button>
                <button type="submit" className="btn-save">{editUser ? 'Save' : 'Create User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Categories Tab
══════════════════════════════════════════════ */
const INITIAL_CATEGORIES = [
  { id:1,  name:'Raw Materials',        code:'RM', desc:'Basic materials for production',  products:25, status:'Active', icon:'box',       parent:'None' },
  { id:2,  name:'Construction Materials',code:'CM', desc:'Cement, sand, aggregates etc.',  products:18, status:'Active', icon:'tools',      parent:'None' },
  { id:3,  name:'Wood Products',         code:'WP', desc:'Wood and plywood items',          products:12, status:'Active', icon:'wood',       parent:'None' },
  { id:4,  name:'Hardware',              code:'HW', desc:'Nails, screws, bolts, fittings', products:32, status:'Active', icon:'settings',   parent:'None' },
  { id:5,  name:'Paints & Chemicals',    code:'PC', desc:'Paints, solvents, adhesives',    products:15, status:'Active', icon:'flask',      parent:'None' },
  { id:6,  name:'Furniture',             code:'FR', desc:'Tables, chairs, cabinets etc.',  products:20, status:'Active', icon:'chair',      parent:'None' },
  { id:7,  name:'Electrical',            code:'EL', desc:'Wires, switches, lights etc.',   products:18, status:'Active', icon:'plug',       parent:'None' },
  { id:8,  name:'Safety Equipment',      code:'SE', desc:'Helmets, gloves, safety gear',   products:10, status:'Active', icon:'helmet',     parent:'None' },
  { id:9,  name:'Packaging Materials',   code:'PK', desc:'Boxes, cartons, packing items',  products:8,  status:'Active', icon:'tag',        parent:'None' },
  { id:10, name:'Others',                code:'OT', desc:'Miscellaneous items',             products:6,  status:'Active', icon:'more',       parent:'None' },
];

const ICON_OPTIONS = [
  { id:'box',      el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> },
  { id:'tools',    el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
  { id:'settings', el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { id:'truck',    el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { id:'flask',    el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6l1 7H8L9 3z"/><path d="M8 10l-5 9h18l-5-9"/><line x1="9" y1="3" x2="9" y2="10"/><line x1="15" y1="3" x2="15" y2="10"/></svg> },
  { id:'chair',    el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 19v-7"/><path d="M18 19v-7"/><path d="M4 10h16"/><path d="M6 10V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><path d="M6 19h12"/></svg> },
  { id:'plug',     el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 7V2"/><path d="M15 7V2"/><path d="M6 13h12l-3-6H9l-3 6z"/><path d="M6 13v4a6 6 0 0 0 12 0v-4"/></svg> },
  { id:'helmet',   el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15V8a8 8 0 0 1 16 0v7"/></svg> },
  { id:'tag',      el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
  { id:'more',     el: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg> },
];

const EMPTY_CAT_FORM = { name:'', code:'', desc:'', parent:'None', icon:'box', status:'Active' };

function CategoriesTab() {
  const [cats, setCats]           = useState(INITIAL_CATEGORIES);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editCat, setEditCat]     = useState(null);
  const [form, setForm]           = useState(EMPTY_CAT_FORM);

  const PER_PAGE   = 10;
  const filtered   = cats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const parentOptions = ['None', ...cats.map((c) => c.name)];

  const openAdd  = () => { setEditCat(null); setForm(EMPTY_CAT_FORM); setPanelOpen(true); };
  const openEdit = (c) => { setEditCat(c); setForm({ name:c.name, code:c.code, desc:c.desc, parent:c.parent, icon:c.icon, status:c.status }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditCat(null); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editCat) {
      setCats((prev) => prev.map((c) => c.id === editCat.id ? { ...c, ...form } : c));
    } else {
      const newId = Math.max(...cats.map((c) => c.id)) + 1;
      setCats((prev) => [...prev, { id:newId, ...form, products:0 }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setCats((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="categories-tab">
      {/* Header */}
      <div className="cat-header">
        <div className="cat-title-row">
          <div className="cat-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
          </div>
          <div>
            <h3>Product Categories</h3>
            <p>Organize your products into categories for better inventory management.</p>
          </div>
        </div>
        <div className="cat-actions">
          <div className="cat-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search categories..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="add-cat-btn" onClick={openAdd}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="cat-table-wrap">
        <table className="cat-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Code</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c, i) => {
              const iconObj = ICON_OPTIONS.find((ic) => ic.id === c.icon) || ICON_OPTIONS[0];
              return (
                <tr key={c.id}>
                  <td className="col-num">{(page-1)*PER_PAGE+i+1}</td>
                  <td>
                    <div className="cat-name-cell">
                      <div className="cat-thumb">{iconObj.el}</div>
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="col-mono">{c.code}</td>
                  <td className="col-desc">{c.desc}</td>
                  <td>{c.products}</td>
                  <td><span className={`status-badge ${c.status === 'Active' ? 'active' : 'inactive'}`}>{c.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="act-edit" onClick={() => openEdit(c)} aria-label="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="act-delete" onClick={() => handleDelete(c.id)} aria-label="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
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
        <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} categories</span>
        <div className="pagination-btns">
          <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map((n) => (
            <button key={n} className={`pg-num${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
          ))}
          <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Panel */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editCat ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="panel-close" onClick={closePanel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                <div className="pf-group">
                  <label>Category Name <span className="req">*</span></label>
                  <input type="text" placeholder="Enter category name" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Category Code <span className="req">*</span></label>
                  <input type="text" placeholder="Enter code (e.g. RM)" value={form.code} onChange={(e) => setForm({...form,code:e.target.value.toUpperCase()})} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Description</label>
                  <textarea placeholder="Enter description (optional)" value={form.desc} onChange={(e) => setForm({...form,desc:e.target.value})} rows={3} className="pf-textarea"/>
                </div>
                <div className="pf-group">
                  <label>Parent Category</label>
                  <div className="select-wrap">
                    <select value={form.parent} onChange={(e) => setForm({...form,parent:e.target.value})}>
                      {parentOptions.filter((p) => !editCat || p !== editCat.name).map((p) => (
                        <option key={p} value={p}>{p === 'None' ? 'None (Main Category)' : p}</option>
                      ))}
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="pf-group">
                  <label>Icon</label>
                  <div className="icon-picker">
                    {ICON_OPTIONS.map((ic) => (
                      <button
                        key={ic.id}
                        type="button"
                        className={`icon-btn${form.icon === ic.id ? ' selected' : ''}`}
                        onClick={() => setForm({...form,icon:ic.id})}
                        aria-label={ic.id}
                      >
                        {ic.el}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pf-group">
                  <label>Status <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select value={form.status} onChange={(e) => setForm({...form,status:e.target.value})}>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <button type="button" className="btn-cancel" onClick={closePanel}>Cancel</button>
                <button type="submit" className="btn-save">{editCat ? 'Save Category' : 'Save Category'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Units Tab
══════════════════════════════════════════════ */
const UNIT_TYPE_STYLES = {
  Count:  { bg: '#eff6ff', color: '#2563eb' },
  Weight: { bg: '#f0fdf4', color: '#16a34a' },
  Volume: { bg: '#f5f3ff', color: '#7c3aed' },
  Length: { bg: '#fef9c3', color: '#ca8a04' },
  Area:   { bg: '#fdf2f8', color: '#db2777' },
  Other:  { bg: '#f1f5f9', color: '#64748b' },
};

const INITIAL_UNITS = [
  { id:1,  name:'Piece',      code:'PCS', type:'Count',  desc:'Individual item',          status:'Active' },
  { id:2,  name:'Kilogram',   code:'KG',  type:'Weight', desc:'Weight in kilograms',      status:'Active' },
  { id:3,  name:'Gram',       code:'G',   type:'Weight', desc:'Weight in grams',          status:'Active' },
  { id:4,  name:'Liter',      code:'L',   type:'Volume', desc:'Volume in liters',         status:'Active' },
  { id:5,  name:'Milliliter', code:'ML',  type:'Volume', desc:'Volume in milliliters',    status:'Active' },
  { id:6,  name:'Meter',      code:'M',   type:'Length', desc:'Length in meters',         status:'Active' },
  { id:7,  name:'Centimeter', code:'CM',  type:'Length', desc:'Length in centimeters',    status:'Active' },
  { id:8,  name:'Box',        code:'BOX', type:'Count',  desc:'Box packaging unit',       status:'Active' },
  { id:9,  name:'Pack',       code:'PK',  type:'Count',  desc:'Pack packaging unit',      status:'Active' },
  { id:10, name:'Dozen',      code:'DZ',  type:'Count',  desc:'12 pieces',                status:'Active' },
];

const UNIT_TYPES = ['Count', 'Weight', 'Volume', 'Length', 'Area', 'Other'];
const EMPTY_UNIT_FORM = { name:'', code:'', type:'Count', desc:'', status:'Active' };

function UnitsTab() {
  const [units, setUnits]         = useState(INITIAL_UNITS);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editUnit, setEditUnit]   = useState(null);
  const [form, setForm]           = useState(EMPTY_UNIT_FORM);

  const PER_PAGE   = 10;
  const filtered   = units.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.code.toLowerCase().includes(search.toLowerCase()) ||
    u.type.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const openAdd  = () => { setEditUnit(null); setForm(EMPTY_UNIT_FORM); setPanelOpen(true); };
  const openEdit = (u) => { setEditUnit(u); setForm({ name:u.name, code:u.code, type:u.type, desc:u.desc, status:u.status }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditUnit(null); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editUnit) {
      setUnits((prev) => prev.map((u) => u.id === editUnit.id ? { ...u, ...form } : u));
    } else {
      const newId = Math.max(...units.map((u) => u.id)) + 1;
      setUnits((prev) => [...prev, { id:newId, ...form }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setUnits((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="units-tab">
      {/* Header */}
      <div className="unit-header">
        <div className="unit-title-row">
          <div className="unit-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div>
            <h3>Units of Measure</h3>
            <p>Define and manage units of measure for your products.</p>
          </div>
        </div>
        <div className="unit-actions">
          <div className="unit-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search units..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="add-unit-btn" onClick={openAdd}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Unit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="unit-table-wrap">
        <table className="unit-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Unit Name</th>
              <th>Code</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u, i) => {
              const ts = UNIT_TYPE_STYLES[u.type] || UNIT_TYPE_STYLES.Other;
              return (
                <tr key={u.id}>
                  <td className="col-num">{(page-1)*PER_PAGE+i+1}</td>
                  <td className="unit-name-cell">{u.name}</td>
                  <td className="col-mono">{u.code}</td>
                  <td><span className="type-badge" style={{ background:ts.bg, color:ts.color }}>{u.type}</span></td>
                  <td className="col-desc">{u.desc}</td>
                  <td><span className={`status-badge ${u.status==='Active'?'active':'inactive'}`}>{u.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="act-edit" onClick={() => openEdit(u)} aria-label="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="act-delete" onClick={() => handleDelete(u.id)} aria-label="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
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
        <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} units</span>
        <div className="pagination-btns">
          <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map((n) => (
            <button key={n} className={`pg-num${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
          ))}
          <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Panel */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editUnit ? 'Edit Unit' : 'Add New Unit'}</h3>
              <button className="panel-close" onClick={closePanel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                <div className="pf-group">
                  <label>Unit Name <span className="req">*</span></label>
                  <input type="text" placeholder="Enter unit name (e.g. Piece, Kilogram)" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Unit Code <span className="req">*</span></label>
                  <input type="text" placeholder="Enter unit code (e.g. PCS, KG)" value={form.code} onChange={(e) => setForm({...form,code:e.target.value.toUpperCase()})} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Unit Type <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select value={form.type} onChange={(e) => setForm({...form,type:e.target.value})} required>
                      {UNIT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="pf-group">
                  <label>Description</label>
                  <textarea placeholder="Enter description (optional)" value={form.desc} onChange={(e) => setForm({...form,desc:e.target.value})} rows={3} className="pf-textarea"/>
                </div>
                <div className="pf-group">
                  <label>Status <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select value={form.status} onChange={(e) => setForm({...form,status:e.target.value})}>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <button type="button" className="btn-cancel" onClick={closePanel}>Cancel</button>
                <button type="submit" className="btn-save">Save Unit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Suppliers Tab
══════════════════════════════════════════════ */
const INITIAL_SUPPLIERS = [
  { id:1,  name:'ABC Traders',         contact:'Ramesh Kumar', phone:'+91 98765 43210', email:'abc@traders.com',       address:'Hyderabad, TG',    gst:'',              remarks:'', status:'Active'   },
  { id:2,  name:'Sri Hardware',        contact:'Suresh Babu',  phone:'+91 99876 54321', email:'sri@hardware.com',      address:'Secunderabad, TG', gst:'',              remarks:'', status:'Active'   },
  { id:3,  name:'National Supplies',   contact:'Amit Singh',   phone:'+91 91234 56789', email:'national@supplies.com', address:'Vijayawada, AP',   gst:'',              remarks:'', status:'Active'   },
  { id:4,  name:'Zotformer B',         contact:'Prakash Rao',  phone:'+91 99881 22334', email:'zotformer@b.com',       address:'Bengaluru, KA',    gst:'',              remarks:'', status:'Active'   },
  { id:5,  name:'Universal Traders',   contact:'Manoj Gupta',  phone:'+91 98712 33445', email:'universal@traders.com', address:'Chennai, TN',      gst:'',              remarks:'', status:'Active'   },
  { id:6,  name:'Shree Enterprises',   contact:'Vikram Jain',  phone:'+91 93456 77889', email:'shree@enterprise.com',  address:'Mumbai, MH',       gst:'',              remarks:'', status:'Inactive' },
  { id:7,  name:'BuildRight Supplies', contact:'Rohit Sharma', phone:'+91 81234 55667', email:'buildright@supply.com', address:'Pune, MH',         gst:'',              remarks:'', status:'Active'   },
  { id:8,  name:'Metro Paints',        contact:'Kavita Mehta', phone:'+91 90987 66554', email:'metro@paints.com',      address:'Kolkata, WB',      gst:'',              remarks:'', status:'Active'   },
  { id:9,  name:'Steel & Co',          contact:'Arjun Reddy',  phone:'+91 88876 44321', email:'steel@co.com',          address:'Visakhapatnam, AP',gst:'',              remarks:'', status:'Active'   },
  { id:10, name:'Delta Distributors',  contact:'Neha Verma',   phone:'+91 77654 33211', email:'delta@dist.com',        address:'Delhi, DL',        gst:'',              remarks:'', status:'Active'   },
];

const EMPTY_SUP_FORM = { name:'', contact:'', phone:'', email:'', address:'', gst:'', remarks:'', status:'Active' };

function SuppliersTab() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editSup, setEditSup]     = useState(null);
  const [form, setForm]           = useState(EMPTY_SUP_FORM);

  const PER_PAGE   = 10;
  const filtered   = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.contact.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const openAdd  = () => { setEditSup(null); setForm(EMPTY_SUP_FORM); setPanelOpen(true); };
  const openEdit = (s) => { setEditSup(s); setForm({ name:s.name, contact:s.contact, phone:s.phone, email:s.email, address:s.address, gst:s.gst, remarks:s.remarks, status:s.status }); setPanelOpen(true); };
  const closePanel = () => { setPanelOpen(false); setEditSup(null); };
  const fc = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    if (editSup) {
      setSuppliers((prev) => prev.map((s) => s.id === editSup.id ? { ...s, ...form } : s));
    } else {
      const newId = Math.max(...suppliers.map((s) => s.id)) + 1;
      setSuppliers((prev) => [...prev, { id:newId, ...form }]);
    }
    closePanel();
  };

  const handleDelete = (id) => setSuppliers((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="suppliers-tab">
      {/* Header */}
      <div className="sup-header">
        <div className="sup-title-row">
          <div className="sup-title-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div>
            <h3>Suppliers</h3>
            <p>Manage your suppliers and their contact information.</p>
          </div>
        </div>
        <div className="sup-actions">
          <div className="sup-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search suppliers..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <button className="add-sup-btn" onClick={openAdd}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Supplier
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="sup-table-wrap">
        <table className="sup-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Supplier Name</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((s, i) => (
              <tr key={s.id}>
                <td className="col-num">{(page-1)*PER_PAGE+i+1}</td>
                <td className="sup-name">{s.name}</td>
                <td>{s.contact}</td>
                <td className="col-phone">{s.phone}</td>
                <td className="col-email">{s.email}</td>
                <td className="col-addr">{s.address}</td>
                <td><span className={`status-badge ${s.status==='Active'?'active':'inactive'}`}>{s.status}</span></td>
                <td>
                  <div className="action-btns">
                    <button className="act-edit" onClick={() => openEdit(s)} aria-label="Edit">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="act-delete" onClick={() => handleDelete(s.id)} aria-label="Delete">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
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
        <span className="pagination-info">Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length} suppliers</span>
        <div className="pagination-btns">
          <button className="pg-arrow" onClick={() => setPage((p) => Math.max(1,p-1))} disabled={page===1}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          {Array.from({length:totalPages},(_,i)=>i+1).map((n) => (
            <button key={n} className={`pg-num${page===n?' active':''}`} onClick={()=>setPage(n)}>{n}</button>
          ))}
          <button className="pg-arrow" onClick={() => setPage((p) => Math.min(totalPages,p+1))} disabled={page===totalPages}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Panel */}
      {panelOpen && (
        <div className="panel-overlay" onClick={closePanel}>
          <div className="add-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h3>{editSup ? 'Edit Supplier' : 'Add New Supplier'}</h3>
              <button className="panel-close" onClick={closePanel}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="panel-form">
              <div className="panel-scroll">
                <div className="pf-group">
                  <label>Supplier Name <span className="req">*</span></label>
                  <input name="name" type="text" placeholder="Enter supplier name" value={form.name} onChange={fc} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Contact Person <span className="req">*</span></label>
                  <input name="contact" type="text" placeholder="Enter contact person name" value={form.contact} onChange={fc} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Phone <span className="req">*</span></label>
                  <input name="phone" type="tel" placeholder="Enter phone number" value={form.phone} onChange={fc} required className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="Enter email address" value={form.email} onChange={fc} className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Address</label>
                  <textarea name="address" placeholder="Enter complete address" value={form.address} onChange={fc} rows={3} className="pf-textarea"/>
                </div>
                <div className="pf-group">
                  <label>GST Number</label>
                  <input name="gst" type="text" placeholder="Enter GST number (optional)" value={form.gst} onChange={fc} className="pf-input"/>
                </div>
                <div className="pf-group">
                  <label>Remarks</label>
                  <textarea name="remarks" placeholder="Enter any additional remarks (optional)" value={form.remarks} onChange={fc} rows={2} className="pf-textarea"/>
                </div>
                <div className="pf-group">
                  <label>Status <span className="req">*</span></label>
                  <div className="select-wrap">
                    <select name="status" value={form.status} onChange={fc}>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <button type="button" className="btn-cancel" onClick={closePanel}>Cancel</button>
                <button type="submit" className="btn-save">Save Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   Notifications Tab
══════════════════════════════════════════════ */
const INITIAL_NOTIF_EVENTS = [
  { id:1, event:'Low Stock Alert',       desc:'Get notified when stock is below reorder level.',    inApp:true,  email:true,  status:'Active'   },
  { id:2, event:'Stock Received',         desc:'Notification when new stock is received.',           inApp:true,  email:true,  status:'Active'   },
  { id:3, event:'Stock Issued',           desc:'Notification when stock is issued or delivered.',    inApp:true,  email:false, status:'Active'   },
  { id:4, event:'Delivery Order Created', desc:'Notification for new delivery orders.',              inApp:true,  email:true,  status:'Active'   },
  { id:5, event:'Internal Transfer',      desc:'Notification for internal stock transfers.',         inApp:true,  email:false, status:'Active'   },
  { id:6, event:'Stock Adjustment',       desc:'Notification for stock adjustments.',                inApp:true,  email:false, status:'Active'   },
  { id:7, event:'New User Added',         desc:'Notification when a new user is added.',             inApp:true,  email:true,  status:'Active'   },
  { id:8, event:'System Alerts',          desc:'Important system notifications and errors.',         inApp:true,  email:true,  status:'Active'   },
  { id:9, event:'Report Generation',      desc:'Notification when a report is ready.',               inApp:false, email:true,  status:'Inactive' },
];

const EVENT_ICONS = {
  'Low Stock Alert':        { bg:'#fef2f2', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  'Stock Received':         { bg:'#f0fdf4', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg> },
  'Stock Issued':           { bg:'#fef2f2', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg> },
  'Delivery Order Created': { bg:'#eff6ff', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  'Internal Transfer':      { bg:'#f5f3ff', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> },
  'Stock Adjustment':       { bg:'#fffbeb', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
  'New User Added':         { bg:'#f0fdf4', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  'System Alerts':          { bg:'#fef2f2', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg> },
  'Report Generation':      { bg:'#eff6ff', el: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
};

const INITIAL_CHANNELS = { inApp:true, email:true, browser:false, sms:false };
const INITIAL_THRESHOLDS = { lowStock:'10', expiry:'30', inactive:'60' };

function NToggle({ checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked}
      className={`toggle${checked ? ' on' : ''}`} onClick={() => onChange(!checked)}>
      <span className="toggle-thumb"/>
    </button>
  );
}

function NotificationsTab() {
  const [events, setEvents]       = useState(INITIAL_NOTIF_EVENTS);
  const [channels, setChannels]   = useState(INITIAL_CHANNELS);
  const [thresholds, setThresholds] = useState(INITIAL_THRESHOLDS);
  const [saved, setSaved]         = useState(false);

  const toggleEvent = (id, field) => {
    setEvents((prev) => prev.map((e) => e.id === id ? { ...e, [field]: !e[field] } : e));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleReset = () => { setEvents(INITIAL_NOTIF_EVENTS); setChannels(INITIAL_CHANNELS); setThresholds(INITIAL_THRESHOLDS); };

  return (
    <div className="notif-page">
      <div className="notif-grid">
        {/* ── Left: Notification Settings table ── */}
        <div className="notif-card">
          <div className="notif-card-header">
            <div className="notif-icon-wrap blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div>
              <h3>Notification Settings</h3>
              <p>Configure alert notifications for important events.</p>
            </div>
          </div>

          <div className="notif-table-wrap">
            <table className="notif-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th>In-App</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => {
                  const ic = EVENT_ICONS[ev.event] || { bg:'#f1f5f9', el: null };
                  return (
                    <tr key={ev.id}>
                      <td>
                        <div className="notif-event-cell">
                          <div className="notif-event-icon" style={{ background: ic.bg }}>{ic.el}</div>
                          <span className="notif-event-name">{ev.event}</span>
                        </div>
                      </td>
                      <td className="notif-desc">{ev.desc}</td>
                      <td><NToggle checked={ev.inApp} onChange={() => toggleEvent(ev.id,'inApp')} /></td>
                      <td><NToggle checked={ev.email} onChange={() => toggleEvent(ev.id,'email')} /></td>
                      <td><span className={`status-badge ${ev.status==='Active'?'active':'inactive'}`}>{ev.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="notif-right">
          {/* Alert Thresholds */}
          <div className="notif-card">
            <div className="notif-card-header">
              <div className="notif-icon-wrap blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div>
                <h3>Alert Thresholds</h3>
                <p>Set conditions for automatic notifications.</p>
              </div>
            </div>

            <div className="threshold-rows">
              <div className="threshold-row">
                <div className="threshold-label">
                  <span>Low Stock Threshold</span>
                  <small>Notify when stock is below this quantity.</small>
                </div>
                <div className="threshold-input-wrap">
                  <input type="number" min="0" value={thresholds.lowStock} onChange={(e) => setThresholds({...thresholds,lowStock:e.target.value})} className="threshold-input"/>
                  <span className="threshold-unit">items</span>
                </div>
              </div>
              <div className="threshold-row">
                <div className="threshold-label">
                  <span>Expiry Alert (Days)</span>
                  <small>Notify when product expiry is within this many days.</small>
                </div>
                <div className="threshold-input-wrap">
                  <input type="number" min="0" value={thresholds.expiry} onChange={(e) => setThresholds({...thresholds,expiry:e.target.value})} className="threshold-input"/>
                  <span className="threshold-unit">days</span>
                </div>
              </div>
              <div className="threshold-row">
                <div className="threshold-label">
                  <span>Inactive Product Alert</span>
                  <small>Notify when a product has no movement for this many days.</small>
                </div>
                <div className="threshold-input-wrap">
                  <input type="number" min="0" value={thresholds.inactive} onChange={(e) => setThresholds({...thresholds,inactive:e.target.value})} className="threshold-input"/>
                  <span className="threshold-unit">days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Channels */}
          <div className="notif-card">
            <div className="notif-card-header">
              <div className="notif-icon-wrap blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h3>Notification Channels</h3>
                <p>Configure how notifications are sent.</p>
              </div>
            </div>

            <div className="channel-rows">
              {[
                { key:'inApp',   label:'In-App Notifications',   sub:'Show notifications inside the application.' },
                { key:'email',   label:'Email Notifications',     sub:'Send notifications to registered email addresses.' },
                { key:'browser', label:'Browser Notifications',   sub:'Show browser push notifications.' },
                { key:'sms',     label:'SMS Notifications',       sub:'Send SMS alerts for critical events.' },
              ].map((ch) => (
                <div key={ch.key} className="channel-row">
                  <div className="channel-info">
                    <span className="channel-label">{ch.label}</span>
                    <span className="channel-sub">{ch.sub}</span>
                  </div>
                  <NToggle checked={channels[ch.key]} onChange={(v) => setChannels({...channels,[ch.key]:v})}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="notif-footer">
        {saved && <span className="save-toast">✓ Notification settings saved!</span>}
        <div className="footer-btns">
          <button className="btn-reset" onClick={handleReset}>Reset to Default</button>
          <button className="btn-save-changes" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Backup & Data Tab
══════════════════════════════════════════════ */
const INITIAL_BACKUPS = [
  { id:1, name:'backup_2026-09-21_0200.sql', date:'2026-09-21 02:00', size:'24.3 MB', type:'Auto',   status:'Success' },
  { id:2, name:'backup_2026-09-20_0200.sql', date:'2026-09-20 02:00', size:'23.8 MB', type:'Auto',   status:'Success' },
  { id:3, name:'manual_backup_2026-09-18.sql',date:'2026-09-18 14:32',size:'25.1 MB', type:'Manual', status:'Success' },
  { id:4, name:'backup_2026-09-15_0200.sql', date:'2026-09-15 02:00', size:'22.6 MB', type:'Auto',   status:'Success' },
  { id:5, name:'backup_2026-09-12_0200.sql', date:'2026-09-12 02:00', size:'21.9 MB', type:'Auto',   status:'Success' },
];

function BackupDataTab() {
  const [backups, setBackups]       = useState(INITIAL_BACKUPS);
  const [autoBackup, setAutoBackup] = useState(true);
  const [schedule, setSchedule]     = useState({ frequency:'Daily', time:'02:00', keep:'7 backups' });
  const [dataType, setDataType]     = useState('All Data (Products, Stock, Orders, etc.)');
  const [exportFmt, setExportFmt]   = useState('CSV (Recommended)');
  const [creating, setCreating]     = useState(false);
  const [scheduleSaved, setScheduleSaved] = useState(false);
  const [clearConfirm, setClearConfirm]   = useState(false);

  const handleCreateBackup = () => {
    setCreating(true);
    setTimeout(() => {
      const now = new Date('2026-09-26T10:00:00');
      const ts  = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
      setBackups((prev) => [{ id: prev.length+1, name:`manual_backup_${ts}.sql`, date:`${ts.replace('_',' ')}`, size:'25.5 MB', type:'Manual', status:'Success' }, ...prev]);
      setCreating(false);
    }, 1200);
  };

  const handleSaveSchedule = () => { setScheduleSaved(true); setTimeout(() => setScheduleSaved(false), 2000); };
  const handleDeleteBackup  = (id) => setBackups((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="backup-page">
      {/* ── Top 3-column grid ── */}
      <div className="backup-top-grid">
        {/* Left column */}
        <div className="backup-col">
          {/* Database Backup */}
          <div className="bk-card">
            <div className="bk-card-header">
              <div className="bk-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              </div>
              <div>
                <h3>Database Backup</h3>
                <p>Create a backup of your application data.</p>
              </div>
            </div>
            <p className="bk-hint">Backup includes products, categories, suppliers, users, stock data, transactions and all settings.</p>
            <button className={`bk-primary-btn${creating?' loading':''}`} onClick={handleCreateBackup} disabled={creating}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {creating ? 'Creating...' : 'Create Backup'}
            </button>
          </div>

          {/* Backup Schedule */}
          <div className="bk-card">
            <div className="bk-card-header">
              <div className="bk-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h3>Backup Schedule</h3>
                <p>Automate regular backups.</p>
              </div>
            </div>
            <div className="schedule-fields">
              <div className="schedule-row">
                <span>Auto Backup</span>
                <button type="button" role="switch" aria-checked={autoBackup}
                  className={`toggle${autoBackup?' on':''}`} onClick={() => setAutoBackup(!autoBackup)}>
                  <span className="toggle-thumb"/>
                </button>
              </div>
              <div className="schedule-row">
                <span>Frequency</span>
                <div className="select-wrap sch-select">
                  <select value={schedule.frequency} onChange={(e) => setSchedule({...schedule,frequency:e.target.value})} disabled={!autoBackup}>
                    <option>Daily</option><option>Weekly</option><option>Monthly</option>
                  </select>
                  <svg className="sel-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className="schedule-row">
                <span>Time</span>
                <div className="time-input-wrap">
                  <input type="time" value={schedule.time} onChange={(e) => setSchedule({...schedule,time:e.target.value})} disabled={!autoBackup} className="time-input"/>
                </div>
              </div>
              <div className="schedule-row">
                <span>Keep Last</span>
                <div className="select-wrap sch-select">
                  <select value={schedule.keep} onChange={(e) => setSchedule({...schedule,keep:e.target.value})} disabled={!autoBackup}>
                    <option>3 backups</option><option>5 backups</option><option>7 backups</option><option>10 backups</option><option>30 backups</option>
                  </select>
                  <svg className="sel-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>
            <button className="bk-outline-btn" onClick={handleSaveSchedule}>
              {scheduleSaved ? '✓ Saved!' : 'Save Schedule'}
            </button>
          </div>
        </div>

        {/* Center column */}
        <div className="backup-col">
          {/* Restore Backup */}
          <div className="bk-card">
            <div className="bk-card-header">
              <div className="bk-icon green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 .49-3.68"/>
                </svg>
              </div>
              <div>
                <h3>Restore Backup</h3>
                <p>Restore your application data from a backup file.</p>
              </div>
            </div>
            <div className="restore-file-row">
              <div className="restore-file-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Choose backup file...</span>
              </div>
              <button className="browse-btn">Browse</button>
            </div>
            <p className="bk-hint">Supported format: .sql .zip (max 100 MB)</p>
            <button className="bk-outline-btn" style={{ width:'100%' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 .49-3.68"/>
              </svg>
              Restore Backup
            </button>
          </div>

          {/* Storage Information */}
          <div className="bk-card">
            <div className="bk-card-header">
              <div className="bk-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              </div>
              <div>
                <h3>Storage Information</h3>
                <p>View backup storage usage.</p>
              </div>
            </div>
            <div className="storage-bar-wrap">
              <div className="storage-bar"><div className="storage-fill" style={{ width:'24%' }}/></div>
              <div className="storage-bar-labels">
                <span>2.4 GB used of 10 GB</span>
                <span>24%</span>
              </div>
            </div>
            <div className="storage-stats">
              {[['Total Storage','10 GB'],['Used Storage','2.4 GB'],['Available Storage','7.6 GB']].map(([k,v]) => (
                <div key={k} className="storage-stat-row">
                  <span>{k}</span><span className="storage-stat-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="backup-col">
          {/* Export Data */}
          <div className="bk-card">
            <div className="bk-card-header">
              <div className="bk-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </div>
              <div>
                <h3>Export Data</h3>
                <p>Export your data in different formats.</p>
              </div>
            </div>
            <div className="export-fields">
              <div className="export-row">
                <span>Data Type</span>
                <div className="select-wrap exp-select">
                  <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
                    <option>All Data (Products, Stock, Orders, etc.)</option>
                    <option>Products Only</option>
                    <option>Stock Movements</option>
                    <option>Orders & Receipts</option>
                    <option>Users & Roles</option>
                  </select>
                  <svg className="sel-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className="export-row">
                <span>Export Format</span>
                <div className="select-wrap exp-select">
                  <select value={exportFmt} onChange={(e) => setExportFmt(e.target.value)}>
                    <option>CSV (Recommended)</option>
                    <option>Excel (.xlsx)</option>
                    <option>JSON</option>
                    <option>PDF</option>
                  </select>
                  <svg className="sel-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>
            <button className="bk-primary-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export Data
            </button>
          </div>

          {/* Data Management */}
          <div className="bk-card">
            <div className="bk-card-header">
              <div className="bk-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div>
                <h3>Data Management</h3>
                <p>Manage application data.</p>
              </div>
            </div>
            <div className="dm-buttons">
              <div className="dm-action">
                <button className="dm-danger-btn" onClick={() => setClearConfirm(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  </svg>
                  Clear All Data
                </button>
                <p className="dm-hint red">This will permanently delete all application data. This action cannot be undone.</p>
              </div>
              <div className="dm-action">
                <button className="dm-warn-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 .49-3.68"/>
                  </svg>
                  Reset to Default Settings
                </button>
                <p className="dm-hint orange">This will reset all settings to default values. Your data will not be deleted.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Backup History ── */}
      <div className="bk-card">
        <div className="bk-history-header">
          <div className="bk-card-header" style={{ border:'none', padding:'0' }}>
            <div className="bk-icon blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <h3>Backup History</h3>
              <p>View and manage your previous backups.</p>
            </div>
          </div>
          <button className="refresh-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-3.68"/>
            </svg>
            Refresh
          </button>
        </div>
        <div className="history-table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Backup Name</th>
                <th>Date & Time</th>
                <th>Size</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((b, i) => (
                <tr key={b.id}>
                  <td className="col-num">{i+1}</td>
                  <td className="bk-filename">{b.name}</td>
                  <td>{b.date}</td>
                  <td>{b.size}</td>
                  <td><span className={`type-pill ${b.type==='Auto'?'auto':'manual'}`}>{b.type}</span></td>
                  <td><span className="status-badge active">Success</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="act-download" aria-label="Download">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </button>
                      <button className="act-delete" onClick={() => handleDeleteBackup(b.id)} aria-label="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      </div>

      {/* Clear confirm modal */}
      {clearConfirm && (
        <div className="confirm-overlay" onClick={() => setClearConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <h4>Clear All Data?</h4>
            <p>This will permanently delete all application data. This action cannot be undone.</p>
            <div className="confirm-btns">
              <button className="btn-cancel" onClick={() => setClearConfirm(false)}>Cancel</button>
              <button className="dm-danger-btn" onClick={() => setClearConfirm(false)}>Yes, Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [form, setForm]           = useState(INITIAL);
  const [saved, setSaved]         = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => setForm(INITIAL);

  return (
    <Layout pageTitle="Settings" pageSubtitle="Manage your application preferences, users, and system configurations.">
      <div className="settings-page">
        {/* ── Tabs ── */}
        <div className="settings-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`settings-tab${activeTab === t.id ? ' active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ── General Tab ── */}
        {activeTab === 'general' && (
          <div className="settings-grid">
            {/* Organization Details */}
            <div className="settings-card">
              <div className="card-title-row">
                <div className="card-title-icon blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <div>
                  <h3>Organization Details</h3>
                  <p>Update your company information.</p>
                </div>
              </div>

              <div className="settings-fields">
                <div className="sf-row">
                  <label>Company Name <span className="req">*</span></label>
                  <input type="text" value={form.companyName} onChange={(e) => set('companyName', e.target.value)} />
                </div>
                <div className="sf-row">
                  <label>Address</label>
                  <textarea value={form.address} onChange={(e) => set('address', e.target.value)} rows={3} />
                </div>
                <div className="sf-row">
                  <label>Email <span className="req">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
                </div>
                <div className="sf-row">
                  <label>Phone</label>
                  <input type="text" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                </div>
                <div className="sf-row">
                  <label>Logo</label>
                  <div className="logo-upload">
                    <div className="logo-preview">
                      <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                        <rect width="36" height="36" rx="8" fill="#EFF6FF"/>
                        <path d="M18 6L30 12V24L18 30L6 24V12L18 6Z" fill="#2563EB" opacity="0.25"/>
                        <path d="M18 6L30 12L18 18L6 12L18 6Z" fill="#2563EB"/>
                        <path d="M6 12L18 18V30L6 24V12Z" fill="#1d4ed8"/>
                        <path d="M30 12L18 18V30L30 24V12Z" fill="#3b82f6"/>
                      </svg>
                    </div>
                    <div className="logo-info">
                      <span className="logo-upload-label">Click to upload logo</span>
                      <span className="logo-hint">PNG, JPG (Max 2MB)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* System Preferences */}
            <div className="settings-card">
              <div className="card-title-row">
                <div className="card-title-icon blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <div>
                  <h3>System Preferences</h3>
                  <p>Configure application settings.</p>
                </div>
              </div>

              <div className="settings-fields">
                <div className="sf-row">
                  <label>Warehouse</label>
                  <input
                    type="text"
                    placeholder="Enter warehouse name"
                    value={form.defaultWarehouse}
                    onChange={(e) => set('defaultWarehouse', e.target.value)}
                  />
                </div>
                <div className="sf-row">
                  <label>Page Size</label>
                  <input
                    type="number"
                    placeholder="Enter page size (e.g. 10)"
                    min="1"
                    value={form.defaultPageSize}
                    onChange={(e) => set('defaultPageSize', e.target.value)}
                  />
                </div>
                <div className="sf-row">
                  <label>Date Format</label>
                  <div className="select-wrap">
                    <select value={form.dateFormat} onChange={(e) => set('dateFormat', e.target.value)}>
                      <option value="">Select date format</option>
                      <option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="sf-row">
                  <label>Time Zone</label>
                  <div className="select-wrap">
                    <select value={form.timeZone} onChange={(e) => set('timeZone', e.target.value)}>
                      <option value="">Select time zone</option>
                      {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="sf-row">
                  <label>Currency</label>
                  <div className="select-wrap">
                    <select value={form.currency} onChange={(e) => set('currency', e.target.value)}>
                      <option value="">Select currency</option>
                      {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>

                <div className="sf-toggle-row">
                  <Toggle checked={form.lowStockAlerts} onChange={(v) => set('lowStockAlerts', v)} />
                  <div>
                    <span className="toggle-label">Enable low stock alerts</span>
                    <span className="toggle-sub">Get notified when stock is below reorder level.</span>
                  </div>
                </div>
                <div className="sf-toggle-row">
                  <Toggle checked={form.emailNotifications} onChange={(v) => set('emailNotifications', v)} />
                  <div>
                    <span className="toggle-label">Enable email notifications</span>
                    <span className="toggle-sub">Send email alerts for important activities.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="settings-card">
              <div className="card-title-row">
                <div className="card-title-icon blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <h3>Security Settings</h3>
                  <p>Manage security and access options.</p>
                </div>
              </div>

              <div className="settings-fields">
                <div className="sf-row">
                  <label>Session Timeout</label>
                  <div className="select-wrap">
                    <select value={form.sessionTimeout} onChange={(e) => set('sessionTimeout', e.target.value)}>
                      <option value="">Select timeout</option>
                      <option>15 minutes</option><option>30 minutes</option><option>1 hour</option><option>4 hours</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="sf-row">
                  <label>Password Expiry</label>
                  <div className="select-wrap">
                    <select value={form.passwordExpiry} onChange={(e) => set('passwordExpiry', e.target.value)}>
                      <option value="">Select expiry</option>
                      <option>30 days</option><option>60 days</option><option>90 days</option><option>Never</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="sf-row sf-row--inline">
                  <label>Two-Factor Authentication</label>
                  <div className="inline-toggle">
                    <Toggle checked={form.twoFactorAuth} onChange={(v) => set('twoFactorAuth', v)} />
                    <span className="toggle-sub">Enable 2FA for all users.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="settings-card">
              <div className="card-title-row">
                <div className="card-title-icon blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <h3>Appearance</h3>
                  <p>Customize the application appearance.</p>
                </div>
              </div>

              <div className="settings-fields">
                <div className="sf-row">
                  <label>Theme</label>
                  <div className="select-wrap">
                    <select value={form.theme} onChange={(e) => set('theme', e.target.value)}>
                      <option value="">Select theme</option>
                      <option>Light</option><option>Dark</option><option>Auto</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
                <div className="sf-row">
                  <label>Primary Color</label>
                  <div className="color-row">
                    <input type="color" value={form.primaryColor} onChange={(e) => set('primaryColor', e.target.value)} className="color-picker" />
                    <input type="text" value={form.primaryColor} onChange={(e) => set('primaryColor', e.target.value)} className="color-text" />
                  </div>
                </div>
                <div className="sf-row">
                  <label>Language</label>
                  <div className="select-wrap">
                    <select value={form.language} onChange={(e) => set('language', e.target.value)}>
                      <option value="">Select language</option>
                      <option>English</option><option>Hindi</option><option>Telugu</option><option>Tamil</option><option>Arabic</option><option>French</option><option>Spanish</option><option>German</option><option>Chinese</option><option>Japanese</option>
                    </select>
                    <svg className="sel-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Users & Roles Tab ── */}
        {activeTab === 'users' && (
          <UsersRolesTab />
        )}

        {/* ── Categories Tab ── */}
        {activeTab === 'categories' && (
          <CategoriesTab />
        )}

        {/* ── Units Tab ── */}
        {activeTab === 'units' && (
          <UnitsTab />
        )}

        {/* ── Suppliers Tab ── */}
        {activeTab === 'suppliers' && (
          <SuppliersTab />
        )}

        {/* ── Notifications Tab ── */}
        {activeTab === 'notifications' && (
          <NotificationsTab />
        )}

        {/* ── Backup & Data Tab ── */}
        {activeTab === 'backup' && (
          <BackupDataTab />
        )}

        {/* ── Other Tabs (placeholder) ── */}
        {activeTab !== 'general' && activeTab !== 'users' && activeTab !== 'categories' && activeTab !== 'units' && activeTab !== 'suppliers' && activeTab !== 'notifications' && activeTab !== 'backup' && (
          <div className="tab-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <p>{TABS.find((t) => t.id === activeTab)?.label} settings coming soon.</p>
          </div>
        )}

        {/* ── Footer buttons ── */}
        <div className="settings-footer">
          {saved && <span className="save-toast">✓ Settings saved successfully!</span>}
          <div className="footer-btns">
            <button className="btn-reset" onClick={handleReset}>Reset</button>
            <button className="btn-save-changes" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
