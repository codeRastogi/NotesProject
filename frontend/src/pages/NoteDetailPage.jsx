import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Error fetching note");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error deleting note");
    }
  }
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title: note.title, content: note.content })
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error updating note");
    }
    finally {
      setSaving(false);
    }
  }


  if (loading) {
    return <div className='h-screen text-center text-primary py-10'><span className="loading loading-bars loading-xl"></span></div>
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">

          <div className='flex items-center justify-between mb-6'>
            <Link
              to="/"
              className='btn btn-ghost'>
              <ArrowLeftIcon className='w-5 h-5' />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='w-5 h-5' />
              Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <div className="form-control mb-4">
                <label className="label">
                  <span className='label-text'>Title</span>
                </label>
                <input
                  type="text"
                  placeholder='Note title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />



              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  placeholder='Note content'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}>
                  {saving ? <span className="loading loading-spinner"></span> : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage