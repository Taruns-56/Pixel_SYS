import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Users, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Trash2,
  Edit,
  Sparkles,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  Shield,
  BarChart3,
  Megaphone,
  Search,
  Filter,
  XCircle,
  Download,
  RefreshCw,
  TrendingUp,
  Bell
} from 'lucide-react';

/* ---------------------------------------------------------------- */
/* ADMIN PASSWORD GATE                                               */
/* ---------------------------------------------------------------- */
const ADMIN_PASSWORD = 'admin@twinfusion2026';

function AdminLoginGate({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onAuthenticate(true);
    } else {
      setError('Incorrect admin password. Access denied.');
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient Glows */}
      <div style={{ position: 'absolute', top: '15%', left: '25%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '25%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(239,68,68,0.08), transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div 
        style={{
          maxWidth: '420px',
          width: '100%',
          padding: '40px',
          position: 'relative',
          zIndex: 1,
          animation: shaking ? 'shake 0.4s ease-in-out' : 'none'
        }} 
        className="card-3d"
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            background: 'linear-gradient(135deg, #ef4444, #6366f1)',
            padding: '14px',
            borderRadius: '16px',
            marginBottom: '16px',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)'
          }}>
            <Shield size={32} color="white" />
          </div>
          <h2 style={{ fontSize: '26px', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
            Admin Portal Access
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            This area is restricted to authorized campus administrators only.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <XCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-label">Administrator Password</span>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin passkey..."
                className="input-field"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                style={{ width: '100%', paddingLeft: '44px', paddingRight: '44px' }}
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-3d" style={{ width: '100%', justifyContent: 'center', padding: '14px', marginTop: '8px' }}>
            <Shield size={18} /> Authenticate & Enter
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <Lock size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Password: <code style={{ color: '#818cf8', background: 'rgba(99,102,241,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>admin@twinfusion2026</code>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* MAIN ADMIN EVENTS PAGE (FULL FEATURED)                            */
/* ---------------------------------------------------------------- */
function AdminEventsPage({ onNavigate, events, setEvents }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  
  // Add Event Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hackathon');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Announcements
  const [announcements, setAnnouncements] = useState([
    { id: '1', text: 'Welcome freshers! College orientation begins next Monday.', type: 'info', date: '2026-07-23' },
    { id: '2', text: 'Library hours extended to 10 PM during exam season.', type: 'warning', date: '2026-07-22' }
  ]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [announcementType, setAnnouncementType] = useState('info');

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Edit State
  const [editingEvent, setEditingEvent] = useState(null);

  // If not authenticated, show the login gate
  if (!isAuthenticated) {
    return <AdminLoginGate onAuthenticate={setIsAuthenticated} />;
  }

  const handleAddEvent = (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!title || !date || !time || !location || !description) {
      setErrorMsg('Please fill in all required fields marked with *');
      return;
    }

    if (editingEvent) {
      // Update existing event
      setEvents(events.map(ev => ev.id === editingEvent.id ? {
        ...ev,
        title, category, date, time, location, description, 
        organizer: organizer || 'Campus Admin',
        targetAudience: targetAudience || 'All Students',
        priority
      } : ev));
      setSuccessMsg(`Event "${title}" updated successfully!`);
      setEditingEvent(null);
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title, category, date, time, location,
        organizer: organizer || 'Campus Admin',
        description,
        targetAudience: targetAudience || 'All Freshers & Students',
        status: 'Published',
        priority,
        postedBy: 'Admin (Official)',
        createdAt: new Date().toLocaleDateString()
      };
      setEvents([newEvent, ...events]);
      setSuccessMsg(`Event "${title}" successfully published!`);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle(''); setDate(''); setTime(''); setLocation('');
    setOrganizer(''); setDescription(''); setTargetAudience('');
    setPriority('Normal'); setEditingEvent(null);
  };

  const handleEdit = (evt) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setCategory(evt.category);
    setDate(evt.date);
    setTime(evt.time);
    setLocation(evt.location);
    setOrganizer(evt.organizer);
    setDescription(evt.description);
    setTargetAudience(evt.targetAudience || '');
    setPriority(evt.priority || 'Normal');
    setActiveAdminTab('add-event');
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setEvents(events.map(e => e.id === id ? {
      ...e,
      status: e.status === 'Published' ? 'Draft' : e.status === 'Draft' ? 'Cancelled' : 'Published'
    } : e));
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    setAnnouncements([{
      id: Date.now().toString(),
      text: newAnnouncement,
      type: announcementType,
      date: new Date().toLocaleDateString()
    }, ...announcements]);
    setNewAnnouncement('');
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || e.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalEvents = events.length;
  const publishedEvents = events.filter(e => e.status === 'Published').length;
  const draftEvents = events.filter(e => e.status === 'Draft').length;
  const cancelledEvents = events.filter(e => e.status === 'Cancelled').length;

  const statusColor = (status) => {
    if (status === 'Published') return '#10b981';
    if (status === 'Draft') return '#f59e0b';
    return '#ef4444';
  };

  const priorityColor = (p) => {
    if (p === 'Urgent') return '#ef4444';
    if (p === 'High') return '#f59e0b';
    return '#6366f1';
  };

  const tabBtnStyle = (isActive) => ({
    background: isActive ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)',
    border: isActive ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid var(--border-color)',
    color: isActive ? '#ffffff' : 'var(--text-muted)',
    padding: '10px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ background: '#050508', minHeight: '100vh', padding: '0' }} className="animate-fade-in">
      {/* Admin Top Bar */}
      <header style={{
        padding: '14px 32px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#0a0a14',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={() => onNavigate('dashboard')}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'linear-gradient(135deg, #ef4444, #6366f1)', padding: '6px', borderRadius: '8px' }}>
              <Shield size={18} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '17px', fontFamily: 'var(--font-heading)' }}>
              Admin <span style={{ color: '#818cf8' }}>Control Center</span>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> Authorized
          </span>
          <button 
            onClick={() => setIsAuthenticated(false)}
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lock size={14} /> Lock Portal
          </button>
        </div>
      </header>

      {/* Admin Tab Bar */}
      <div style={{
        padding: '16px 32px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        gap: '10px',
        background: '#08080f'
      }}>
        <button onClick={() => setActiveAdminTab('dashboard')} style={tabBtnStyle(activeAdminTab === 'dashboard')}>
          <BarChart3 size={16} /> Overview Dashboard
        </button>
        <button onClick={() => setActiveAdminTab('add-event')} style={tabBtnStyle(activeAdminTab === 'add-event')}>
          <Plus size={16} /> {editingEvent ? 'Edit Event' : 'Publish New Event'}
        </button>
        <button onClick={() => setActiveAdminTab('manage')} style={tabBtnStyle(activeAdminTab === 'manage')}>
          <FileText size={16} /> Manage Events ({totalEvents})
        </button>
        <button onClick={() => setActiveAdminTab('announcements')} style={tabBtnStyle(activeAdminTab === 'announcements')}>
          <Megaphone size={16} /> Announcements ({announcements.length})
        </button>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 32px' }}>

        {/* ===== TAB: Overview Dashboard ===== */}
        {activeAdminTab === 'dashboard' && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="tf-grid-2">
              {[
                { label: 'Total Events', value: totalEvents, icon: <Calendar size={20} color="#6366f1" />, bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)' },
                { label: 'Published', value: publishedEvents, icon: <CheckCircle size={20} color="#10b981" />, bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
                { label: 'Drafts', value: draftEvents, icon: <FileText size={20} color="#f59e0b" />, bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
                { label: 'Announcements', value: announcements.length, icon: <Megaphone size={20} color="#06b6d4" />, bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)' }
              ].map((stat, i) => (
                <div key={i} style={{
                  padding: '22px',
                  background: stat.bg,
                  border: `1px solid ${stat.border}`,
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '46px', height: '46px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)', border: `1px solid ${stat.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions + Recent Events */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }} className="tf-grid-2">
              {/* Quick Actions */}
              <div style={{ padding: '24px' }} className="glass">
                <h3 style={{ fontSize: '17px', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => setActiveAdminTab('add-event')} style={{ ...tabBtnStyle(false), width: '100%', justifyContent: 'flex-start' }}>
                    <Plus size={16} color="#10b981" /> Publish New Event
                  </button>
                  <button onClick={() => setActiveAdminTab('announcements')} style={{ ...tabBtnStyle(false), width: '100%', justifyContent: 'flex-start' }}>
                    <Megaphone size={16} color="#06b6d4" /> Post Announcement
                  </button>
                  <button onClick={() => setActiveAdminTab('manage')} style={{ ...tabBtnStyle(false), width: '100%', justifyContent: 'flex-start' }}>
                    <Edit size={16} color="#f59e0b" /> Edit Existing Events
                  </button>
                  <button onClick={() => {
                    const data = JSON.stringify(events, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = 'twinfusion_events_export.json'; a.click();
                  }} style={{ ...tabBtnStyle(false), width: '100%', justifyContent: 'flex-start' }}>
                    <Download size={16} color="#818cf8" /> Export All Events (JSON)
                  </button>
                </div>
              </div>

              {/* Recent Events Feed */}
              <div style={{ padding: '24px' }} className="glass">
                <h3 style={{ fontSize: '17px', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Recent Published Events</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto' }}>
                  {events.slice(0, 5).map((evt) => (
                    <div key={evt.id} style={{
                      padding: '14px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <h5 style={{ fontSize: '14px', margin: 0, marginBottom: '4px' }}>{evt.title}</h5>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '12px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Calendar size={11} /> {evt.date}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={11} /> {evt.location}</span>
                        </div>
                      </div>
                      <span style={{
                        fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px',
                        background: `${statusColor(evt.status || 'Published')}15`,
                        color: statusColor(evt.status || 'Published'),
                        border: `1px solid ${statusColor(evt.status || 'Published')}30`
                      }}>{evt.status || 'Published'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: Add / Edit Event ===== */}
        {activeAdminTab === 'add-event' && (
          <div className="animate-slide-up" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ padding: '32px' }} className="card-3d">
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <h2 style={{ fontSize: '22px', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                  {editingEvent ? `Editing: ${editingEvent.title}` : 'Publish Official Campus Event'}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  {editingEvent ? 'Modify the event details below and save.' : 'Add verified campus events visible to all students.'}
                </p>
              </div>

              {successMsg && (
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '14px 18px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={18} /> {successMsg}
                </div>
              )}
              {errorMsg && (
                <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '14px 18px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={18} /> {errorMsg}
                </div>
              )}

              <form onSubmit={handleAddEvent} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div className="input-group">
                  <span className="input-label">Event Title *</span>
                  <input type="text" placeholder="e.g. Smart India Hackathon Prep Workshop" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <span className="input-label">Category</span>
                    <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)} style={{ cursor: 'pointer', background: '#0d0d16' }}>
                      <option value="Hackathon">🏆 Hackathon</option>
                      <option value="Workshop">💻 Workshop</option>
                      <option value="Club Meet">👥 Club Orientation</option>
                      <option value="Seminar">🎤 Seminar / Lecture</option>
                      <option value="Cultural">🎉 Cultural / Sports</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <span className="input-label">Priority Level</span>
                    <select className="input-field" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ cursor: 'pointer', background: '#0d0d16' }}>
                      <option value="Normal">🟢 Normal</option>
                      <option value="High">🟡 High</option>
                      <option value="Urgent">🔴 Urgent</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <span className="input-label">Organizer</span>
                    <input type="text" placeholder="e.g. Google DSC" className="input-field" value={organizer} onChange={(e) => setOrganizer(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div className="input-group">
                    <span className="input-label">Date *</span>
                    <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} style={{ colorScheme: 'dark' }} />
                  </div>
                  <div className="input-group">
                    <span className="input-label">Time *</span>
                    <input type="time" className="input-field" value={time} onChange={(e) => setTime(e.target.value)} style={{ colorScheme: 'dark' }} />
                  </div>
                  <div className="input-group">
                    <span className="input-label">Location *</span>
                    <input type="text" placeholder="Room 304" className="input-field" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div className="input-group">
                  <span className="input-label">Target Audience</span>
                  <input type="text" placeholder="e.g. 1st & 2nd Year CSE Students" className="input-field" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} />
                </div>

                <div className="input-group">
                  <span className="input-label">Description & Details *</span>
                  <textarea rows="4" placeholder="Event rules, objectives, requirements..." className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} style={{ resize: 'vertical' }} />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn-3d" style={{ flex: 1, padding: '14px', justifyContent: 'center' }}>
                    {editingEvent ? <><Edit size={16} /> Save Changes</> : <><Plus size={16} /> Publish Event</>}
                  </button>
                  {editingEvent && (
                    <button type="button" onClick={resetForm} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '14px 24px', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===== TAB: Manage Events ===== */}
        {activeAdminTab === 'manage' && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Search & Filter Bar */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Search events by title or description..." className="input-field" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', paddingLeft: '40px' }} />
              </div>
              <select className="input-field" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ width: '180px', cursor: 'pointer', background: '#0d0d16' }}>
                <option value="All">All Categories</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Club Meet">Club Meet</option>
                <option value="Seminar">Seminar</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            {/* Events Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                <thead>
                  <tr style={{ textAlign: 'left', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    <th style={{ padding: '8px 14px' }}>Event Title</th>
                    <th style={{ padding: '8px 14px' }}>Category</th>
                    <th style={{ padding: '8px 14px' }}>Date & Time</th>
                    <th style={{ padding: '8px 14px' }}>Location</th>
                    <th style={{ padding: '8px 14px' }}>Priority</th>
                    <th style={{ padding: '8px 14px' }}>Status</th>
                    <th style={{ padding: '8px 14px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No events match your search.
                      </td>
                    </tr>
                  ) : filteredEvents.map((evt) => (
                    <tr key={evt.id} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                      <td style={{ padding: '14px', borderRadius: '10px 0 0 10px', border: '1px solid var(--border-color)', borderRight: 'none' }}>
                        <h5 style={{ fontSize: '14px', margin: 0 }}>{evt.title}</h5>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{evt.organizer}</span>
                      </td>
                      <td style={{ padding: '14px', border: '1px solid var(--border-color)', borderLeft: 'none', borderRight: 'none' }}>
                        <span className="badge badge-primary" style={{ fontSize: '10px' }}>{evt.category}</span>
                      </td>
                      <td style={{ padding: '14px', fontSize: '13px', border: '1px solid var(--border-color)', borderLeft: 'none', borderRight: 'none' }}>
                        {evt.date}<br /><span style={{ color: 'var(--text-muted)' }}>{evt.time}</span>
                      </td>
                      <td style={{ padding: '14px', fontSize: '13px', border: '1px solid var(--border-color)', borderLeft: 'none', borderRight: 'none' }}>{evt.location}</td>
                      <td style={{ padding: '14px', border: '1px solid var(--border-color)', borderLeft: 'none', borderRight: 'none' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: priorityColor(evt.priority || 'Normal') }}>
                          {evt.priority || 'Normal'}
                        </span>
                      </td>
                      <td style={{ padding: '14px', border: '1px solid var(--border-color)', borderLeft: 'none', borderRight: 'none' }}>
                        <button onClick={() => handleToggleStatus(evt.id)} style={{
                          background: `${statusColor(evt.status || 'Published')}15`,
                          border: `1px solid ${statusColor(evt.status || 'Published')}30`,
                          color: statusColor(evt.status || 'Published'),
                          padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 700
                        }}>
                          {evt.status || 'Published'}
                        </button>
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right', borderRadius: '0 10px 10px 0', border: '1px solid var(--border-color)', borderLeft: 'none' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleEdit(evt)} style={{ background: 'rgba(99,102,241,0.1)', border: 'none', color: '#818cf8', padding: '6px', borderRadius: '6px', cursor: 'pointer' }} title="Edit">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDeleteEvent(evt.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===== TAB: Announcements ===== */}
        {activeAdminTab === 'announcements' && (
          <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="tf-grid-2 animate-slide-up">
            {/* Post Announcement */}
            <div style={{ padding: '28px' }} className="card-3d">
              <h3 style={{ fontSize: '19px', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                <Megaphone size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px', color: '#06b6d4' }} />
                Post Campus Announcement
              </h3>
              <form onSubmit={handleAddAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="input-group">
                  <span className="input-label">Announcement Type</span>
                  <select className="input-field" value={announcementType} onChange={(e) => setAnnouncementType(e.target.value)} style={{ background: '#0d0d16' }}>
                    <option value="info">ℹ️ Information</option>
                    <option value="warning">⚠️ Important / Warning</option>
                    <option value="success">✅ Good News</option>
                    <option value="urgent">🚨 Urgent Alert</option>
                  </select>
                </div>
                <div className="input-group">
                  <span className="input-label">Message</span>
                  <textarea rows="3" placeholder="Write your announcement here..." className="input-field" value={newAnnouncement} onChange={(e) => setNewAnnouncement(e.target.value)} style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn-3d" style={{ justifyContent: 'center', padding: '12px' }}>
                  <Bell size={16} /> Broadcast Announcement
                </button>
              </form>
            </div>

            {/* Live Feed */}
            <div style={{ padding: '28px' }} className="glass">
              <h3 style={{ fontSize: '19px', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                Live Announcement Feed
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '440px', overflowY: 'auto' }}>
                {announcements.map((a) => {
                  const colors = {
                    info: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', text: '#818cf8' },
                    warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', text: '#f59e0b' },
                    success: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: '#10b981' },
                    urgent: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', text: '#ef4444' }
                  };
                  const c = colors[a.type] || colors.info;
                  return (
                    <div key={a.id} style={{
                      padding: '14px 16px',
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div>
                        <p style={{ fontSize: '14px', color: '#ffffff', margin: 0, marginBottom: '4px', lineHeight: 1.4 }}>{a.text}</p>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Posted: {a.date}</span>
                      </div>
                      <button onClick={() => handleDeleteAnnouncement(a.id)} style={{ background: 'none', border: 'none', color: c.text, cursor: 'pointer', flexShrink: 0 }}>
                        <XCircle size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEventsPage;
