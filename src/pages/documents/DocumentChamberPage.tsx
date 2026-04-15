import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, Trash2, Share2, Eye, PenTool, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Document } from '../../types';
import toast from 'react-hot-toast';

const initialDocuments: Document[] = [
  { id: '1', name: 'Pitch Deck 2024.pdf', type: 'PDF', size: '2.4 MB', lastModified: '2024-02-15', shared: true, status: 'signed', signedBy: ['Sarah Johnson', 'Robert Williams'] },
  { id: '2', name: 'Financial Projections.xlsx', type: 'Spreadsheet', size: '1.8 MB', lastModified: '2024-02-10', shared: false, status: 'in-review' },
  { id: '3', name: 'Term Sheet Draft.docx', type: 'Document', size: '3.2 MB', lastModified: '2024-02-05', shared: true, status: 'draft' },
  { id: '4', name: 'NDA Agreement.pdf', type: 'PDF', size: '1.1 MB', lastModified: '2024-01-28', shared: true, status: 'in-review' },
  { id: '5', name: 'Market Research.pdf', type: 'PDF', size: '5.1 MB', lastModified: '2024-01-20', shared: false, status: 'signed', signedBy: ['David Chen'] },
];

export const DocumentChamberPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [showSignature, setShowSignature] = useState(false);
  const [signingDocId, setSigningDocId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const filteredDocs = filter === 'all' ? documents : documents.filter(d => d.status === filter);

  const handleUpload = () => {
    const newDoc: Document = {
      id: `${Date.now()}`,
      name: `New Document ${documents.length + 1}.pdf`,
      type: 'PDF',
      size: '1.0 MB',
      lastModified: new Date().toISOString().split('T')[0],
      shared: false,
      status: 'draft',
    };
    setDocuments([newDoc, ...documents]);
    toast.success('Document uploaded');
  };

  const handleSign = (docId: string) => {
    setSigningDocId(docId);
    setShowSignature(true);
  };

  const handleSaveSignature = () => {
    if (signingDocId) {
      setDocuments(documents.map(d =>
        d.id === signingDocId ? { ...d, status: 'signed' as const, signedBy: [...(d.signedBy || []), 'You'] } : d
      ));
      setShowSignature(false);
      setSigningDocId(null);
      toast.success('Document signed successfully');
    }
  };

  const handleDelete = (docId: string) => {
    setDocuments(documents.filter(d => d.id !== docId));
    toast.success('Document deleted');
  };

  // Canvas drawing for signature
  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = 'hsl(222 47% 11%)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const statusIcon = (status?: string) => {
    switch (status) {
      case 'signed': return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'in-review': return <Clock className="h-4 w-4 text-accent-500" />;
      case 'draft': return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const statusBadge = (status?: string) => {
    const styles: Record<string, string> = {
      signed: 'bg-success-50 text-success-700',
      'in-review': 'bg-accent/10 text-accent-600',
      draft: 'bg-muted text-muted-foreground',
    };
    return styles[status || 'draft'] || styles.draft;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Document Chamber</h1>
          <p className="text-muted-foreground">Manage deals, contracts, and e-signatures</p>
        </div>
        <button onClick={handleUpload}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
          <Upload className="h-4 w-4" /> Upload Document
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'draft', 'in-review', 'signed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}>
            {f === 'all' ? 'All' : f === 'in-review' ? 'In Review' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Document list */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {filteredDocs.map(doc => (
            <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  {doc.shared && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">Shared</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{doc.type} · {doc.size} · Modified {doc.lastModified}</p>
                {doc.signedBy && doc.signedBy.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">Signed by: {doc.signedBy.join(', ')}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium ${statusBadge(doc.status)}`}>
                  {statusIcon(doc.status)}
                  {doc.status === 'in-review' ? 'In Review' : doc.status?.charAt(0).toUpperCase() + (doc.status?.slice(1) || '')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Preview">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Download">
                  <Download className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors" title="Share">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </button>
                {doc.status !== 'signed' && (
                  <button onClick={() => handleSign(doc.id)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors" title="Sign">
                    <PenTool className="h-4 w-4 text-primary" />
                  </button>
                )}
                <button onClick={() => handleDelete(doc.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signature Modal */}
      {showSignature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-elevated p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-heading font-semibold mb-4">E-Signature</h3>
            <p className="text-sm text-muted-foreground mb-4">Draw your signature below to sign this document</p>
            <div className="border-2 border-dashed border-border rounded-lg mb-4">
              <canvas
                ref={canvasRef}
                width={400}
                height={150}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseLeave={stopDraw}
                className="w-full cursor-crosshair"
              />
            </div>
            <div className="flex gap-3">
              <button onClick={clearCanvas}
                className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                Clear
              </button>
              <button onClick={() => { setShowSignature(false); setSigningDocId(null); }}
                className="flex-1 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveSignature}
                className="flex-1 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
