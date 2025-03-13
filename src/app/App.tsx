import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Results from '../pages/Results/Results'
import '../shared/styles/global.css'

function App() {
  return (
    <Router basename="/railway-booking/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
