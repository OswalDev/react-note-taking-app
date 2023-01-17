import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo } from "react"
import { Container } from 'react-bootstrap'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import {NewNote} from './pages/NewNote'
import {NotFound} from './pages/NotFound'
import { useLocalStorage } from './useLocalStorage'
import {v4 as uuidV4} from 'uuid'

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[];
}

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[];
}

export type Tag = {
  id: string
  label: string
}

export type Note = {
  id: string
} & NoteData

function App() {
  const [notes,setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags,setTags] = useLocalStorage<RawNote[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags:tags.filter(tag => note.tagIds.includes(tag.id))}  
    })
  },[notes, tags])

  function onCreateNote({tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes,
        { ...data, id:uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  return (
    <Container>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/new' element={<NewNote onSubmit={onCreateNote} />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>}/>
          <Route path='edit' element={<h1>Edit</h1>}/>
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Container>
  )
}

export default App