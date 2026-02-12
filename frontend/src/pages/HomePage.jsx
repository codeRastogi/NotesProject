import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import RateLImitedUI from '../components/RateLImitedUI'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import NoNotesFound from '../components/NoNotesFound'
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        setNotes(res.data)
        setIsRateLimited(false)
        console.log(res.data)
      } catch (error) {
        console.log("AXIOS ERROR:", error);

        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
          return;
        }

        toast.error("Error fetching notes");
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])
  return (
    <div className='min-h-screen'>
      <NavBar />

      {isRateLimited && <RateLImitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'><span className="loading loading-bars loading-xl"></span></div>}
        {notes.length === 0 && !isRateLimited && <NoNotesFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage