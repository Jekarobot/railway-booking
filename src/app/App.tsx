import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToHash from '../features/ScrollToHash/ScrollToHash'
import Home from '../pages/Home/Home'
import Results from '../pages/Results/Results'
import '../shared/styles/global.css'

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
