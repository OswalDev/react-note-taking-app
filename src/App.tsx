import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import {NewNote} from './pages/NewNote'
import {NotFound} from './pages/NotFound'

function App() {

  return (
    <Container>
      <Routes>
        {/* <Route path='/' element={}></Route> */}
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
