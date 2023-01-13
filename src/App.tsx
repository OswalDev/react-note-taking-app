import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import {NewNote} from './pages/NewNote'
import {NotFound} from './pages/NotFound'
import { useLocalStorage } from "./useLocalStorage"

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[];
}

export type RawNote = {
  id: string
}

export type RawNoteData = {
  title: string
  markdown: string
  tagsId: string;
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

  return (
    <Container>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/new' element={<NewNote />} />
        <Route path="/:id">
          {/* <Route index element={<Show />}/> */}
          {/* <Route path='edit' element={<Edit />}/> */}
        </Route>
      </Routes>
    </Container>
  )
}

export default App
