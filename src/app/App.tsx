import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToHash from '../features/ScrollToHash/ScrollToHash'
import Home from '../pages/Home/Home'
import Results from '../pages/Results/Results'
import Success from '../pages/Success/Success'
import '../shared/styles/global.css'

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}

export default App
