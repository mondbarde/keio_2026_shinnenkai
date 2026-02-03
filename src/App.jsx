import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AudienceView from './pages/AudienceView'
import PresenterView from './pages/PresenterView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AudienceView />} />
        <Route path="/presenter" element={<PresenterView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
