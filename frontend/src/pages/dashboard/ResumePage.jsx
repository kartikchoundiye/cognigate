import React, { useState } from 'react';
import {
  UploadCloud, FileText, Play, Edit2, Trash2,
  X, Check, Plus
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MOCK_RESUMES = [];

function ResumePage() {
  const [resumes, setResumes] = useState(MOCK_RESUMES);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.endsWith('.docx')) {
        setSelectedFile(file);
      } else {
        toast.error('Only PDF or DOCX files are supported');
      }
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile || !uploadTitle.trim()) {
      toast.error('Please provide a title and select a file');
      return;
    }

    // Simulating API call
    setIsUploading(true);
    setTimeout(() => {
      const newResume = {
        id: Math.random().toString(36).substr(2, 9),
        title: uploadTitle,
        created_at: new Date().toISOString(),
      };
      setResumes([newResume, ...resumes]);
      setIsUploading(false);
      setUploadTitle('');
      setSelectedFile(null);

      // Reset file input
      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';

      toast.success('Resume uploaded successfully!');
    }, 1500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume? This will also remove all associated AI chunks.')) {
      setResumes(resumes.filter(r => r.id !== id));
      toast.success('Resume deleted permanently');
    }
  };

  const startRename = (resume) => {
    setEditingId(resume.id);
    setEditTitle(resume.title);
  };

  const saveRename = (id) => {
    if (!editTitle.trim()) return;
    setResumes(resumes.map(r => r.id === id ? { ...r, title: editTitle } : r));
    setEditingId(null);
    toast.success('Resume renamed successfully');
  };

  const handleStartInterview = (resumeId) => {
    // Navigate to interview page with resume_id as query param or route param
    // navigate(`/dashboard/interview?resume_id=${resumeId}`);
    toast.success(`Starting AI Interview for resume ${resumeId}`);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="bg-[#f8fafc] rounded-3xl p-8 border border-slate-200 flex flex-col items-center justify-center text-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          My Resumes
        </h1>
        <p className="text-slate-500 text-base md:text-lg max-w-2xl">
          Upload and manage your resumes for AI mock interviews.
        </p>
      </section>

      {/* Upload Section */}
      <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm shadow-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <UploadCloud className="w-6 h-6 text-slate-600" />
          Upload New Resume
        </h2>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Resume Title
            </label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Developer"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              File (PDF or DOCX)
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <span className="truncate">{selectedFile ? selectedFile.name : 'Choose a file...'}</span>
                <FileText className="w-5 h-5 ml-2 flex-shrink-0 text-slate-400" />
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isUploading || !selectedFile || !uploadTitle}
              className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <div className="animate-spin">
                  <UploadCloud className="w-5 h-5" />
                </div>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Upload
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* Resumes Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all flex flex-col shadow-sm shadow-slate-100"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 border border-slate-100">
                <FileText className="w-6 h-6" />
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startRename(resume)}
                  className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-colors"
                  title="Rename"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(resume.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-8 flex-grow">
              {editingId === resume.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    autoFocus
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveRename(resume.id)}
                    className="flex-grow px-3 py-1.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-slate-300"
                  />
                  <button onClick={() => saveRename(resume.id)} className="text-slate-700 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="text-slate-400 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <h3 className="text-xl font-bold text-slate-800 line-clamp-2" title={resume.title}>
                  {resume.title}
                </h3>
              )}
              <p className="text-slate-500 mt-2 text-sm">
                Uploaded {formatDate(resume.created_at)}
              </p>
            </div>

            <button
              onClick={() => handleStartInterview(resume.id)}
              className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Start Interview
            </button>
          </div>
        ))}

        {resumes.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-2xl bg-[#f8fafc]">
            <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No resumes yet</h3>
            <p className="text-slate-500 max-w-sm">
              Upload your first resume above to get started with AI mock interviews.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ResumePage;
