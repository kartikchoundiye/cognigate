import React, { useState, useEffect } from 'react';
import {
  UploadCloud, FileText, Play, Edit2, Trash2,
  X, Check, Plus, Download, MoreVertical
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  getMyResumes,
  uploadResume,
  renameResume,
  deleteResume,
  downloadResume
} from '@/services/resumeService';

const MOCK_RESUMES = [];

function ResumePage() {
  const [resumes, setResumes] = useState(MOCK_RESUMES);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getMyResumes();
      if (data.resumes) {
        setResumes(data.resumes);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to fetch resumes');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        toast.error('Only PDF files are supported');
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !uploadTitle.trim()) {
      toast.error('Please provide a title and select a file');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', uploadTitle);
      formData.append('file', selectedFile);

      await uploadResume(formData);
      toast.success('Resume uploaded successfully!');

      setUploadTitle('');
      setSelectedFile(null);
      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';

      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to upload resume');
    } finally {
      setIsUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    try {
      await deleteResume(deleteConfirmId);
      toast.success('Resume deleted permanently');
      setDeleteConfirmId(null);
      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to delete resume');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirmId(id);
  };

  const startRename = (resume) => {
    setEditingId(resume.id);
    setEditTitle(resume.title);
  };

  const saveRename = async (id) => {
    if (!editTitle.trim()) return;
    try {
      await renameResume(id, { new_title: editTitle });
      toast.success('Resume renamed successfully');
      setEditingId(null);
      fetchResumes();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to rename resume');
    }
  };

  const handleDownload = async (resume) => {
    try {
      const blob = await downloadResume(resume.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resume.file_name || `${resume.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Failed to download resume');
    }
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
    <div className="space-y-6 pb-24">

      {/* Header section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center gap-2 shadow-md">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-sm mb-2">
            <FileText className="w-6 h-6 text-blue-200" />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            My Resumes
          </h1>
          <p className="text-blue-200 text-sm md:text-base max-w-2xl mt-2 font-medium">
            Upload and manage your resumes for AI mock interviews. Prepare smarter, not harder.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-md shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -mr-16 -mt-16 pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <UploadCloud className="w-5 h-5" />
            </div>
            Upload New Resume
          </h2>

          <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Input Details */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Resume Title
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile || !uploadTitle}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <div className="animate-spin">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Upload Resume
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div className="lg:col-span-6 h-full">
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                File (PDF only)
              </label>
              <div className="relative h-[calc(100%-1.75rem)] min-h-[120px]">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`w-full h-full flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer ${selectedFile ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}`}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center text-center gap-1">
                      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-800 text-base mt-1 truncate max-w-full px-2">{selectedFile.name}</span>
                      <span className="text-xs font-medium text-blue-600">Click to change file</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center mb-1">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-700 text-base">Click to browse</span>
                      <span className="text-xs font-medium text-slate-500">Supports PDF files</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

          </form>
        </div>
      </section>

      {/* Resumes Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className={`group relative bg-white rounded-[1.5rem] p-6 border transition-all duration-300 flex flex-col gap-5 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-500/10 ${openMenuId === resume.id ? 'z-50 border-blue-300 ring-2 ring-blue-50' : 'z-10 border-slate-100 hover:border-blue-200'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 overflow-hidden">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-blue-600 border border-blue-100/50 shrink-0 shadow-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0 pt-0.5">
                  {editingId === resume.id ? (
                    <div className="flex items-center gap-2 mb-1">
                      <input
                        type="text"
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveRename(resume.id)}
                        className="flex-grow px-2 py-1 text-sm rounded-lg border-2 border-blue-200 bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                      <button onClick={() => saveRename(resume.id)} className="text-blue-600 p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-slate-400 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="text-lg font-bold text-slate-800 truncate mb-1" title={resume.title}>
                      {resume.title}
                    </h3>
                  )}
                  <p className="text-slate-500 text-sm font-medium">
                    {formatDate(resume.created_at)}
                  </p>
                </div>
              </div>

              <div className="flex items-center shrink-0">
                <div className="relative">
                  <button onClick={(e) => toggleMenu(resume.id, e)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {openMenuId === resume.id && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 z-20 py-2 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => { handleDownload(resume); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors">
                        <Download className="w-4 h-4" /> Download
                      </button>
                      <button onClick={() => { startRename(resume); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors">
                        <Edit2 className="w-4 h-4" /> Rename
                      </button>
                      <div className="h-px bg-slate-100 my-1 mx-2"></div>
                      <button onClick={() => { handleDeleteClick(resume.id); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-2">
              <button
                onClick={() => handleStartInterview(resume.id)}
                className="w-full py-3 px-4 bg-slate-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent text-slate-700 border border-slate-200 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm group-hover:border-blue-200"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Interview
              </button>
            </div>
          </div>
        ))}

        {resumes.length === 0 && (
          <div className="col-span-full py-12 px-8 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-6 border-2 border-dashed border-slate-200 rounded-3xl bg-gradient-to-b from-[#f8fafc] to-white shadow-sm inset-shadow-sm">
            <div className="w-14 h-14 bg-white shadow-md shadow-slate-200/50 border border-slate-100 rounded-full flex items-center justify-center shrink-0 relative">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-10"></div>
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">No resumes yet</h3>
              <p className="text-slate-500 text-base mt-1">
                Upload your first resume above to get started with AI mock interviews.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Resume?</h3>
            <p className="text-slate-500 mb-6">
              Are you sure you want to delete this resume ?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : (
                  <>
                    <Trash2 className="w-4 h-4" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumePage;