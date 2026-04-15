import React, { useState } from 'react';
import { Calendar, Clock, Plus, Video, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockMeetings, mockAvailability } from '../../data/mockData';
import { Meeting, AvailabilitySlot } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { users } from '../../data/users';
import toast from 'react-hot-toast';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MeetingsPage: React.FC = () => {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(mockAvailability);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [showRequestMeeting, setShowRequestMeeting] = useState(false);
  const [newSlot, setNewSlot] = useState({ startTime: '09:00', endTime: '17:00' });
  const [newMeeting, setNewMeeting] = useState({ title: '', time: '09:00', duration: 30, participantId: '' });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const getDateStr = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getMeetingsForDate = (day: number) => meetings.filter(m => m.date === getDateStr(day));
  const getSlotsForDate = (day: number) => availability.filter(s => s.date === getDateStr(day) && s.userId === user?.id);

  const handleAddSlot = () => {
    if (!selectedDate) return;
    const slot: AvailabilitySlot = {
      id: `av${Date.now()}`,
      userId: user!.id,
      date: selectedDate,
      startTime: newSlot.startTime,
      endTime: newSlot.endTime,
    };
    setAvailability([...availability, slot]);
    setShowAddSlot(false);
    toast.success('Availability slot added');
  };

  const handleRequestMeeting = () => {
    if (!selectedDate || !newMeeting.title || !newMeeting.participantId) return;
    const meeting: Meeting = {
      id: `mt${Date.now()}`,
      title: newMeeting.title,
      date: selectedDate,
      time: newMeeting.time,
      duration: newMeeting.duration,
      participants: [user!.id, newMeeting.participantId],
      status: 'pending',
      type: 'video',
    };
    setMeetings([...meetings, meeting]);
    setShowRequestMeeting(false);
    setNewMeeting({ title: '', time: '09:00', duration: 30, participantId: '' });
    toast.success('Meeting request sent');
  };

  const handleMeetingAction = (id: string, action: 'confirmed' | 'declined') => {
    setMeetings(meetings.map(m => m.id === id ? { ...m, status: action } : m));
    toast.success(`Meeting ${action}`);
  };

  const otherUsers = users.filter(u => u.id !== user?.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Meeting Scheduler</h1>
          <p className="text-muted-foreground">Manage your availability and meetings</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { setShowAddSlot(true); setShowRequestMeeting(false); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
            <Clock className="h-4 w-4" /> Add Availability
          </button>
          <button onClick={() => { setShowRequestMeeting(true); setShowAddSlot(false); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" /> Request Meeting
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold">{MONTHS[month]} {year}</h3>
            <div className="flex gap-1">
              <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {calendarDays.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              const dateStr = getDateStr(day);
              const dayMeetings = getMeetingsForDate(day);
              const daySlots = getSlotsForDate(day);
              const isSelected = selectedDate === dateStr;

              return (
                <button key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative p-2 rounded-lg text-sm transition-all min-h-[3rem] ${
                    isSelected ? 'bg-primary text-primary-foreground ring-2 ring-primary' :
                    'hover:bg-muted'
                  }`}>
                  <span className="font-medium">{day}</span>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {dayMeetings.length > 0 && <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-primary-foreground' : 'bg-primary'}`} />}
                    {daySlots.length > 0 && <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-primary-foreground/70' : 'bg-secondary-500'}`} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {(showAddSlot || showRequestMeeting) && selectedDate && (
            <div className="rounded-xl border border-border bg-card p-4 shadow-card">
              <h4 className="text-sm font-semibold mb-3">
                {showAddSlot ? 'Add Availability' : 'Request Meeting'} — {selectedDate}
              </h4>
              {showAddSlot ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Start</label>
                      <input type="time" value={newSlot.startTime} onChange={e => setNewSlot({...newSlot, startTime: e.target.value})}
                        className="w-full h-9 rounded-lg border border-border bg-background px-2 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">End</label>
                      <input type="time" value={newSlot.endTime} onChange={e => setNewSlot({...newSlot, endTime: e.target.value})}
                        className="w-full h-9 rounded-lg border border-border bg-background px-2 text-sm" />
                    </div>
                  </div>
                  <button onClick={handleAddSlot} className="w-full py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
                    Save Slot
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <input type="text" placeholder="Meeting title" value={newMeeting.title}
                    onChange={e => setNewMeeting({...newMeeting, title: e.target.value})}
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm" />
                  <select value={newMeeting.participantId} onChange={e => setNewMeeting({...newMeeting, participantId: e.target.value})}
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm">
                    <option value="">Select participant</option>
                    {otherUsers.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                  <input type="time" value={newMeeting.time} onChange={e => setNewMeeting({...newMeeting, time: e.target.value})}
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-sm" />
                  <button onClick={handleRequestMeeting} className="w-full py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
                    Send Request
                  </button>
                </div>
              )}
            </div>
          )}

          {!selectedDate && (
            <div className="rounded-xl border border-border bg-card p-4 shadow-card text-center">
              <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Select a date to view details</p>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <h4 className="text-sm font-semibold mb-3">All Meetings</h4>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {meetings.map(m => (
                <div key={m.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium">{m.title}</p>
                      <p className="text-xs text-muted-foreground">{m.date} at {m.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      m.status === 'confirmed' ? 'bg-success-50 text-success-700' :
                      m.status === 'pending' ? 'bg-accent/10 text-accent-600' :
                      m.status === 'declined' ? 'bg-destructive/10 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>{m.status}</span>
                  </div>
                  {m.status === 'pending' && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleMeetingAction(m.id, 'confirmed')}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-success-50 text-success-700 hover:bg-success-500/20">
                        <Check className="h-3 w-3" /> Accept
                      </button>
                      <button onClick={() => handleMeetingAction(m.id, 'declined')}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-destructive/10 text-destructive hover:bg-destructive/20">
                        <X className="h-3 w-3" /> Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
