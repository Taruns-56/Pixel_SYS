import React, { useState } from 'react';
import { 
  Share2, 
  Calendar, 
  MapPin, 
  ThumbsUp, 
  ArrowLeft,
  CheckCircle,
  User,
  Phone,
  Users,
  Clock,
  Filter,
  Search
} from 'lucide-react';

function ClientSubmissionPage({ onNavigate, clientEvents, setClientEvents }) {
  // Form State
  const [organizerName, setOrganizerName] = useState('');
  const [organizerRole, setOrganizerRole] = useState('Student Lead');
  const [contactEmail, setContactEmail] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [activityType, setActivityType] = useState('Study Group / Coding Sprint');
  const [proposedDate, setProposedDate] = useState('');
  const [proposedTime, setProposedTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [expectedParticipants, setExpectedParticipants] = useState('10 - 20');

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('post'); // 'post' | 'browse'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [upvotedIds, setUpvotedIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!organizerName || !contactEmail || !eventTitle || !proposedDate || !venue || !description) {
      setErrorMsg('Please fill all required (*) fields.');
      return;
    }
    const newClientEvent = {
      id: Date.now().toString(),
      organizerName,
      organizerRole,
      contactEmail,
      eventTitle,
      activityType,
      proposedDate,
      proposedTime: proposedTime || 'TBD',
      venue,
      description,
      expectedParticipants,
      upvotes: 0,
      createdAt: new Date().toLocaleDateString()
    };
    setClientEvents([newClientEvent, ...clientEvents]);
    setSubmitted(true);
  };

  const handleUpvote = (id) => {
    if (upvotedIds.includes(id)) return;
    setUpvotedIds([...upvotedIds, id]);
    setClientEvents(clientEvents.map(e => e.id === id ? { ...e, upvotes: (e.upvotes || 0) + 1 } : e));
  };

  const filteredEvents = clientEvents.filter(e => {
    const matchSearch = e.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        e.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'All' || e.activityType === filterType;
    return matchSearch && matchType;
  });

  const tabStyle = (active) => ({
    padding: '10px 22px',
    borderRadius: '10px',
    border: active ? '1px solid rgba(6,182,212,0.4)' : '1px solid var(--border-color)',
    background: active ? 'rgba(6,182,212,0.1)' : 'rgba(255,255,255,0.02)',
    color: active ? '#22d3ee' : 'var(--text-muted)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  });

  return (
    <div style={{ background: '#050508', minHeight: '100vh' }} className="animate-fade-in">
      {/* Header */}
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
              background: 'rgba(255,255,255,0.04)',
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
          <div>
            <span style={{ fontWeight: 800, fontSize: '17px', fontFamily: 'var(--font-heading)' }}>
              Student <span style={{ color: '#22d3ee' }}>Community Hub</span>
            </span>
          </div>
        </div>
        <span style={{
          background: 'rgba(6,182,212,0.12)',
          color: '#22d3ee',
          border: '1px solid rgba(6,182,212,0.3)',
          padding: '5px 14px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 700
        }}>OPEN TO ALL STUDENTS</span>
      </header>

      {/* Tab Toggle */}
      <div style={{ padding: '20px 32px', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '12px', background: '#08080f' }}>
        <button style={tabStyle(activeTab === 'post')} onClick={() => { setActiveTab('post'); setSubmitted(false); }}>
          <Share2 size={16} /> Post an Activity
        </button>
        <button style={tabStyle(activeTab === 'browse')} onClick={() => setActiveTab('browse')}>
          <Users size={16} /> Browse Community Activities ({clientEvents.length})
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 32px' }}>

        {/* ===== POST TAB ===== */}
        {activeTab === 'post' && (
          <div className="animate-slide-up" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {submitted ? (
              <div style={{ padding: '48px 32px', textAlign: 'center' }} className="card-3d">
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={36} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>Activity Posted Successfully!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>
                  Your activity <strong style={{ color: '#ffffff' }}>"{eventTitle}"</strong> is now live on the Student Community Hub. Students can discover and RSVP.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button onClick={() => setActiveTab('browse')} className="btn-3d" style={{ padding: '12px 24px' }}>
                    <Users size={16} /> View in Community Feed
                  </button>
                  <button onClick={() => { setSubmitted(false); setEventTitle(''); setDescription(''); }} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: '#ffffff', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
                    Post Another
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: '32px' }} className="card-3d">
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '22px', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>Propose a Campus Activity</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Planning a study session, hackathon team build, club meetup, or sports event? Share it here!</p>
                </div>

                {errorMsg && (
                  <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', borderRadius: '10px', fontSize: '13px', marginBottom: '20px' }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="input-group">
                      <span className="input-label">Your Name *</span>
                      <div style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="e.g. Rahul Sharma" className="input-field" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} style={{ paddingLeft: '36px' }} />
                      </div>
                    </div>
                    <div className="input-group">
                      <span className="input-label">Your Role</span>
                      <select className="input-field" value={organizerRole} onChange={(e) => setOrganizerRole(e.target.value)} style={{ background: '#0d0d16', cursor: 'pointer' }}>
                        <option>Student Lead</option>
                        <option>Club Representative</option>
                        <option>Class Representative (CR)</option>
                        <option>External Partner / Guest</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <span className="input-label">Contact Email / Phone *</span>
                    <div style={{ position: 'relative' }}>
                      <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input type="text" placeholder="email@college.edu or +91 98765..." className="input-field" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={{ paddingLeft: '36px' }} />
                    </div>
                  </div>

                  <div className="input-group">
                    <span className="input-label">Activity Title *</span>
                    <input type="text" placeholder="e.g. Python DSA Mock Interview Sprint" className="input-field" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="input-group">
                      <span className="input-label">Activity Type</span>
                      <select className="input-field" value={activityType} onChange={(e) => setActivityType(e.target.value)} style={{ background: '#0d0d16', cursor: 'pointer' }}>
                        <option>Study Group / Coding Sprint</option>
                        <option>Hackathon Team Building</option>
                        <option>Sports & Recreational</option>
                        <option>Open Mic / Social</option>
                        <option>Peer Mentorship Session</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <span className="input-label">Expected Participants</span>
                      <select className="input-field" value={expectedParticipants} onChange={(e) => setExpectedParticipants(e.target.value)} style={{ background: '#0d0d16', cursor: 'pointer' }}>
                        <option value="5 - 10">Small (5–10 people)</option>
                        <option value="10 - 25">Medium (10–25 people)</option>
                        <option value="25 - 50">Large (25–50 people)</option>
                        <option value="50+">Open Floor (50+ people)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="input-group">
                      <span className="input-label">Date *</span>
                      <input type="date" className="input-field" value={proposedDate} onChange={(e) => setProposedDate(e.target.value)} style={{ colorScheme: 'dark' }} />
                    </div>
                    <div className="input-group">
                      <span className="input-label">Time</span>
                      <input type="time" className="input-field" value={proposedTime} onChange={(e) => setProposedTime(e.target.value)} style={{ colorScheme: 'dark' }} />
                    </div>
                    <div className="input-group">
                      <span className="input-label">Venue *</span>
                      <input type="text" placeholder="Library 2F / Cafeteria" className="input-field" value={venue} onChange={(e) => setVenue(e.target.value)} />
                    </div>
                  </div>

                  <div className="input-group">
                    <span className="input-label">Description & Agenda *</span>
                    <textarea rows="4" placeholder="What will attendees do? What to bring?" className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} style={{ resize: 'vertical' }} />
                  </div>

                  <button type="submit" className="btn-3d" style={{ padding: '14px', justifyContent: 'center' }}>
                    <Share2 size={18} /> Post to Campus Community Hub
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ===== BROWSE TAB ===== */}
        {activeTab === 'browse' && (
          <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Search + Filter */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Search activities..." className="input-field" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', paddingLeft: '40px' }} />
              </div>
              <select className="input-field" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ width: '210px', cursor: 'pointer', background: '#0d0d16' }}>
                <option value="All">All Types</option>
                <option>Study Group / Coding Sprint</option>
                <option>Hackathon Team Building</option>
                <option>Sports & Recreational</option>
                <option>Open Mic / Social</option>
                <option>Peer Mentorship Session</option>
              </select>
            </div>

            {/* Cards Grid */}
            {filteredEvents.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                <Users size={40} color="var(--text-muted)" style={{ marginBottom: '12px' }} />
                <h4 style={{ color: 'var(--text-muted)', fontSize: '16px' }}>No activities found. Be the first to post one!</h4>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                {filteredEvents.map((evt) => (
                  <div key={evt.id} style={{ padding: '22px', transition: 'transform 0.2s' }} className="glass glass-interactive">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="badge badge-accent" style={{ fontSize: '10px' }}>{evt.activityType}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{evt.createdAt}</span>
                    </div>

                    <h4 style={{ fontSize: '17px', color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>{evt.eventTitle}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>{evt.description}</p>

                    <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginBottom: '14px', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} color="#6366f1" /> {evt.proposedDate}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} color="#6366f1" /> {evt.proposedTime}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} color="#6366f1" /> {evt.venue}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={13} color="#6366f1" /> {evt.expectedParticipants}</span>
                    </div>

                    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Host: <strong style={{ color: '#ffffff' }}>{evt.organizerName}</strong>
                        <span style={{ marginLeft: '6px', color: 'var(--text-muted)' }}>({evt.organizerRole})</span>
                      </div>
                      <button
                        onClick={() => handleUpvote(evt.id)}
                        style={{
                          background: upvotedIds.includes(evt.id) ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                          border: upvotedIds.includes(evt.id) ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border-color)',
                          color: upvotedIds.includes(evt.id) ? '#818cf8' : 'var(--text-muted)',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          cursor: upvotedIds.includes(evt.id) ? 'default' : 'pointer',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <ThumbsUp size={13} /> {(evt.upvotes || 0)} Interested
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientSubmissionPage;
