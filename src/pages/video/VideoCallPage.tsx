import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, Users, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VideoCallPage: React.FC = () => {
  const { user } = useAuth();
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCall = async () => {
    setIsInCall(true);
    setCallDuration(0);
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Try to get camera
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      // Camera not available in sandbox — that's fine
    }
  };

  const endCall = () => {
    setIsInCall(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-heading font-bold">Video Calls</h1>
        <p className="text-muted-foreground">Connect face-to-face with your partners</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`${showChat && isInCall ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card">
            {/* Video area */}
            <div className="relative bg-foreground/5 aspect-video flex items-center justify-center">
              {isInCall ? (
                <>
                  {isVideoOn ? (
                    <video ref={videoRef} autoPlay muted playsInline
                      className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">Camera is off</p>
                    </div>
                  )}

                  {/* Call duration */}
                  <div className="absolute top-4 left-4 bg-foreground/80 text-background px-3 py-1 rounded-full text-sm font-medium">
                    {formatDuration(callDuration)}
                  </div>

                  {/* Participant pip */}
                  <div className="absolute top-4 right-4 w-32 h-24 rounded-lg bg-foreground/20 border border-border flex items-center justify-center overflow-hidden">
                    <div className="h-10 w-10 rounded-full bg-secondary-500/30 flex items-center justify-center">
                      <span className="text-sm font-bold text-secondary-600">S</span>
                    </div>
                  </div>

                  {isScreenSharing && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Monitor className="h-3 w-3" /> Screen Sharing
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 p-8">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <Video className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-heading font-semibold">Ready to start a call?</h3>
                    <p className="text-sm text-muted-foreground mt-1">Click the button below to begin your video call</p>
                  </div>
                  <button onClick={startCall}
                    className="px-6 py-2.5 rounded-lg gradient-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Video className="h-4 w-4" /> Start Call
                  </button>
                </div>
              )}
            </div>

            {/* Controls */}
            {isInCall && (
              <div className="flex items-center justify-center gap-3 p-4 bg-card border-t border-border">
                <button onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isAudioOn ? 'bg-muted hover:bg-muted/80' : 'bg-destructive text-destructive-foreground'
                  }`}>
                  {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </button>
                <button onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isVideoOn ? 'bg-muted hover:bg-muted/80' : 'bg-destructive text-destructive-foreground'
                  }`}>
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                <button onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 rounded-full transition-colors ${
                    isScreenSharing ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}>
                  <Monitor className="h-5 w-5" />
                </button>
                <button onClick={() => setShowChat(!showChat)}
                  className={`p-3 rounded-full transition-colors ${
                    showChat ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                  }`}>
                  <MessageCircle className="h-5 w-5" />
                </button>
                <button onClick={endCall}
                  className="p-3 rounded-full bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity">
                  <PhoneOff className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat sidebar */}
        {showChat && isInCall && (
          <div className="rounded-xl border border-border bg-card shadow-card flex flex-col h-[500px]">
            <div className="p-3 border-b border-border">
              <h4 className="text-sm font-semibold">In-call Chat</h4>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              <div className="p-2 rounded-lg bg-muted/50 text-xs">
                <span className="font-medium">System:</span> Call started
              </div>
            </div>
            <div className="p-3 border-t border-border">
              <input type="text" placeholder="Type a message..."
                className="w-full h-8 rounded-lg border border-border bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
        )}
      </div>

      {/* Recent calls */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <h3 className="text-lg font-heading font-semibold mb-4">Recent Calls</h3>
        <div className="space-y-3">
          {[
            { name: 'Sarah Johnson', time: 'Today, 2:30 PM', duration: '45 min', type: 'outgoing' },
            { name: 'Robert Williams', time: 'Yesterday, 10:00 AM', duration: '30 min', type: 'incoming' },
            { name: 'Emily Rodriguez', time: 'Mar 15, 3:00 PM', duration: '1 hr', type: 'missed' },
          ].map((call, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
              <div className={`p-2 rounded-full ${
                call.type === 'missed' ? 'bg-destructive/10' : 'bg-success-50'
              }`}>
                {call.type === 'missed' ? <PhoneOff className="h-4 w-4 text-destructive" /> : <Phone className="h-4 w-4 text-success-700" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{call.name}</p>
                <p className="text-xs text-muted-foreground">{call.time} · {call.duration}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Video className="h-4 w-4 text-primary" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
